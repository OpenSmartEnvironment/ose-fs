'use strict';

var O = require('ose').object(module, 'ose/lib/kind');
exports = O.init('fs', 'inode');

/** Docs {{{1
 * @module fs
 */

/**
 * @caption Filesystem inode kind
 *
 * @readme
 * [Entry kind] describing filesystem inodes (files, directories, etc)
 *
 * @kind inode
 * @class fs.lib.dir
 * @extend ose.lib.kind
 * @type singleton
 */

// Public {{{1
exports.title = 'File';

exports.layout('list', {  // {{{2
  displayLayout: function() {  // {{{3
    if (! (this.so.filter && this.so.filter.root)) {
      return;
    }

    var parentDir = this.so.filter.root;

    console.log('FS DISPLAY LAYOUT', parentDir);

    if (parentDir === '/') return;

    parentDir = parentDir.split('/');
    parentDir.pop();
    parentDir = parentDir.join('/');

    var that = this;

    this.li({'focusable': undefined})
      .on('click', function(ev) {
        that.stop(ev);
        that.update({filter: {root: parentDir}});
      })
      .h3('..')
    ;
  },

  tapItem: function(entry, ev) {  // {{{3
    this.stop(ev);

    if (entry.dval && entry.dval.type === 'dir') {
      this.update({filter: {root: entry.id}});
      return;
    }

    require('ose-html5/lib/view/list').tapItem.apply(this, arguments);
    return;
  },

  // }}}3
});

exports.playItem = function(player, item, cb) {  // {{{2
  item.shard.findSibling(item.dval.ident, function(err, shard) {
    if (err) return cb(err);

    return player.playback.post(
      'playUri',
      'file://' + (shard.root || '') + item.dval.ident[0],
      cb
    );
  });
};

exports.getMediaKeys = function(entry) {  // {{{2
  return {
    name: entry.id,
  };
};

exports.printMediaHistory = function(li, entry) {  // {{{2
  li.append('div').add([
    '<h3>File:</h3>',
    li.new('p').text(this.getCaption({dval: entry.dval.media})),
  ]);

  return li;
  /*
  li
    .append($('<p>').text('File: '))
    .append($('<p>').text(this.getCaption({dval: entry.dval.media})))
  ;
  */
};

exports.tapMediaItem = function(view, player, entry) {
  if (entry.dval && entry.dval.type === 'dir') {
    view.update({filter: {root: entry.id}});
    return;
  }

  player.post('playItem', entry.identify());
  return;
};

