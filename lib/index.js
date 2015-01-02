'use strict';

var Ose = require('ose');
var M = Ose.package(module).append('node');
exports = M.init();

/** Docs {{{1
 * @caption Filesystem
 *
 * @readme
 * This package contains definitions of [entry kinds] that represent
 * files and directories and gives OSE access to the filesystem and
 * registers fs as a source to the [Media player].
 *
 * See [Media player example].
 *
 * @module fs
 * @main fs
 */

/**
 * @caption Filesystem core
 *
 * @readme
 * Core singleton of ose-fs npm package. Registers [entry kinds]
 * defined by this package to the `"fs"` [scope].
 *
 * @class fs.lib
 * @type singleton
 */

// Public {{{1
M.scope = 'fs';
M.kind('./dir', 'dir');
M.kind('./file', 'file');

M.content();

exports.browserConfig = true;

exports.config = function() {
  if (Ose.media && Ose.media.sources) {
    Ose.media.sources.add('file', 'fs', 'dir');
  }
};

