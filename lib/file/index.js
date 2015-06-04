'use strict';

var O = require('ose').object(module, 'ose/lib/kind');
exports = O.append('browser').exports;

/** Docs {{{1
 * @module fs
 */

/**
 * @caption File kind
 *
 * @readme
 * [Entry kind] describing files.
 *
 * @kind file
 * @class fs.lib.file
 * @extend ose.lib.kind
 * @type singleton
 */

// Public  // {{{1
exports.playItem = function(player, item, cb) {  // {{{2
  O.findShard(item.dval.ident, function(err, shard) {
    if (err) {
      cb(err);
      return;
    }

    player.playback.post(
      'playUri',
      'file://' + (shard.db && shard.db.root || '') + item.dval.ident.id,
      cb
    );
    return;
  });
};

exports.getMediaKeys = function(entry) {  // {{{2
  return {
    name: entry.dval.name
  };
};

// }}}1
