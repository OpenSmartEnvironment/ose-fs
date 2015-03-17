'use strict';

var O = require('ose').object(module, Init, 'ose/lib/http/content');
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
function Init() {  // {{{2
  O.super.call(this);

  this.addModule('lib/dir/browser');
  this.addModule('lib/dir/index');
  this.addModule('lib/file/browser');
  this.addModule('lib/file/index');
  this.addModule('lib/gaia/list');
  this.addModule('lib/index');
};

