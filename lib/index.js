'use strict';

var O = require('ose').module(module);
O.package = 'ose-fs';
O.scope = 'fs';

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
exports.browserConfig = true;

exports.config = function(name, data, deps) {
  O.kind('./dir', 'dir', deps);
  O.kind('./file', 'file', deps);

  O.content('../content');
};

// }}}1
