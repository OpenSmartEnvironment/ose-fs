'use strict';

var O = require('ose').object(module, 'ose-test/lib/suite');
O.prepend('node');
exports = O.init('fs/test');

var Assert = O.chai.assert;
var Equal = Assert.equal;

var Path = require('path');

// Tests {{{1
exports.cleanup = function(err) {  // {{{2
//  exports.shard.removeCommand('test');

  exports.socket && exports.socket.removeAllListeners();
  exports.entrySocket && exports.entrySocket.removeAllListeners();

  if (O.link.canClose(exports.socket)) O.link.close(exports.socket);
  if (O.link.canClose(exports.entrySocket)) O.link.close(exports.entrySocket);

  exports.socket = null;
  exports.entrySocket = null;

  delete exports.shard;
  delete exports.entry;
};

exports.add('Get space', function(cb) {  // {{{2
  O.data.getSpace('testSpace', function(err, space) {
    if (err) return cb(err);

    Equal(space.SUBJECT_STATE.READY, space.subjectState, 'exports.space state');
    Equal('testSpace', space.name, 'exports.space name');

    exports.space = space;

//    return setTimeout(cb, 3000);

    return cb();
  });
});

exports.add('Find shard', function(cb) {  // {{{2
  exports.space.findShard('fsShard', function(err, shard) {
    if (err) return cb(err);

    Equal(shard.SUBJECT_STATE.READY, shard.subjectState, 'exports.shard state');
    Equal('fsShard', shard.alias, 'exports.shard alias');

    exports.shard = shard;

    return cb();
  });
});

exports.add('Get shard', function(cb) {  // {{{2
  exports.space.getShard(exports.shard.id, function(err, shard) {
    if (err) return cb(err);

    Equal(shard.SUBJECT_STATE.READY, shard.subjectState, 'exports.shard state');
    Equal(exports.shard, shard, 'exports.shard');

    return cb();
  });
});

exports.add('Find entry', function(cb) {  // {{{2
  exports.shard.find('README.md', function(err, entry) {
    if (err) return cb(err);

    Equal(entry.SUBJECT_STATE.READY, entry.subjectState, 'Entry state');
    Equal('/README.md', entry.id, 'Entry id');

    exports.entry = entry;
    exports.entryId = entry.id;

    return cb();
  });
});

exports.add('Get entry', function(cb) {  // {{{2
  exports.shard.get(exports.entry.id, function(err, entry) {
    if (err) return cb(err);

    Equal(entry.SUBJECT_STATE.READY, entry.subjectState, 'Entry state');
    Equal(exports.entry, entry, 'Entry');

    return cb();
  });
});

exports.add('Track entry', function(cb) {  // {{{2
  var socket = exports.shard.track(exports.entry.id);
  socket.on('error', cb);
  socket.on('close', cb);
  socket.on('open', function(entry) {
    Equal(entry.SUBJECT_STATE.READY, entry.subjectState, 'Entry state');
    Equal(exports.entry, entry, 'Entry');

    if (O.runtime === 'browser') {
      Equal(entry, entry.master.subject, 'Entry master');
    }

    return cb();
  });

  exports.entrySocket = socket;
});

exports.add('Connect backend', {runtime: 'browser'}, function(cb) {  // {{{2
  var socket = O.new('EventEmitter')();
  exports.shard.sendMaster('command', {name: 'test'}, socket);
  socket.on('open', cb);
  socket.on('error', cb);
  socket.on('close', function() {
    cb(O.error('Close should not be called'));
  });

  exports.socket = socket;
});

exports.add('Await browser', {runtime: 'node', timeout: 60*1000}, function(cb) {  // {{{2
//  return cb();

  var socket = O.new('EventEmitter')();
  exports.shard.addCommand('test', socket);
  socket.on('error', cb);
  socket.on('open', function(shard, name, data, client) {
    O.link.open(socket, client);
    return cb()
  });
  socket.on('close', function() {
    cb(O.error('Close should not be called'));
  });

  exports.socket = socket;
});

exports.repeat('Find entry');  // {{{2

exports.repeat('Track entry');  // {{{2

exports.add('Find all js files', function(cb) {  // {{{2
  exports.shard.query('all', {
    regexp: '\.js$',
    recursive: true,
  }, function(err, vals) {
    if (err) return cb(err);

//    console.log('FIND FILES', vals);
    Assert.deepEqual(vals, [
      '/content.js',
      '/lib/index.js',
      '/lib/inode/gaia/list.js',
      '/lib/inode/index.js',
      '/lib/node.js',
      '/lib/remote.js',
      '/test/index.js',
      '/test/node.js',
    ]);

    return cb();
  });
});

exports.add('Find js files in root only', function(cb) {  // {{{2
  exports.shard.query('all', {
    regexp: '\.js$',
  }, function(err, vals) {
    if (err) return cb(err);

//    console.log('FIND FILES', vals);
    Assert.deepEqual(vals, ['/content.js']);

    return cb();
  });
});

exports.add('Find all files in /lib', function(cb) {  // {{{2
  exports.shard.query('all', {
    root: '/lib',
    regexp: '\.js$',
    recursive: true,
  }, function(err, vals) {
    if (err) return cb(err);

    console.log('FIND FILES', vals);
    Assert.deepEqual(vals, [
      '/lib/index.js',
      '/lib/inode/gaia/list.js',
      '/lib/inode/index.js',
      '/lib/node.js',
      '/lib/remote.js',
    ]);

    return cb();
  });
});

exports.add('Find missing map', function(cb) {  // {{{2
  exports.shard.query('find', {regexp: '\.js$'}, function(err, vals) {
    Equal(1, arguments.length, 'Arguments length');
    Equal('MAP_NOT_FOUND', err.code, 'Error code');

    return cb();
  });
});

exports.add('Read README.md', {runtime: 'node'}, function(cb) {  // {{{2
  var bh, fh;
  var crypto = require('crypto');

  var bhash = crypto.createHash('md5');
  bhash.setEncoding('hex');
  bhash.on('error', finish);
  exports.shard.read('/README.md', function(err, blob) {
    if (err) return finish(err);

    blob.on('error', finish);
    blob.on('end', function() {
      bhash.end();
      bh = bhash.read();
      finish();
    });
    return blob.pipe(bhash);
  });

  var fhash = crypto.createHash('md5');
  fhash.setEncoding('hex');
  fhash.on('error', finish);
  var file = require('fs').createReadStream(Path.dirname(Path.dirname(module.id)) + '/README.md');
  file.on('error', finish);
  file.on('end', function() {
    fhash.end();
    fh = fhash.read();
    finish();
  });
  file.pipe(fhash);

  function finish(err) {
    if (! cb) return;

    var fn = cb;
    cb = null;

    if (err) return fn(err);

    if (bh && fh) {
      Equal(bh, fh, 'README hash');
      exports.readmeHash = bh;
      return fn();
    }

    // Wait for both hashes to calculate
    cb = fn;
    return;
  }
});

/*
 *TODO
exports.receive({runtime: 'node'}, function(cb) {
});

exports.send({runtime: 'browser'}, function(cb) {
  exports.socket.once
});

exports.add('Read README.md', {runtime: 'browser'}, function(cb) {  // {{{2
});
*/

exports.add('Finish', function(cb) {  // {{{2
  if (! exports.socket) return cb();

  exports.socket.removeAllListeners();
  exports.socket.on('close', cb);
  exports.socket.on('error', cb);

  if (O.runtime === 'browser') {
    return O.link.close(exports.socket);
  }
});

