'use strict';

var O = require('ose').object(module);
O.package = 'ose-fs';

O.prepend('node');
exports = O.init();

O.content('../content');

exports.remote = require('./remote');
O.data.addSchema('fs', exports);
require('./inode');

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
 * It also defines a JSON file-based database backend for shards.
 *
 * @module fs
 * @main fs
 */

/**
 * @caption Filesystem core
 *
 * @readme
 * Core singleton of ose-fs npm package. Registers [entry kinds]
 * defined by this package to the `"fs"` [schema].
 *
 * @class fs.lib
 * @type singleton
 */

// Public {{{1
exports.browserConfig = true;

