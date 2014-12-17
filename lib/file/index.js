'use strict';

var Ose = require('ose');
var M = Ose.singleton(module, 'ose/lib/kind');
exports = M.append('runtime').exports;

/** Docs {{{1
 * @module fs
 */

/**
 * @caption File kind
 *
 * @readme
 * [Entry kind] describing files.
 *
 * @class fs.lib.file
 * @extend ose.lib.kind
 * @type singleton
 */

// Public  // {{{1
exports.getMediaKeys = function(entry) {
  return {
    name: entry.data.name
  };
};

