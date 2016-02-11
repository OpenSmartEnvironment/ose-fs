'use strict';

const O = require('ose')(module);

var Path = require('path');

require('ose/lib/plugins').read({  // {{{1
  'ose-fs': {},  // {{{2

  fsShard: {  // {{{2
    id: 'ose/lib/shard',
    sid: 2,              // Shard id unique within the space
    alias: 'fsShard',    // Shard alias
    schema: 'fs',        // Schema the shard belongs to
    root: Path.dirname(Path.dirname(module.filename)),
  },

  fsContent: function() {
    var content = require('../content');
    content.addModule('test/index');
  },
  /*
  fsDashboard: function(name, val, deps) {  // {{{2
    var d = require('ose/lib/plugins').plugins['ose-html5'].data.dashboard;
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

