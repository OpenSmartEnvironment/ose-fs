'use strict';

var Ose = require('ose');

var Fs = require('fs');
var Path = require('path');

// Public
exports.findEntry = function(shard, id, cb) {  // TODO move to scope.
  if (id in shard.cache) {
    cb(null, shard.cache[id]);
  } else {
    Fs.stat(id, onStat.bind());
  }

  function onStat(err, stat) {
    if (err) {
      cb(err);
    } else {
      cb(null, shard.entry(
        id,
        stat.isDirectory() ? 'dir' : 'file',
        {name: Path.basename(id)}
      ));
    }
  };
};
