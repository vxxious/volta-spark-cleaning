import type { LucideIcon } from "lucide-react";
import {
  Building2,
  HardHat,
  Home,
  RefreshCcw,
  SprayCan,
  Truck,
} from "lucide-react";

export const WHATSAPP_NUMBER = "2348035496228";
export const DISPLAY_PHONE = "+234 803 549 6228";

export type CleaningService = {
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
};

export const services: CleaningService[] = [
  {
    name: "Home cleaning",
    shortName: "Home",
    description: "Regular care for apartments and family homes, shaped around your routine.",
    icon: Home,
  },
  {
    name: "Deep cleaning",
    shortName: "Deep clean",
    description: "A detailed, top-to-bottom reset for spaces that need extra attention.",
    icon: SprayCan,
  },
  {
    name: "Office and commercial",
    shortName: "Office",
    description: "Dependable cleaning that keeps teams comfortable and spaces client-ready.",
    icon: Building2,
  },
  {
    name: "Post-construction",
    shortName: "Post-build",
    description: "Fine dust and debris cleared after renovations or building work.",
    icon: HardHat,
  },
  {
    name: "Move-in or move-out",
    shortName: "Moving",
    description: "A fresh start before you unpack, or a clean finish before handover.",
    icon: Truck,
  },
  {
    name: "Event and short-let reset",
    shortName: "Event / short-let",
    description: "Fast, thoughtful resets before guests arrive or after the celebration ends.",
    icon: RefreshCcw,
  },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/voltaspark_cleaning_services?igsi=MTZpYnBrNjkyMW1iag==",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@voltasparkcleaning?_r=1&_t=ZS-99Ce5FMpStc",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1EpgJZsswM/?mibextid=wwXIfr",
  },
] as const;
