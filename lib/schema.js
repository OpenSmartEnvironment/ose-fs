'use strict';

var O = require('ose').object(module);
exports = O.init();

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

exports.findAlias = function(shard, alias, cb) {  // {{{2
  return shard.nextReady(function(err) {
    if (err) return cb(err);

    var res = alias2Eid(shard, alias);
    if (! res) {
      return cb(O.error(shard, 'Invalid path', alias));
    }

    return cb(null, res);
  });
};

exports.query = function(shard, name, opts, cb) {  // {{{2
  if (name !== 'all') return cb(O.error(shard, 'MAP_NOT_FOUND', name));

  if (! opts) opts = {};

  var res = [];

  return search(Path.normalize('/' + (opts.root || '') + '/'), function(err) {
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

      if (! opts.regexp || name.match(opts.regexp)) {
        res.push(path + name);
      }

      if (! opts.recursive) {
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

// Private {{{1
function alias2Eid(shard, alias) {  // {{{2
  if (alias === '') return '/';

  var path = Path.normalize(shard.root + '/' + alias);
  if (shard.root && path.indexOf(shard.root) !== 0) {
    return null
  }

  return path.substring(shard.root.length);
}

function stat(shard, eid, cb) {  // {{{2
  var entry = shard.cache[eid];

  if (! entry) {
    entry = new Entry(shard, eid);
    return Fs.stat(shard.root + eid, onStat);
  }

  if (entry.subjectState === O.subjectState.BUSY) {
    return entry.awaitReady(function(err) {
      if (err) return cb(err);
      return cb(null, entry);
    });
  }

  entry.subjectState = O.subjectState.BUSY;
  return Fs.stat(shard.root + eid, onStat);

  function onStat(err, stat) {
    if (err) return cb(entry.remove(O.log.error(err)));

    var kind;
    if (stat.isDirectory()) {
      kind = 'dir';
    } else if (stat.isSocket()) {
      kind = 'socket';
    } else if (stat.isFIFO()) {
      kind = 'fifo';
    } else if (stat.isSymbolicLink()) {
      kind = 'link';
    } else if (stat.isCharacterDevice()) {
      kind = 'char';
    } else if (stat.isBlockDevice()) {
      kind = 'block';
    } else if (stat.isFile()) {
      kind = 'file';
    }

    if (! kind) {
      return cb(entry.remove(O.error(that, 'Invalid stat', stat)));
    }

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

    if (entry.subjectState === O.subjectState.BUSY) {
      if (entry.kind.name !== kind) {
        throw O.log.error(shard, 'Kind mismatch', {orig: entry.toString(), new: kind});
      }
      entry.updateData(drev, dval);
      if (entry.brev !== entry.dval.mtime) {
        entry.brev = entry.dval.mtime;  // TODO call entry.updateBrev
      }
      entry.setReady();
    } else {
      entry.setupKind(kind, drev, dval);
      entry.brev = entry.dval.mtime;
      entry.setup();
    }

    return cb(null, entry);
  }
}

