export interface Template {
  id: string;
  name: string;
  tagline: string;
  bg: string;
  card: string;
  primary: string;
  foreground: string;
  mutedFg: string;
  gradient: [string, string];
  fontSerif: string;
  fontSans: string;
  previewBg: string;
  previewAccent: string;
  previewText: string;
  cssVars: Record<string, string>;
}

export const TEMPLATES: Template[] = [
  {
    id: "noir-gold",
    name: "Noir & Gold",
    tagline: "Dark Luxury",
    bg: "#0a0a0a",
    card: "#111111",
    primary: "#D4AF37",
    foreground: "#F5F0E8",
    mutedFg: "#888",
    gradient: ["#D4AF37", "#C9A84C"],
    fontSerif: "Cormorant Garamond",
    fontSans: "Jost",
    previewBg: "#0a0a0a",
    previewAccent: "#D4AF37",
    previewText: "#F5F0E8",
    cssVars: {
      "--background": "0 0% 4%",
      "--foreground": "45 29% 97%",
      "--card": "0 0% 7%",
      "--card-foreground": "45 29% 97%",
      "--card-border": "43 74% 49%",
      "--popover": "0 0% 7%",
      "--popover-foreground": "45 29% 97%",
      "--popover-border": "43 74% 49%",
      "--primary": "43 74% 49%",
      "--primary-foreground": "0 0% 4%",
      "--secondary": "0 0% 12%",
      "--secondary-foreground": "45 29% 97%",
      "--muted": "0 0% 15%",
      "--muted-foreground": "0 0% 65%",
      "--accent": "43 74% 49%",
      "--accent-foreground": "0 0% 4%",
      "--border": "0 0% 15%",
      "--input": "0 0% 15%",
      "--ring": "43 74% 49%",
      "--app-font-serif": "'Cormorant Garamond', serif",
      "--app-font-sans": "'Jost', sans-serif",
    },
  },
  {
    id: "blush-rose",
    name: "Blush & Rose",
    tagline: "Soft Feminine",
    bg: "#FDF8F8",
    card: "#FFF0F3",
    primary: "#C2185B",
    foreground: "#2D1B25",
    mutedFg: "#9E7B8A",
    gradient: ["#E91E8C", "#C2185B"],
    fontSerif: "Playfair Display",
    fontSans: "DM Sans",
    previewBg: "#FDF8F8",
    previewAccent: "#C2185B",
    previewText: "#2D1B25",
    cssVars: {
      "--background": "350 40% 99%",
      "--foreground": "340 30% 15%",
      "--card": "350 60% 97%",
      "--card-foreground": "340 30% 15%",
      "--card-border": "340 55% 60%",
      "--popover": "350 60% 97%",
      "--popover-foreground": "340 30% 15%",
      "--popover-border": "340 55% 60%",
      "--primary": "340 55% 60%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "350 40% 93%",
      "--secondary-foreground": "340 30% 15%",
      "--muted": "350 30% 94%",
      "--muted-foreground": "340 20% 55%",
      "--accent": "340 55% 60%",
      "--accent-foreground": "0 0% 100%",
      "--border": "350 30% 88%",
      "--input": "350 30% 88%",
      "--ring": "340 55% 60%",
      "--app-font-serif": "'Playfair Display', serif",
      "--app-font-sans": "'DM Sans', sans-serif",
    },
  },
  {
    id: "emerald-luxe",
    name: "Emerald Luxe",
    tagline: "Forest Elegance",
    bg: "#050F0A",
    card: "#0A1A10",
    primary: "#D4AF37",
    foreground: "#E8F0EB",
    mutedFg: "#6B8C75",
    gradient: ["#D4AF37", "#A8833A"],
    fontSerif: "Cormorant Garamond",
    fontSans: "Nunito Sans",
    previewBg: "#050F0A",
    previewAccent: "#4CAF50",
    previewText: "#E8F0EB",
    cssVars: {
      "--background": "155 50% 4%",
      "--foreground": "140 20% 93%",
      "--card": "155 40% 7%",
      "--card-foreground": "140 20% 93%",
      "--card-border": "43 74% 49%",
      "--popover": "155 40% 7%",
      "--popover-foreground": "140 20% 93%",
      "--popover-border": "43 74% 49%",
      "--primary": "43 74% 49%",
      "--primary-foreground": "155 50% 4%",
      "--secondary": "155 30% 11%",
      "--secondary-foreground": "140 20% 93%",
      "--muted": "155 25% 14%",
      "--muted-foreground": "140 15% 60%",
      "--accent": "150 40% 35%",
      "--accent-foreground": "140 20% 93%",
      "--border": "155 25% 14%",
      "--input": "155 25% 14%",
      "--ring": "43 74% 49%",
      "--app-font-serif": "'Cormorant Garamond', serif",
      "--app-font-sans": "'Nunito Sans', sans-serif",
    },
  },
  {
    id: "midnight-sapphire",
    name: "Midnight Sapphire",
    tagline: "Modern & Bold",
    bg: "#050A1A",
    card: "#0A1028",
    primary: "#7CB9E8",
    foreground: "#E8EFF8",
    mutedFg: "#6B82A8",
    gradient: ["#7CB9E8", "#4A90D9"],
    fontSerif: "Libre Baskerville",
    fontSans: "Inter",
    previewBg: "#050A1A",
    previewAccent: "#7CB9E8",
    previewText: "#E8EFF8",
    cssVars: {
      "--background": "225 60% 6%",
      "--foreground": "215 30% 95%",
      "--card": "225 50% 10%",
      "--card-foreground": "215 30% 95%",
      "--card-border": "210 70% 70%",
      "--popover": "225 50% 10%",
      "--popover-foreground": "215 30% 95%",
      "--popover-border": "210 70% 70%",
      "--primary": "210 70% 70%",
      "--primary-foreground": "225 60% 6%",
      "--secondary": "225 40% 14%",
      "--secondary-foreground": "215 30% 95%",
      "--muted": "225 35% 17%",
      "--muted-foreground": "215 20% 62%",
      "--accent": "210 55% 50%",
      "--accent-foreground": "215 30% 95%",
      "--border": "225 35% 17%",
      "--input": "225 35% 17%",
      "--ring": "210 70% 70%",
      "--app-font-serif": "'Libre Baskerville', serif",
      "--app-font-sans": "'Inter', sans-serif",
    },
  },
  {
    id: "ivory-mauve",
    name: "Ivory & Mauve",
    tagline: "Romantic & Refined",
    bg: "#FAF8F5",
    card: "#F4EFF8",
    primary: "#8E44AD",
    foreground: "#2A1B35",
    mutedFg: "#8A7B95",
    gradient: ["#8E44AD", "#6C3483"],
    fontSerif: "Playfair Display",
    fontSans: "Lato",
    previewBg: "#FAF8F5",
    previewAccent: "#8E44AD",
    previewText: "#2A1B35",
    cssVars: {
      "--background": "40 30% 98%",
      "--foreground": "280 30% 16%",
      "--card": "280 30% 95%",
      "--card-foreground": "280 30% 16%",
      "--card-border": "280 40% 47%",
      "--popover": "280 30% 95%",
      "--popover-foreground": "280 30% 16%",
      "--popover-border": "280 40% 47%",
      "--primary": "280 40% 47%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "280 20% 92%",
      "--secondary-foreground": "280 30% 16%",
      "--muted": "280 15% 93%",
      "--muted-foreground": "280 15% 55%",
      "--accent": "280 40% 47%",
      "--accent-foreground": "0 0% 100%",
      "--border": "280 20% 85%",
      "--input": "280 20% 85%",
      "--ring": "280 40% 47%",
      "--app-font-serif": "'Playfair Display', serif",
      "--app-font-sans": "'Lato', sans-serif",
    },
  },
  {
    id: "copper-charcoal",
    name: "Copper & Charcoal",
    tagline: "Urban & Edgy",
    bg: "#0D0A08",
    card: "#161210",
    primary: "#D2691E",
    foreground: "#F0EBE5",
    mutedFg: "#8A7060",
    gradient: ["#E07B39", "#C2561A"],
    fontSerif: "Bodoni Moda",
    fontSans: "Raleway",
    previewBg: "#0D0A08",
    previewAccent: "#D2691E",
    previewText: "#F0EBE5",
    cssVars: {
      "--background": "20 20% 6%",
      "--foreground": "30 25% 93%",
      "--card": "20 15% 9%",
      "--card-foreground": "30 25% 93%",
      "--card-border": "20 65% 47%",
      "--popover": "20 15% 9%",
      "--popover-foreground": "30 25% 93%",
      "--popover-border": "20 65% 47%",
      "--primary": "20 65% 47%",
      "--primary-foreground": "20 20% 6%",
      "--secondary": "20 12% 13%",
      "--secondary-foreground": "30 25% 93%",
      "--muted": "20 10% 16%",
      "--muted-foreground": "20 10% 60%",
      "--accent": "20 65% 47%",
      "--accent-foreground": "20 20% 6%",
      "--border": "20 10% 16%",
      "--input": "20 10% 16%",
      "--ring": "20 65% 47%",
      "--app-font-serif": "'Bodoni Moda', serif",
      "--app-font-sans": "'Raleway', sans-serif",
    },
  },
];

