'use strict';

var Ose = require('ose');
var M = Ose.class(module, C);

var Fs = require('fs');

// Public {{{1
function C(config) {  // {{{2
  this.root = config.root || '/';
}

exports.getStream = function(id, cb) {  // {{{2
  cb(null, Fs.createReadStream(this.root + '/' + id));
};

exports.get = function(id, cb) {  // {{{2
  var that = this;

  Fs.lstat(this.root + '/' + id, function(err, stat) {
    if (err) {
      cb(err);
      return;
    }

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
      cb(Ose.error(that, 'INVALID_STAT', stat));
      return;
    }

    cb(null, kind, {});
    return;
  });
};

// }}}1
