/* eslint-disable @typescript-eslint/no-require-imports -- Standalone regression runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(fs.readFileSync('lib/openai-click.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const retention = 60 * 24 * 60 * 60 * 1000;
let now = 1800000000000;
const DateMock = { now: () => now };
function load(storage = new Map(), blocked = false) {
 const window = { location: { href: 'https://koalastudios.ca/?oppref=gAAAAA_synthetic-123=' } };
 Object.defineProperty(window, 'sessionStorage', { get() { if (blocked) throw Error('blocked'); return { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) }; } });
 const ctx = { exports: {}, require: () => ({ RETENTION_MS: retention }), URL, Date: DateMock, window };
 vm.runInNewContext(source, ctx);
 return ctx;
}
const store = new Map();
const ctx = load(store);
assert.equal(ctx.exports.captureOpenAIClickRef(), 'gAAAAA_synthetic-123=');
const key = ctx.exports.OPENAI_CLICK_KEY;
const firstStored = store.get(key);
ctx.window.location.href = 'https://koalastudios.ca/contact?interest=agentic-search-optimization';
now += 1000;
assert.equal(ctx.exports.openAIClickFields().oppref, 'gAAAAA_synthetic-123=');
assert.equal(store.get(key), firstStored, 'internal navigation must not renew click timestamp');
ctx.window.location.href = 'https://koalastudios.ca/contact/success';
assert.equal(ctx.exports.readOpenAIClickRef(), 'gAAAAA_synthetic-123=');
const reloaded = load(store);
reloaded.window.location.href = 'https://koalastudios.ca/contact/success';
assert.equal(reloaded.exports.readOpenAIClickRef(), 'gAAAAA_synthetic-123=', 'same-tab reload preserves click reference');
ctx.window.location.href = 'https://koalastudios.ca/?oppref=gAAAAA_new';
assert.equal(ctx.exports.captureOpenAIClickRef(), 'gAAAAA_new', 'new click replaces previous one');
for (const invalid of ['person@example.com', 'https://example.com/private', '<script>', 'x'.repeat(2049)]) {
 const c = load(); c.window.location.href = 'https://koalastudios.ca/?oppref=' + encodeURIComponent(invalid);
 assert.equal(c.exports.captureOpenAIClickRef(), '', 'reject invalid or oversized opaque reference');
}
const corrupted = load(new Map([[key, '{bad json']]));
assert.equal(corrupted.exports.readOpenAIClickRef(), '');
const blocked = load(new Map(), true);
assert.equal(blocked.exports.captureOpenAIClickRef(), 'gAAAAA_synthetic-123=');
blocked.window.location.href = 'https://koalastudios.ca/contact/success';
assert.equal(blocked.exports.readOpenAIClickRef(), 'gAAAAA_synthetic-123=', 'blocked storage keeps in-memory navigation usable');
now += retention;
assert.equal(ctx.exports.readOpenAIClickRef(), '', 'expired reference discarded');
const future = load(new Map([[key, JSON.stringify({ ref: 'gAAAAA_future', at: now + 1 })]]));
assert.equal(future.exports.readOpenAIClickRef(), '');
const html = fs.readFileSync('public/__forms.html', 'utf8');
for (const field of ['oppref', 'offer_id', 'interest-agentic-search', 'interest-audit', 'form-name', 'bot-field']) assert.ok(html.includes(`name="${field}"`));
assert.ok(!fs.readFileSync('lib/attribution.ts', 'utf8').includes('oppref'), 'opaque reference never enters generic analytics parameters');
console.log('OpenAI click checks passed: navigation/success/reload, new click, corruption, invalid input, expiry, blocked storage and static form fields.');
