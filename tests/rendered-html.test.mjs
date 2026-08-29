import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://voltaspark.example${path}`, {
      headers: { accept: "text/html", host: "voltaspark.example" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Volta Spark home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Volta Spark/);
  assert.match(html, /A cleaner space/);
  assert.match(html, /without the stress/);
  assert.match(html, /Popular services/);
  assert.match(html, /href="\/booking"/);
  assert.doesNotMatch(html, /clean-rings|orbit|why-visual/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("serves distinct services, about, booking and contact pages", async () => {
  const expectations = [
    ["/services", /Cleaning that fits your space and schedule/],
    ["/about", /We take care of the mess/],
    ["/booking", /Start your request/],
    ["/contact", /Let us talk about your space/],
  ];

  for (const [path, expectedCopy] of expectations) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
    assert.match(await response.text(), expectedCopy);
  }
});

test("ships product metadata and removes starter dependencies", async () => {
  const [layout, page, bookingForm, siteData, socialLinks, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/booking-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/site-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/social-links.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Professional Cleaning in Lagos/);
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /SiteHeader/);
  assert.match(layout, /SiteFooter/);
  assert.match(bookingForm, /wa\.me\/\$\{WHATSAPP_NUMBER\}/);
  assert.match(siteData, /icon: RefreshCcw/);
  assert.match(socialLinks, /Instagram/);
  assert.match(socialLinks, /TikTok/);
  assert.match(socialLinks, /Facebook/);
  assert.doesNotMatch(siteData, /\bPartyPopper\b|\bSparkles\b/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /SkeletonPreview/);
});
