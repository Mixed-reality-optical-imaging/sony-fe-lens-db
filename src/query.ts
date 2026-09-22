import type { Lens } from "./schema";
import brandData from "./data/brands.json";
export const PAGE_SIZE = 24;
export const presets = [
  { id: "all", label: "全部镜头", rule: "全部原生 E 卡口全画幅摄影镜头" },
  {
    id: "trinity",
    label: "大三元",
    rule: "恒定 F2.8 变焦；14–35mm 广角、24–75mm 标准或 70–200mm 长焦范围内",
  },
  {
    id: "f4",
    label: "小三元",
    rule: "恒定 F4 变焦；14–35mm 广角、24–105mm 标准或 70–200mm 长焦范围内",
  },
  {
    id: "portrait",
    label: "人像定焦",
    rule: "35–135mm 定焦，最大光圈不小于 F1.8",
  },
  { id: "light", label: "轻便出行", rule: "镜头重量 ≤ 350g" },
  { id: "wide", label: "超广角", rule: "最短焦距 ≤ 24mm" },
  { id: "tele", label: "长焦远摄", rule: "最长焦距 ≥ 200mm" },
  { id: "macro", label: "微距探索", rule: "厂家标注 Macro / 微距型号" },
  { id: "gm", label: "原厂 G Master", rule: "索尼原厂 G Master 系列" },
];
export interface Query {
  q: string;
  brands: string[];
  type: string;
  focus: string;
  oss: string;
  focalMin: string;
  focalMax: string;
  apertureWide: string;
  apertureTele: string;
  weight: string;
  filter: string;
  priceMin: string;
  priceMax: string;
  status: string;
  preset: string;
  sort: string;
  dir: string;
  page: number;
  view: string;
}
export const defaults: Query = {
  q: "",
  brands: [],
  type: "all",
  focus: "all",
  oss: "all",
  focalMin: "",
  focalMax: "",
  apertureWide: "",
  apertureTele: "",
  weight: "",
  filter: "",
  priceMin: "",
  priceMax: "",
  status: "all",
  preset: "all",
  sort: "release",
  dir: "desc",
  page: 1,
  view: "cards",
};
const enums: Partial<Record<keyof Query, string[]>> = {
  type: ["all", "prime", "zoom"],
  focus: ["all", "AF", "MF"],
  oss: ["all", "yes", "no"],
  status: ["all", "current", "discontinued", "unknown"],
  preset: presets.map((p) => p.id),
  sort: ["release", "focal", "aperture", "weight", "price"],
  dir: ["asc", "desc"],
  view: ["cards", "table"],
};
const numeric = [
  "focalMin",
  "focalMax",
  "apertureWide",
  "apertureTele",
  "weight",
  "filter",
  "priceMin",
  "priceMax",
] as const;
export function parseQuery(params: URLSearchParams): Query {
  const s: Query = { ...defaults, brands: [] };
  s.q = (params.get("q") ?? "").slice(0, 200);
  s.brands = [
    ...new Set(
      (params.get("brands") ?? "")
        .split(",")
        .filter((id) => brandData.some((b) => b.id === id)),
    ),
  ];
  for (const [key, choices] of Object.entries(enums)) {
    const v = params.get(key);
    if (v && choices!.includes(v))
      (s as unknown as Record<string, unknown>)[key] = v;
  }
  for (const key of numeric) {
    const v = params.get(key);
    if (
      v &&
      Number.isFinite(Number(v)) &&
      Number(v) > 0 &&
      Number(v) <= 1000000
    )
      s[key] = String(Number(v));
  }
  for (const [min, max] of [
    ["focalMin", "focalMax"],
    ["priceMin", "priceMax"],
  ] as const)
    if (s[min] && s[max] && +s[min] > +s[max])
      [s[min], s[max]] = [s[max], s[min]];
  const page = Number(params.get("page"));
  s.page = Number.isSafeInteger(page) && page > 0 ? Math.min(page, 100000) : 1;
  return s;
}
export function serializeQuery(s: Query): URLSearchParams {
  const p = new URLSearchParams();
  for (const key of Object.keys(defaults) as (keyof Query)[]) {
    if (key === "brands") {
      if (s.brands.length) p.set(key, s.brands.join(","));
    } else if (s[key] !== defaults[key]) p.set(key, String(s[key]));
  }
  return p;
}
const normalized = (s: string) =>
  s.toLowerCase().replace(/–|—/g, "-").replace(/f\//g, "f").replace(/\s+/g, "");
function trinity(l: Lens, f: number) {
  return (
    l.focalMin !== l.focalMax &&
    l.apertureWide === f &&
    l.apertureTele === f &&
    ((l.focalMin >= 14 &&
      l.focalMin <= 20 &&
      l.focalMax >= 28 &&
      l.focalMax <= 35) ||
      (l.focalMin >= 24 &&
        l.focalMin <= 28 &&
        l.focalMax >= 70 &&
        l.focalMax <= (f === 4 ? 105 : 75)) ||
      (l.focalMin >= 70 &&
        l.focalMin <= 75 &&
        l.focalMax >= 180 &&
        l.focalMax <= 200))
  );
}
export function matchesPreset(l: Lens, id: string) {
  switch (id) {
    case "trinity":
      return trinity(l, 2.8);
    case "f4":
      return trinity(l, 4);
    case "portrait":
      return (
        l.focalMin === l.focalMax &&
        l.focalMin >= 35 &&
        l.focalMin <= 135 &&
        l.apertureWide <= 1.8
      );
    case "light":
      return l.weight != null && l.weight <= 350;
    case "wide":
      return l.focalMin <= 24;
    case "tele":
      return l.focalMax >= 200;
    case "macro":
      return l.macro;
    case "gm":
      return l.brand === "sony" && l.series === "GM";
    default:
      return true;
  }
}
export function queryLenses(data: Lens[], s: Query): Lens[] {
  const terms = s.q.trim().split(/\s+/).map(normalized).filter(Boolean);
  const results = data.filter((l) => {
    const b = brandData.find((b) => b.id === l.brand);
    const hay = normalized(
      [
        l.name,
        l.model,
        l.brand,
        b?.name,
        b?.en,
        ...l.aliases,
        `${l.focalMin}mm`,
        `${l.focalMax}mm`,
        `F${l.apertureWide}`,
        `F${l.apertureTele}`,
      ].join(" "),
    );
    const matchesTerm = (t: string) => {
      const mm = t.match(/^(\d+(?:\.\d+)?)mm$/);
      if (mm) return l.focalMin === +mm[1] || l.focalMax === +mm[1];
      const f = t.match(/^f(\d+(?:\.\d+)?)$/);
      if (f) return l.apertureWide === +f[1] || l.apertureTele === +f[1];
      return hay.includes(t);
    };
    return (
      terms.every(matchesTerm) &&
      (!s.brands.length || s.brands.includes(l.brand)) &&
      matchesPreset(l, s.preset) &&
      (s.type === "all" ||
        (s.type === "prime"
          ? l.focalMin === l.focalMax
          : l.focalMin !== l.focalMax)) &&
      (s.focus === "all" || l.focus === s.focus) &&
      (s.oss === "all" || l.stabilization === (s.oss === "yes")) &&
      (!s.focalMin || l.focalMax >= +s.focalMin) &&
      (!s.focalMax || l.focalMin <= +s.focalMax) &&
      (!s.apertureWide || l.apertureWide <= +s.apertureWide) &&
      (!s.apertureTele || l.apertureTele <= +s.apertureTele) &&
      (!s.weight || (l.weight != null && l.weight <= +s.weight)) &&
      (!s.filter || l.filterSize === +s.filter) &&
      (!s.priceMin || (l.price != null && l.price.amount >= +s.priceMin)) &&
      (!s.priceMax || (l.price != null && l.price.amount <= +s.priceMax)) &&
      (s.status === "all" || l.status === s.status)
    );
  });
  const getter = (l: Lens): number | null => {
    switch (s.sort) {
      case "focal":
        return l.focalMin;
      case "aperture":
        return l.apertureWide;
      case "weight":
        return l.weight;
      case "price":
        return l.price?.amount ?? null;
      default:
        return l.releaseDate ? Date.parse(l.releaseDate) : null;
    }
  };
  return results.sort((a, b) => {
    const x = getter(a),
      y = getter(b);
    if (x == null && y != null) return 1;
    if (y == null && x != null) return -1;
    return (
      (x != null && y != null ? (x - y) * (s.dir === "asc" ? 1 : -1) : 0) ||
      a.name.localeCompare(b.name, "en") ||
      a.id.localeCompare(b.id)
    );
  });
}
export function readSelection(
  raw: string | null,
  validIds: Set<string>,
): string[] {
  try {
    const ids: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(ids)
      ? [
          ...new Set(
            ids.filter(
              (id): id is string => typeof id === "string" && validIds.has(id),
            ),
          ),
        ].slice(0, 4)
      : [];
  } catch {
    return [];
  }
}
