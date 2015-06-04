'use strict';

// Public
exports.printMediaHistory = function(li, entry) {
  li.append('div').add([
    '<h3>File:</h3>',
    li.new('p').text(this.getCaption({data: entry.dval.media})),
  ]);

  return li;
  /*
  li
    .append($('<p>').text('File: '))
    .append($('<p>').text(this.getCaption({data: entry.dval.media})))
  ;
  */
};

