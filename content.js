'use strict';

exports = require('ose')
  .singleton(module, 'ose/lib/http/content')
  .exports
;

/** Docs  {{{1
 * @module fs
 */

/**
 * @caption OSE Filesystem content
 *
 * @readme
 * Provides files of OSE Filesystem package to the browser.
 *
 * @class fs.content
 * @type singleton
 * @extends ose.lib.http.content
 */

// Public {{{1
exports.addFiles = function() {
  this.addModule('lib/dir/browser');
  this.addModule('lib/dir/index');
  this.addModule('lib/dir/bb/list');
  this.addModule('lib/file/browser');
  this.addModule('lib/file/index');
  this.addModule('lib/index');
};

