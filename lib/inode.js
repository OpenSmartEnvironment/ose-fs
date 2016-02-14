'use strict';

const O = require('ose')(module)
  .singleton('ose/lib/kind')
;

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
 * @schema fs
 * @class fs.lib.dir
 * @extend ose.lib.kind
 * @type singleton
 */

// Public {{{1
exports.title = 'File';

exports.layout('list', {  // {{{2
  displayLayout: function() {  // {{{3
    if (! (this.demand.filter && this.demand.filter.root)) {
      return;
    }

    var parentDir = this.demand.filter.root;

    if (parentDir === '/') return;

    parentDir = parentDir.split('/');
    parentDir.pop();
    parentDir = parentDir.join('/');

    var that = this;

    this.li({'focusable': undefined})
      .on('tap', function(ev) {
        that.update({filter: {root: parentDir}});
        return false;
      })
      .h3('..')
    ;
  },

  tapItem: function(entry, ev) {  // {{{3
    if (entry.dval && entry.dval.type === 'dir') {
      this.update({filter: {root: entry.id}});
      return false;
    }

    require('ose-html5/lib/view/list').tapItem.apply(this, arguments);
    return false;
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
  li.section()
    .h3(entry.dval.ident[0])
    .p('File')
  ;

  return li;
};

exports.tapMediaItem = function(view, player, entry) {
  if (entry.dval && entry.dval.type === 'dir') {
    view.update({filter: {root: entry.id}});
    return;
  }

  player.post('playItem', entry.getIdent());
  return;
};

