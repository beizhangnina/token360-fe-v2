export type Country = {
  code: string;
  name: string;
  latam?: boolean;
};

export const COUNTRIES: Country[] = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "PL", name: "Poland" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "PH", name: "Philippines" },
  { code: "VN", name: "Vietnam" },
  { code: "TH", name: "Thailand" },
  { code: "MY", name: "Malaysia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "IL", name: "Israel" },
  { code: "TR", name: "Türkiye" },
  { code: "ZA", name: "South Africa" },
  { code: "NG", name: "Nigeria" },
  { code: "KE", name: "Kenya" },
  { code: "EG", name: "Egypt" },
  // LATAM (+5% bonus)
  { code: "BR", name: "Brazil", latam: true },
  { code: "MX", name: "Mexico", latam: true },
  { code: "AR", name: "Argentina", latam: true },
  { code: "CO", name: "Colombia", latam: true },
  { code: "CL", name: "Chile", latam: true },
  { code: "PE", name: "Peru", latam: true },
  { code: "EC", name: "Ecuador", latam: true },
  { code: "UY", name: "Uruguay", latam: true },
  { code: "PY", name: "Paraguay", latam: true },
  { code: "BO", name: "Bolivia", latam: true },
  { code: "VE", name: "Venezuela", latam: true },
  { code: "DO", name: "Dominican Republic", latam: true },
  { code: "GT", name: "Guatemala", latam: true },
  { code: "CR", name: "Costa Rica", latam: true },
  { code: "PA", name: "Panama", latam: true },
];

export const CHANNEL_TYPES = [
  "YouTube",
  "TikTok",
  "X (Twitter)",
  "Instagram",
  "Newsletter",
  "Blog",
  "GitHub",
  "Discord",
  "Other",
] as const;

export type ChannelType = (typeof CHANNEL_TYPES)[number];
