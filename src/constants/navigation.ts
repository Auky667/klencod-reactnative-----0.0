import type { AccentKey } from "@/types";

export const ROUTES = {
  home: "/",
  seerah: "/seerah",
  aqeedah: "/aqeedah",
  quran: "/quran",
  fiqh: "/fiqh",
  search: "/search",
  favorites: "/favorites",
  about: "/about",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface NavItem {
  path: RoutePath;
  label: string;
  icon: string;
  accent: AccentKey;
  description: string;
}

/** عناصر القائمة الجانبية بالترتيب المطلوب */
export const NAV_ITEMS: NavItem[] = [
  {
    path: ROUTES.home,
    label: "الرئيسية",
    icon: "home",
    accent: "gold",
    description: "واجهة الموسوعة وأقسامها",
  },
  {
    path: ROUTES.seerah,
    label: "السيرة النبوية",
    icon: "moon",
    accent: "seerah",
    description: "محطات النبوة والشمائل والخلفاء",
  },
  {
    path: ROUTES.aqeedah,
    label: "العقيدة",
    icon: "shield",
    accent: "aqeedah",
    description: "توحيد وإيمان ومنهج أهل السنة",
  },
  {
    path: ROUTES.quran,
    label: "القرآن الكريم",
    icon: "book",
    accent: "quran",
    description: "علوم القرآن والتجويد والسور",
  },
  {
    path: ROUTES.fiqh,
    label: "الفقه الإسلامي",
    icon: "scale",
    accent: "fiqh",
    description: "الأبواب الفقهية السبعة",
  },
  {
    path: ROUTES.about,
    label: "عن التطبيق",
    icon: "info",
    accent: "gold",
    description: "الرسالة والأهداف والمنهجية",
  },
];

/** شريط التنقل السفلي للهاتف */
export const TAB_ITEMS: NavItem[] = [
  NAV_ITEMS[0],
  NAV_ITEMS[1],
  NAV_ITEMS[3],
  NAV_ITEMS[4],
  NAV_ITEMS[2],
];
