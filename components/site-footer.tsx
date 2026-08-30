/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors bypass unreliable Vinext client routing in production. */

import { DISPLAY_PHONE, WHATSAPP_NUMBER } from "../lib/site-data";
import { Brand } from "./brand";
import { SocialLinks } from "./social-links";
import { WhatsAppIcon } from "./whatsapp-icon";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <Brand />
          <p>Professional cleaning for homes, offices and short-lets across Lagos.</p>
        </div>
        <div className="footer-column">
          <strong>Explore</strong>
          <a href="/#services">Services</a>
          <a href="/#about">Why Volta Spark</a>
          <a href="/booking">Book a clean</a>
        </div>
        <div className="footer-column">
          <strong>Contact</strong>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><WhatsAppIcon width={15} height={15} aria-hidden="true" />{DISPLAY_PHONE}</a>
          <span>Lagos, Nigeria</span>
        </div>
        <div className="footer-social">
          <strong>Follow</strong>
          <SocialLinks />
        </div>
      </div>
      <div className="footer-bottom">
        <span>Copyright 2026 Volta Spark Cleaning Services</span>
        <a
          href="https://unsplash.com/photos/a-woman-mops-a-bright-modern-living-room-floor-2NcTLdFHpH8"
          target="_blank"
          rel="noreferrer"
        >Photography by Vitaly Gariev</a>
      </div>
    </footer>
  );
}
