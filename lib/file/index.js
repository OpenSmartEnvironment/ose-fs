'use strict';

var Ose = require('ose');
var M = Ose.singleton(module, 'ose/lib/kind');
exports = M.append('browser').exports;

/** Docs {{{1
 * @module fs
 */

/**
 * @caption File kind
 *
 * @readme
 * [Entry kind] describing files.
 *
 * @class fs.lib.file
 * @extend ose.lib.kind
 * @type singleton
 */

// Public  // {{{1
exports.playItem = function(player, item) {  // {{{2
  Ose.spaces.getShard(
    {
      space: item.data.space,
      shard: item.data.shard,
    },
    function(err, shard) {
      if (err) {
        M.log.error(err);
      } else {
        player.postTo(
          player.playback,
          'playUri',
          'file://' + (shard.db && shard.db.root || '') + item.data.id
        );
      }
    }
  );
};

exports.getMediaKeys = function(entry) {  // {{{2
  return {
    name: entry.data.name
  };
};

// }}}1
