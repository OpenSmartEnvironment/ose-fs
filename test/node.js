'use strict';

var O = require('ose').module(module);

var Path = require('path');
var Content = require('../content');
Content.addModule('test/index');

require('ose/lib/plugins').read({  // {{{1
  'ose-fs': {},  // {{{2

  fsShard: {  // {{{2
    id: 'ose/lib/shard',
    sid: 2,              // Shard id unique within the space
    scope: 'fs',         // Scope the shard belongs to
    alias: 'fsShard',    // Shard alias
    schema: {
      root: Path.dirname(Path.dirname(module.filename)),
    }
  },

    /*
  fsDashboard: function(name, val, deps) {  // {{{2
    var d = require('ose/lib/plugins').plugins['ose-gaia'].data.dashboard;
    d.push({
      caption: 'Aliases',
      view: 'list',
      ident: {
        map: 'alias',
        shard: 'testShard',
      }
    });
    d.push({
      caption: 'Kinds',
      view: 'list',
      ident: {
        map: 'kind/name',
        shard: 'testShard',
      }
    });
  },
  */

  // }}}2
});

