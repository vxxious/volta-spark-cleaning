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

test("server-renders the focused Volta Spark homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Volta Spark/);
  assert.match(html, /A cleaner space/);
  assert.match(html, /without the stress/);
  assert.match(html, /Cleaning for the way you use your space/);
  assert.match(html, /Careful work\. Clear communication/);
  assert.match(html, /id="services"/);
  assert.match(html, /id="about"/);
  assert.match(html, /href="\/booking"/);
  assert.doesNotMatch(html, /id="book"|<form\b/);
  assert.doesNotMatch(html, /mobile-booking-bar|Start your booking/);
  assert.match(html, /brand-marquee/);
  assert.match(html, /hero-visual-services/);
  assert.doesNotMatch(html, /clean-rings|orbit|why-visual/);
  assert.doesNotMatch(html, /section-kicker|page-hero/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("legacy content URLs return visitors to the homepage", async () => {
  const expectations = [
    ["/services", "/#services"],
    ["/about", "/#about"],
    ["/contact", "/booking"],
  ];

  for (const [path, expectedLocation] of expectations) {
    const response = await render(path);
    assert.ok([307, 308].includes(response.status), `${path} should redirect`);
    const redirectUrl = new URL(response.headers.get("location"), "https://voltaspark.example");
    assert.equal(redirectUrl.pathname + redirectUrl.hash, expectedLocation);
  }
});

test("booking renders as a dedicated page", async () => {
  const response = await render("/booking?service=Deep%20cleaning");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Book your clean/);
  assert.match(html, /id="booking-form"/);
  assert.match(html, /Deep cleaning/);
  assert.match(html, /Continue to WhatsApp/);
  assert.doesNotMatch(html, /redirect/);
});

test("publishes canonical, structured and crawl-discovery metadata", async () => {
  const [homeResponse, bookingResponse, robotsResponse, sitemapResponse] = await Promise.all([
    render("/"),
    render("/booking"),
    render("/robots.txt"),
    render("/sitemap.xml"),
  ]);

  const [homeHtml, bookingHtml, robotsText, sitemapText] = await Promise.all([
    homeResponse.text(),
    bookingResponse.text(),
    robotsResponse.text(),
    sitemapResponse.text(),
  ]);

  assert.match(homeHtml, /rel="canonical" href="https:\/\/voltasparkcleaning\.vercel\.app"/);
  assert.match(homeHtml, /application\/ld\+json/);
  assert.match(homeHtml, /LocalBusiness/);
  assert.match(bookingHtml, /rel="canonical" href="https:\/\/voltasparkcleaning\.vercel\.app\/booking"/);
  assert.equal(robotsResponse.status, 200);
  assert.match(robotsText, /Sitemap: https:\/\/voltasparkcleaning\.vercel\.app\/sitemap\.xml/);
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapText, /<loc>https:\/\/voltasparkcleaning\.vercel\.app<\/loc>/);
  assert.match(sitemapText, /<loc>https:\/\/voltasparkcleaning\.vercel\.app\/booking<\/loc>/);
});

test("ships product metadata, purposeful motion and no starter dependencies", async () => {
  const [layout, page, bookingForm, siteData, socialLinks, serviceGrid, heroVisual, brandMarquee, whatsappIcon, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/booking-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/site-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/social-links.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/service-grid.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/hero-visual.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/brand-marquee.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/whatsapp-icon.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Professional Cleaning in Lagos/);
  assert.match(layout, /\/og-image\.jpg/);
  assert.match(layout, /\/favicon\.jpg/);
  assert.doesNotMatch(layout, /\/og\.png|favicon\.svg/);
  assert.match(layout, /@fontsource-variable\/archivo/);
  assert.match(layout, /SiteHeader/);
  assert.match(layout, /SiteFooter/);
  assert.match(layout, /Skip to main content/);
  assert.match(bookingForm, /wa\.me\/\$\{WHATSAPP_NUMBER\}/);
  assert.doesNotMatch(siteData, /icon:/);
  assert.match(whatsappIcon, /viewBox="0 0 24 24"/);
  assert.match(page, /WhatsAppIcon/);
  assert.doesNotMatch(page, /MessageCircle|ShieldCheck|CalendarCheck2|\bLeaf\b/);
  assert.match(socialLinks, /Instagram/);
  assert.match(socialLinks, /TikTok/);
  assert.match(socialLinks, /Facebook/);
  assert.match(serviceGrid, /IntersectionObserver/);
  assert.match(serviceGrid, /--entry-delay/);
  assert.match(heroVisual, /requestAnimationFrame/);
  assert.match(heroVisual, /prefers-reduced-motion/);
  assert.match(brandMarquee, /visibilitychange/);
  assert.match(styles, /wordmark-scroll 28s linear infinite/);
  assert.match(styles, /@keyframes service-enter/);
  assert.doesNotMatch(siteData, /\bPartyPopper\b|\bSparkles\b/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /SkeletonPreview/);
});