export const DEFAULT_TEMPLATE_ID = "noir-gold";

export function getTemplate(id: string): Template {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

export function applyTemplate(id: string): void {
  const t = getTemplate(id);
  const root = document.documentElement;
  Object.entries(t.cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  const existingLink = document.getElementById("template-font-link") as HTMLLinkElement | null;
  const fontMap: Record<string, string> = {
    "Playfair Display": "Playfair+Display:ital,wght@0,400;0,600;0,700;1,400",
    "Libre Baskerville": "Libre+Baskerville:wght@400;700",
    "Bodoni Moda": "Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;1,6..96,400",
    "DM Sans": "DM+Sans:wght@300;400;500;600",
    "Nunito Sans": "Nunito+Sans:wght@300;400;600",
    "Inter": "Inter:wght@300;400;500;600",
    "Lato": "Lato:wght@300;400;700",
    "Raleway": "Raleway:wght@300;400;500;600",
  };

  const extraFonts = [t.fontSerif, t.fontSans]
    .filter((f) => !["Cormorant Garamond", "Jost"].includes(f))
    .map((f) => fontMap[f])
    .filter(Boolean);

  if (extraFonts.length > 0) {
    const href = `https://fonts.googleapis.com/css2?${extraFonts.map((f) => `family=${f}`).join("&")}&display=swap`;
    if (existingLink) {
      existingLink.href = href;
    } else {
      const link = document.createElement("link");
      link.id = "template-font-link";
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }
}
