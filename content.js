'use strict';

var O = require('ose').object(module, 'ose/lib/http/content');
exports = O.init();

/** Docs  {{{1
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

// Public {{{1
exports.addModule('lib/dir/index');
exports.addModule('lib/file/browser');
exports.addModule('lib/file/index');
exports.addModule('lib/gaia/list');
exports.addModule('lib/index');

