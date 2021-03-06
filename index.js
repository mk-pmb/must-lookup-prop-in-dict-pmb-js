﻿/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, objHas = Object.prototype.hasOwnProperty, conj = require('conjunct');

function lookup(descr, cfg, dict, key, dflt) {
  var opt = (function () {
    if (!cfg) { return dflt; }
    if (typeof cfg === 'function') { return cfg(key, dflt); }
    if (objHas.call(cfg, key)) { return cfg[key]; }
    return dflt;
  }());
  if (dict && (opt !== undefined) && objHas.call(dict, opt)) {
    return dict[opt];
  }
  descr = (String(descr || dict) + ': ' + JSON.stringify(key)
    + ' must be one of ' + (conj.so(Object.keys(dict).map(JSON.stringify))
      || '(Impossible choice: No valid options)') + ', not '
    + (opt ? (typeof opt) + ' ' + JSON.stringify(opt) : String(opt)));
  throw new Error(descr);
}

module.exports = lookup;
