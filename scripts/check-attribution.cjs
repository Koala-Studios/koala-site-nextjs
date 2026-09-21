/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS verification runner. */
/* Regression checks for lead attribution; no browser, network or live submissions. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const output = ts.transpileModule(fs.readFileSync("lib/attribution.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const context = { exports: {}, URL, Date, Math };
vm.runInNewContext(output, context);
const { updateAttribution, pruneAttribution, attributionFields, RETENTION_MS } = context.exports;
const now = 1800000000000;
const day = 86400000;
const base = "https://koalastudios.ca";
let data = updateAttribution({}, base + "/maya?utm_source=maya&utm_medium=print&utm_campaign=maya", "", now);
assert.equal(data.first.source, "maya");
assert.equal(data.maya.evidence, "campaign");
data = updateAttribution(data, base + "/work", base + "/maya", now + day);
assert.equal(data.latest.medium, "print");
assert.equal(data.maya.at, now, "internal navigation does not renew the referral");
data = updateAttribution(data, base + "/services?utm_source=newsletter&utm_medium=email&utm_campaign=autumn", "", now + 2 * day);
assert.equal(data.first.source, "maya");
assert.equal(data.latest.source, "newsletter");
assert.equal(data.maya.at, now);
data = updateAttribution(data, base + "/contact?interest=brand-growth-audit&source=maya", "", now + 3 * day);
assert.equal(data.latest.source, "newsletter", "internal CTA must not steal campaign credit");
assert.equal(data.maya.evidence, "campaign", "contact intent must not replace stronger referral evidence");
const fields = attributionFields(data);
assert.equal(fields.first_source, "maya");
assert.equal(fields.latest_source, "newsletter");
assert.equal(fields.maya_associated, "yes");
const expired = pruneAttribution(data, now + RETENTION_MS);
assert.equal(expired.first, undefined);
assert.equal(expired.maya, undefined);
assert.equal(expired.latest.source, "newsletter", "each touch expires from its own timestamp");
assert.equal(Object.keys(pruneAttribution(data, now + RETENTION_MS + 3 * day)).length, 0);
const direct = updateAttribution({}, base + "/maya", "", now);
assert.equal(direct.first.source, "direct");
assert.equal(direct.maya, undefined, "visiting the page alone is not proven referral");
const intent = updateAttribution(direct, base + "/contact?source=maya", "", now + day);
assert.equal(intent.first.source, "direct");
assert.equal(intent.maya.evidence, "maya_contact_intent");
const domain = updateAttribution({}, base + "/maya", "https://www.mayaamani.com/", now);
assert.equal(domain.first.source, "maya");
assert.equal(domain.maya.evidence, "domain_referral");
assert.equal(Object.keys(pruneAttribution({ first: { source: "bad", at: now + day } }, now)).length, 0);
assert.equal(updateAttribution({}, base + "/?utm_source=person%40example.com", "", now).first.source, "direct");
const blocked = { exports: {}, URL, Date, Math, document: { referrer: "" }, window: { location: { href: base + "/maya?utm_source=maya" }, get localStorage() { throw new Error("blocked"); } } };
vm.runInNewContext(output, blocked);
assert.equal(blocked.exports.captureAttribution().first.source, "maya");
assert.equal(blocked.exports.readAttribution().maya.evidence, "campaign");
// Every attribution field must be declared for Netlify's static form detection.
const html = fs.readFileSync("public/__forms.html", "utf8");
for (const name of Object.keys(fields)) assert.ok(html.includes(`name="${name}"`), `Missing form field ${name}`);
console.log("Attribution checks passed: navigation, return visits, competing campaigns, 60-day expiry, source evidence, blocked storage, and Netlify field parity.");
