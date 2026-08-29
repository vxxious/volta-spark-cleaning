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

test("server-renders the complete one-page Volta Spark journey", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Volta Spark/);
  assert.match(html, /A cleaner space/);
  assert.match(html, /without the stress/);
  assert.match(html, /Choose the clean your space needs/);
  assert.match(html, /Careful work\. Clear communication/);
  assert.match(html, /Tell us what needs cleaning/);
  assert.match(html, /id="services"/);
  assert.match(html, /id="about"/);
  assert.match(html, /id="book"/);
  assert.match(html, /href="\/#book"/);
  assert.doesNotMatch(html, /clean-rings|orbit|why-visual/);
  assert.doesNotMatch(html, /section-kicker|page-hero/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("legacy page URLs return visitors to the one-page journey", async () => {
  const expectations = [
    ["/services", "/#services"],
    ["/about", "/#about"],
    ["/booking", "/#book"],
    ["/contact", "/#book"],
  ];

  for (const [path, expectedLocation] of expectations) {
    const response = await render(path);
    assert.ok([307, 308].includes(response.status), `${path} should redirect`);
    const redirectUrl = new URL(response.headers.get("location"), "https://voltaspark.example");
    assert.equal(redirectUrl.pathname + redirectUrl.hash, expectedLocation);
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
  assert.match(layout, /Skip to main content/);
  assert.match(bookingForm, /wa\.me\/\$\{WHATSAPP_NUMBER\}/);
  assert.match(siteData, /icon: RefreshCcw/);
  assert.match(socialLinks, /Instagram/);
  assert.match(socialLinks, /TikTok/);
  assert.match(socialLinks, /Facebook/);
  assert.doesNotMatch(siteData, /\bPartyPopper\b|\bSparkles\b/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /SkeletonPreview/);
});
