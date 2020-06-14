// -*- coding: utf-8, tab-width: 2 -*-

import 'usnam-pmb';
import 'p-fatal';
import test from 'p-tape';
import objPop from 'objpop';

import lookup from '..';

const powerModes = {
  presentation: { HandleLidSwitch: 'ignore',  IdleAction: 'ignore' },
  travel:       { HandleLidSwitch: 'suspend', IdleAction: 'lock' },
};


test('presentation mode', (t) => {
  t.plan(2);
  const request = {
    unrelated: "shouldn't matter",
    powerMode: 'presentation',
  };
  const update = lookup('system config', request, powerModes, 'powerMode');
  t.strictEqual(update.HandleLidSwitch, 'ignore');
  t.strictEqual(update.IdleAction, 'ignore');
});


test('travel mode', (t) => {
  t.plan(2);
  const request = {
    unrelated: "shouldn't matter",
    powerMode: 'travel',
  };
  const update = lookup('system config', request, powerModes, 'powerMode');
  t.strictEqual(update.HandleLidSwitch, 'suspend');
  t.strictEqual(update.IdleAction, 'lock');
});


test('garden mode', (t) => {
  t.plan(1);
  const request = {
    unrelated: "shouldn't matter",
    powerMode: 'garden',
  };
  t.throws(() => lookup('system config', request, powerModes, 'powerMode'),
    / must be one of [a-z "]+, not string "garden"$/);
});


test('false-y values', (t) => {
  t.plan(5);
  const falseyValues = { e: '', i: NaN, n: null, u: undefined, z: 0 };
  function c(k, v) {
    const l = lookup('false-y value', [k], falseyValues, 0);
    t.strictEqual(l, v);
  }
  c('e', '');
  c('n', null);
  c('u');
  c('z', 0);
  const j = lookup('false-y value', ['i'], falseyValues, 0);
  t.strictEqual(String(j), 'NaN');
});


test('getter function', (t) => {
  t.plan(7);
  const modes = objPop({
    ac: 'presentation',
    bat: 'travel',
  });
  const pop = modes.ifHas;

  t.strictEqual(modes.isEmpty(), false);
  const upd1 = lookup('system config', pop, powerModes, 'ac');
  t.strictEqual(upd1.HandleLidSwitch, 'ignore');

  t.throws(() => lookup('system config', pop, powerModes, 'solar'),
    / must be one of [a-z "]+, not undefined$/);
  t.throws(() => lookup('system config', pop, powerModes, 'solar', 'hydro'),
    / must be one of [a-z "]+, not string "hydro"$/);

  t.strictEqual(modes.isEmpty(), false);
  const upd2 = lookup('system config', pop, powerModes, 'bat');
  t.strictEqual(modes.isEmpty(), true);
  t.strictEqual(upd2.HandleLidSwitch, 'suspend');
});











// scroll
