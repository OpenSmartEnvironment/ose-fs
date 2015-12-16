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
    name: entry.dval.name
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

