'use strict';

var Ose = require('ose');
var M = Ose.package(module).append('node');
exports = M.init();

/** Docs {{{1
 * @caption Open Smart Environment Filesystem package
 *
 * @readme
 * This package contains definitions of [entry kinds] that represent
 * files and directories and gives OSE access to the filesystem and
 * registers fs as a source to the [OSE Media player].
 *
 * @module fs
 * @main fs
 */

/**
 * @caption OSE Filesystem core
 *
 * @readme
 * Core singleton of ose-fs npm package. Registers [entry kinds]
 * defined by this package to the `"fs"` [scope].
 *
 * @class fs.lib
 * @type singleton
 */

// Public {{{1
exports.browserConfig = true;

M.content();

M.scope = 'fs';
M.kind('./dir', 'dir');
M.kind('./file', 'file');

var Sources = require('ose-media/lib/sources');
Sources.add('file', 'fs', 'dir');
