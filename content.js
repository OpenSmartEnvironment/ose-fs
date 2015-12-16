'use strict';

var O = require('ose').object(module, 'ose/lib/http/content');
exports = O.init();

/** Docs
 * @module fs
 */

/**
 * @caption Filesystem content
 *
 * @readme
 * Provides files of [ose-fs] package to the browser.
 *
 * @class fs.content
 * @type singleton
 * @extends ose.lib.http.content
 */

// Public
exports.addModule('lib/index');
exports.addModule('lib/inode/gaia/list');
exports.addModule('lib/inode/index');
exports.addModule('lib/remote');

