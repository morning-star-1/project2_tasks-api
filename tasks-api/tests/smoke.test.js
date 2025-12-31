const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('required files exist', () => {
  const required = ['package.json', 'src/app.js', 'src/server.js'];
  const missing = required.filter((p) => !fs.existsSync(path.join(root, p)));
  assert.equal(missing.length, 0, 'Missing: ' + missing.join(', '));
});
