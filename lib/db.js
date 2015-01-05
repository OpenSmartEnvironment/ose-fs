'use strict';

var Ose = require('ose');
var M = Ose.class(module, C);

var Fs = require('fs');
var Path = require('path');
var Async = require('async');

// Public {{{1
function C(config) {  // {{{2
  this.root = config.root || '/';

  if (this.root.charAt(this.root.length - 1) !== '/') {
    this.root += '/';
  }
}

exports.getView = function(params, socket) {  // {{{2
  var expr;
  var parent = '';
  var result = [];
  var r = this.root;
  var s = this.shard;

  if (params.filter) {
    if (params.filter.parent) {
      parent = params.filter.parent;
      if (parent.charAt(parent.length - 1) !== '/') {
        parent += '/';
      }
    }

    if (params.filter.search) {
      expr = params.filter.search;
    }
  }

  search(parent, function done() {  // {{{3
    Ose.link.close(socket, {view: result});
  });

  function search(dir, searchCb) {  // {{{3
    Fs.readdir(r + dir, function(err, files) {  // {{{4
      if (err) {
        searchCb();
      } else {
        Async.eachSeries(files, readFile, searchCb);
      }
    });

    function readFile(name, readCb) {  // {{{4
      if (name.charAt(0) === '.') {
        readCb();
        return;
      }

      Fs.lstat(r + dir + name, function(err, stat) {  // {{{5
        if (err) {
          readCb();
          return;
        }

        var counter = Ose.counter(readCb);

        if (stat.isDirectory()) {
          if (expr) {  // File is a directory and we are searching something.
            search(dir + name + '/', counter.bind());
          }
        } else if (! stat.isFile()) {  // File is not file neather directory.
          counter.dec();
          return;
        }

        if (expr && ! name.match(expr)) {  // File name doesn't match searched expresson.
          counter.dec();
          return;
        }

        result.push(dir + name);
        counter.dec();
        return;
      });

      // }}}5

      return;
    };

    // }}}4
  };

  // }}}3
};

exports.getStream = function(id, cb) {  // {{{2
  cb(null, Fs.createReadStream(this.root + id));
};

exports.get = function(id, cb) {  // {{{2
  var that = this;

  Fs.lstat(this.root + id, function(err, stat) {
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

    cb(null, kind, {
      name: Path.basename(id),
    });
    return;
  });
};

// }}}1
