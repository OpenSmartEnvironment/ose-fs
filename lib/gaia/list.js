'use strict';

var O = require('ose').module(module);

var List = require('ose-gaia/lib/pagelet/list');

// Public {{{1
exports.displayLayout = function() {  // {{{2
  var that = this;

  if (this.tapItem) {
    this.tapMediaItem
  }

  this.append('<li><div><h3>..</h3></div></li>')
    .on('click', function onTap(ev) {
      var parentDir;

      if (that.stateObj.parent) {
        parentDir = that.stateObj.filter.parent.split('/');
        parentDir.pop().join('/');
      } else {
        parentDir = '/';
      }

      that.update({filter: {parent: parentDir}});
    });
  ;
};

exports.tapItem = function(entry, ev) {  // {{{2
  switch (entry.kind.name) {
  case 'dir':
    this.update({filter: {parent: entry.id}});
    this.stop(ev);
    return;
  case 'file':
    var e = this.stateObj.media;
    e = e && e.player;
    if (! e) break;

    this.stop(ev);
    entry.postTo(e, 'playItem', entry.identify());
    return;
  }

  List.tapItem.apply(this, arguments);
  return;
};

// }}}1
