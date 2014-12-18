'use strict';

var Ose = require('ose');

var Fs = require('fs');
var Path = require('path');
var Async = require('async');

// Public {{{1
exports.getView = function(params, socket) {  // {{{2
  var expr;
  var result = [];
  var s = params.shard;
  var parent = params.filter && params.filter.parent || s.root || '/';

  if (parent.charAt(parent.length - 1) !== '/') {
    parent += '/';
  }

  if (! parent.match('^' + s.root)) {
    Ose.link.error(socket, Ose.error(s, 'INVALID_ARGS', 'Invalid parent.', parent));
    return;
  }

  if (params.filter && params.filter.search) {
    expr = params.filter.search;
  }

  search(parent, function done() {  // {{{3
//    console.log('GET VIEW DONE', result);

    Ose.link.close(socket, {view: result});
  });

  function search(dir, searchCb) {  // {{{3
//    console.log('SEARCH', dir);

    Fs.readdir(dir, function(err, files) {  // {{{4
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

      Fs.lstat(dir + name, function(err, stat) {  // {{{5
//        console.log('STAT', dir + name);

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

        name = dir + name;

        result.push(name);

        s.get(name, function(err, entry) {  // {{{6
          if (err) {
            s.entry(
              name,
              stat.isDirectory() ? 'dir' : 'file',
              {name: Path.basename(name)}
            );
          }

          counter.dec();
        });

        // }}}6

        return;
      });

      // }}}5

      return;
    };

    // }}}4
  };

  // }}}3
};

// }}}1
