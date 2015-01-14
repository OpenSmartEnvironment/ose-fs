'use strict';

var Ose = require('ose');
var M = Ose.module(module);

// Public {{{1
exports.tapDiscard = null;

exports.displayData = function() {  // {{{2
  var that = this;

  if (
    this.stateObj.filter &&
    this.stateObj.filter.parent &&
    ! this.stateObj.filter.search
  ) {
    $('<li>')
      .append($('<p>')
        .text('..')
        .on('click', onTap)
      )
      .appendTo(this.$(' > ul'))
    ;
  }

  function onTap(ev) { // {{{3
    var parentDir = that.stateObj.filter.parent.split('/');
    parentDir.pop();
    that.update({filter: {parent: parentDir.join('/')}});
  }

  // }}}
};

exports.tapItem = function(ev, pagelet) {  // {{{2
  switch (pagelet.entry.kind.name) {
  case 'dir':
    this.update({filter: {parent: pagelet.entry.id}});
    return false;
  case 'file':
    this.tapMediaItem(ev, pagelet);
    return true;
  default:
    M.log.unhandled('Invalid entry', pagelet.entry.identify());
    return false;
  }
};

// }}}1
