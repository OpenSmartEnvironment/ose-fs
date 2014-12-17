'use strict';

var Path = require('path');

// Public {{{1
exports.playItem = function(player, item) {  // {{{2
  player.postTo(
    player.playback,
    'playUri',
    'file://' + item.data.id
  );
};

exports.getEntry = function(shard, req, cb) {  // {{{2
  cb(null, shard.entry(req.entry, 'file', {
    name: Path.basename(req.entry)
  }));
};

// }}}1
