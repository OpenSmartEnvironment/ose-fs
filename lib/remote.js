'use strict';

const O = require('ose')(module)
  .singleton()
  .prepend('ose/lib/schema/remote')
;

exports = O.init();

var Path = require('path');

exports.find = function(shard, ident, cb) {
  var eid = alias2Eid(shard, ident);
  if (eid) {
    return this.get(shard, eid, cb);
  }

  return cb(O.error(shard, 'Invalid path', ident));
};

exports.findAlias = function(shard, alias, cb) {
  return shard.nextReady(function(err) {
    if (err) return cb(err);

    var res = alias2Eid(shard, alias);
    if (! res) {
      return cb(O.error(shard, 'Invalid path', alias));
    }

    return cb(null, res);
  });
};

function alias2Eid(shard, alias) {
  if (alias === '') return '/';

  var root = (shard.root || '');
  var path = Path.normalize(root + '/' + alias);
  if (root && path.indexOf(root) !== 0) {
    return null
  }

  return path.substring(root.length);
}

