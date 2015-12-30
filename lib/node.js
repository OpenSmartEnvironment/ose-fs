'use strict';

var O = require('ose').module(module);

var Fs = require('fs');
var Path = require('path');

var Entry = O.class('ose/lib/entry');

// Public {{{1
exports.init = function(shard, params, cb) {  // {{{2
  var path = Path.normalize((params && params.root || '') + '/');
  shard.root = path.substr(0, path.length - 1);

  cb();
};

exports.cleanup = function(shard) {  // {{{2
};

exports.get = function(shard, eid, cb) {  // {{{2
  var path = Path.normalize(shard.root + eid);
  if (
    ! eid ||
    shard.root && path.indexOf(shard.root) !== 0 ||
    path.indexOf(eid) !== shard.root.length
  ) {
    return cb(O.error(shard, 'Invalid path', eid));
  }

  return shard.awaitReady(function(err) {
    if (err) return cb(err);
    return stat(shard, eid, cb);
  });
};

exports.read = function(shard, eid, cb) {  // {{{2
  O.async.nextTick(function() {
    cb(null, Fs.createReadStream(shard.root + '/' + eid));
  });
};

exports.find = function(shard, alias, cb) {  // {{{2
  var path = Path.normalize(shard.root + '/' + alias);
  if (
    ! alias ||
    shard.root && path.indexOf(shard.root) !== 0
  ) {
    return cb(O.error(shard, 'Invalid path', alias));
  }

  path = path.substring(shard.root.length);

  return shard.awaitReady(function(err) {
    if (err) return cb(err);
    return stat(shard, path, cb);
  });
};

exports.findAlias = require('./remote').findAlias;  // {{{2

exports.query = function(shard, name, opts, cb) {  // {{{2
  if (name !== 'all') return cb(O.error(shard, 'MAP_NOT_FOUND', name));

  var filter = opts && opts.filter || {  // Default filter
    recursive: false,
  };
  if (! filter.root) filter.root = '/';

  var res = [];

  return search(Path.normalize('/' + (filter.root) + '/'), function(err) {
    if (err) return cb(err);
    return cb(null, res);
  });

  function search(path, cb) {
    return Fs.readdir(shard.root + path, function(err, files) {
      if (err) return cb(err);
      return O.async.eachSeries(files, readFile, cb);
    });

    function readFile(name, cb) {
      if (name.charAt(0) === '.') {
        return cb();
      }

      if (! filter.regexp || name.match(filter.regexp)) {
        res.push(path + name);
      }

      if (! filter.recursive) {
        return cb();
      }

      return Fs.stat(shard.root + path + name, function(err, stat) {
        if (err) return cb();

        if (stat.isDirectory()) return search(path + name + '/', cb);

        return cb();
      });
    };
  }
};

exports.commit = function(trans, cb) {  // {{{2
  cb(O.log.todo());
};

// Remote {{{1
// Private {{{1
function stat(shard, eid, cb) {  // {{{2
  var entry = shard.cache[eid];

  if (! entry) {
    entry = new Entry(shard, eid);
    return Fs.stat(shard.root + eid, onStat);
  }

  if (entry.subjectState === entry.SUBJECT_STATE.BUSY) {
    return entry.awaitReady(function(err) {
      if (err) return cb(err);
      return cb(null, entry);
    });
  }

  entry.subjectState = entry.SUBJECT_STATE.BUSY;
  return Fs.stat(shard.root + eid, onStat);

  function onStat(err, stat) {
    if (err) return cb(entry.remove(O.log.error(err)));

    var drev = shard.nextTime();
    var dval = {
      dev: stat.dev,
      ino: stat.ino,
      mode: stat.mode,
      nlink: stat.nlink,
      uid: stat.uid,
      gid: stat.gid,
      rdev: stat.rdev,
      size: stat.size,
      blksize: stat.blksize,
      blocks: stat.blocks,
      atime: stat.atime.getTime(),
      ctime: stat.ctime.getTime(),
      mtime: stat.mtime.getTime(),
      birthtime: stat.birthtime.getTime(),
    };

    if (stat.isDirectory()) {
      dval.type = 'dir';
    } else if (stat.isSocket()) {
      dval.type = 'socket';
    } else if (stat.isFIFO()) {
      dval.type = 'fifo';
    } else if (stat.isSymbolicLink()) {
      dval.type = 'link';
    } else if (stat.isCharacterDevice()) {
      dval.type = 'char';
    } else if (stat.isBlockDevice()) {
      dval.type = 'block';
    } else if (stat.isFile()) {
      dval.type = 'file';
    }

    if (! dval.type) {
      return cb(entry.remove(O.error(that, 'Invalid stat', stat)));
    }

    if (entry.subjectState === entry.SUBJECT_STATE.BUSY) {
      entry.updateData(drev, dval);
      if (entry.brev !== entry.dval.mtime) {
        entry.brev = entry.dval.mtime;  // TODO call entry.updateBrev
      }
      entry.setReady();
    } else {
      if (! entry.setupKind('inode', drev, dval)) {
        return cb(entry._err);
      }
      entry.brev = entry.dval.mtime;
      entry.setup();
    }

    return cb(null, entry);
  }
}

