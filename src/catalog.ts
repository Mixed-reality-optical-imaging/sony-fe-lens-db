import type { Lens } from "./schema";
import { priceLabel } from "./prices";
import brands from "./data/brands.json";

const files = import.meta.glob("./data/lenses/*.json", {
  eager: true,
  import: "default",
});
export const lenses = Object.values(files).flat() as Lens[];
export { brands };
export const brandFor = (id: string) =>
  brands.find((b) => b.id === id) ?? { id, name: id, en: id, color: "#536b86" };
export const latestCheck =
  lenses
    .flatMap((l) => l.sources.map((s) => s.checkedAt))
    .sort()
    .at(-1) ?? "—";
export const findLens = (id: string) => lenses.find((l) => l.id === id);
export const focal = (l: Lens) =>
  `${l.focalMin}${l.focalMin === l.focalMax ? "" : "–" + l.focalMax}mm`;
export const aperture = (l: Lens) =>
  `F${l.apertureWide}${l.apertureWide === l.apertureTele ? "" : "–" + l.apertureTele}`;
export const value = (v: number | null, unit = "") =>
  v == null ? "暂无数据" : `${v}${unit}`;
export const priceText = (l: Lens) =>
  l.price ? `¥${l.price.amount.toLocaleString("zh-CN")}` : "暂无报价";
export const statusText = (l: Lens) =>
  ({ current: "现售", discontinued: "已停产", unknown: "状态待核验" })[
    l.status
  ];
export const fields: {
  key: string;
  label: string;
  get: (l: Lens) => string;
}[] = [
  {
    key: "brand",
    label: "品牌",
    get: (l) => `${brandFor(l.brand).name} ${brandFor(l.brand).en}`,
  },
  { key: "model", label: "产品型号", get: (l) => l.model },
  {
    key: "series",
    label: "系列 / 代际",
    get: (l) =>
      [l.series, l.generation].filter(Boolean).join(" / ") || "暂无数据",
  },
  { key: "mount", label: "卡口 / 画幅", get: () => "Sony E / 全画幅" },
  {
    key: "type",
    label: "镜头类型",
    get: (l) => (l.focalMin === l.focalMax ? "定焦镜头" : "变焦镜头"),
  },
  { key: "focal", label: "焦距", get: focal },
  {
    key: "apertureWide",
    label: "最大光圈（广角端）",
    get: (l) => `F${l.apertureWide}`,
  },
  {
    key: "apertureTele",
    label: "最大光圈（长焦端）",
    get: (l) => `F${l.apertureTele}`,
  },
  {
    key: "focus",
    label: "对焦方式",
    get: (l) =>
      l.focus === "AF"
        ? "自动对焦 AF"
        : l.focus === "MF"
          ? "手动对焦 MF"
          : "暂无数据",
  },
  {
    key: "stabilization",
    label: "镜头光学防抖",
    get: (l) =>
      l.stabilization == null
        ? "暂无数据"
        : l.stabilization
          ? "支持"
          : "不支持",
  },
  { key: "weight", label: "重量", get: (l) => value(l.weight, " g") },
  { key: "diameter", label: "最大直径", get: (l) => value(l.diameter, " mm") },
  { key: "length", label: "长度", get: (l) => value(l.length, " mm") },
  {
    key: "filterSize",
    label: "滤镜口径",
    get: (l) => value(l.filterSize, " mm"),
  },
  {
    key: "minFocus",
    label: "最近对焦距离",
    get: (l) => value(l.minFocus, " m"),
  },
  {
    key: "maxMagnification",
    label: "最大放大倍率",
    get: (l) => value(l.maxMagnification, "×"),
  },
  {
    key: "optics",
    label: "光学结构",
    get: (l) =>
      l.elements && l.groups ? `${l.groups} 组 ${l.elements} 片` : "暂无数据",
  },
  { key: "blades", label: "光圈叶片", get: (l) => value(l.blades, " 片") },
  {
    key: "releaseDate",
    label: "发布日期",
    get: (l) => l.releaseDate ?? "暂无数据",
  },
  { key: "status", label: "销售状态", get: statusText },
  { key: "price", label: "参考价格", get: priceText },
  {
    key: "priceType",
    label: "价格类型 / 采集日期",
    get: (l) =>
      l.price ? `${priceLabel(l.price)} / ${l.price.collectedAt}` : "暂无数据",
  },
];
