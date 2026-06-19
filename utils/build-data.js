#!/usr/bin/env node
/* ---------------------------------------------------------------------------
 * build-data.js — generate browser-loadable mirrors of the data/*.json files.
 *
 * Browsers block fetch() of local files under file://, so the front-end loads
 * the data via <script> globals instead. This script regenerates those JS
 * mirrors from the canonical JSON. Run it after editing any data/*.json:
 *
 *     node utils/build-data.js
 * ------------------------------------------------------------------------- */
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'data');
const mirrors = [
  { json: 'house-plan.json', js: 'plan-data.js', global: 'PLAN_DATA' },
  { json: 'ssr-rates.json',  js: 'ssr-rates.js', global: 'SSR_RATES' }
];

for (const m of mirrors) {
  const obj = JSON.parse(fs.readFileSync(path.join(DATA, m.json), 'utf8'));
  const banner = `/* AUTO-GENERATED from data/${m.json} by utils/build-data.js — do not edit. */\n`;
  const body = `window.${m.global} = ${JSON.stringify(obj, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA, m.js), banner + body);
  console.log(`wrote data/${m.js}  (window.${m.global})`);
}
