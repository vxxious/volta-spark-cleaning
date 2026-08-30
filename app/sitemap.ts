import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/booking`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
