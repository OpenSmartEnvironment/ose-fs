'use strict';

var O = require('ose').class(module);

var Fs = require('fs');
var Path = require('path');
//var Level = require('level');

/**
 * @module fs
 */

/**
 * @caption JSON files database backned
 *
 * @readme
 * Makes it possible to save entries to JSON files
 *
 * @class fs.lib.jsonDb
 * @type class
 */


// Public {{{1
exports.config = require('./db').config;
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

exports.put = function(id, kind, drev, data, cb) {  // {{{2
  Fs.writeFile(
    this.root + id + '.json',
    JSON.stringify({
      id: id,
      kind: kind,
      drev: drev,
      data: data,
    }, null, 2),
    cb
  );
};

exports.getAll = function(shard, onEntry, cb) {  // {{{2
  var that = this;

  Fs.readdir(this.root, function(err, files) {  // {{{3
    if (err) {
      cb(err);
      return;
    }

    O.async.eachSeries(files, readFile, cb);
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

exports.setRev = function(val, cb) {  // {{{2
  Fs.writeFile(this.root + '.rev', val, cb);
};

// }}}1


/* CHECK LEVEL {{{1
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

// }}}1*/
