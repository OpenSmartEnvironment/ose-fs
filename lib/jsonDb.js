'use strict';

var O = require('ose').class(module, C);

var Fs = require('fs');
var Path = require('path');
var Async = require('async');
var Level = require('level');

// Public {{{1
function C(config) {  // {{{2
  if (typeof config.root !== 'string') {
    throw O.error(this, 'Invalid `config.root`');
  }
  this.root = config.root;

  if (this.root.charAt(this.root.length - 1) !== '/') {
    this.root += '/';
  }
}

exports.getView = function(view, filter, socket) {  // {{{2
};

exports.get = function(id, cb) {  // {{{2
  var that = this;

  Fs.readFile(this.root + id + '.json', function(err, data) {
    if (err) {
      cb(err);
      return;
    }

    try {
      data = JSON.parse(data);
    } catch (err) {
      cb(err);
      return;
    }

    cb(null, data.kind, data.drev, data.data);
    return;
  });
};

exports.getAll = function(shard, onEntry, cb) {  // {{{2
  var that = this;

  Fs.readdir(this.root, function(err, files) {  // {{{3
    if (err) {
      cb(err);
      return;
    }

    Async.eachSeries(files, readFile, cb);
    return;
  });

  function readFile(name, rcb) {  // {{{3
    name = name.match(/(.*)\.json$/);
    if (! name) {
      rcb();
      return;
    }

    shard.get(name[1], function(err, entry) {
      if (entry) {
        onEntry(entry);
      }
      rcb();
    });
    return;
  }

  // }}}3
};

exports.createMap = function(shard, name, map, cb) {  // {{{2
  if (name in shard.maps) {
    cb(O.error(shard, 'Map already exist', name));
    return;
  }

  var res = {
    map: map,
    db: Level(this.root + 'maps/' + map.name),
  };

  shard.maps[name] = res;

  cb(res);
};

exports.addEntry2Map = function(map, entry, cb) {  // {{{2
  var that = this;

  map.map(entry, function(key, value) {
    map.db.put(key, value, function(err) {
      if (err) {
        O.log.error(entry, 'Error writing to map', map.name);
      }
    });
  });
};

// }}}1
