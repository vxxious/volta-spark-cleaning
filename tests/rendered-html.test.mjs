import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://voltaspark.example/", {
      headers: { accept: "text/html", host: "voltaspark.example" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Volta Spark booking experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Volta Spark/);
  assert.match(html, /A cleaner space/);
  assert.match(html, /without the stress/);
  assert.match(html, /Quick booking/);
  assert.match(html, /Start your booking here/);
  assert.match(html, /2348035496228/);
  assert.doesNotMatch(html, /clean-rings|orbit|why-visual/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("ships product metadata and removes starter dependencies", async () => {
  const [layout, page, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Professional Cleaning in Lagos/);
  assert.match(layout, /\/og\.png/);
  assert.match(page, /wa\.me\/\$\{WHATSAPP_NUMBER\}/);
  assert.match(page, /brandIcons\.instagram/);
  assert.match(page, /brandIcons\.tiktok/);
  assert.match(page, /brandIcons\.facebook/);
  assert.match(page, /icon: RefreshCcw/);
  assert.doesNotMatch(page, /\bPartyPopper\b/);
  assert.doesNotMatch(page, /\bSparkles\b|\bCamera\b|\bMusic2\b|\bUsersRound\b/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /SkeletonPreview/);
});
