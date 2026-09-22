import { readdir, readFile } from "node:fs/promises";
import { lensSchema, type Lens } from "../src/schema.ts";
import brands from "../src/data/brands.json";
import audit from "../src/data/coverage.json";
import reviews from "../src/data/brand-review.json";
const all: Lens[] = [];
const failures: string[] = [];
if (new Set(brands.map((b) => b.id)).size !== brands.length)
  failures.push("品牌 ID 重复");
for (const b of brands)
  if (!reviews.some((r) => r.brand === b.id))
    failures.push(`${b.id}: 缺少品牌清点范围`);
for (const c of audit)
  if (
    !brands.some((b) => b.id === c.brand) ||
    !["pending", "excluded"].includes(c.status) ||
    !c.reason ||
    !c.model ||
    !c.url.startsWith("https://")
  )
    failures.push(`无效待核验 / 排除记录: ${c.model}`);
for (const file of await readdir("src/data/lenses")) {
  if (!file.endsWith(".json")) continue;
  const raw: unknown = JSON.parse(
    await readFile(`src/data/lenses/${file}`, "utf8"),
  );
  const parsed = lensSchema.array().safeParse(raw);
  if (!parsed.success) {
    failures.push(`${file}: ${parsed.error.message}`);
    continue;
  }
  for (const l of parsed.data) {
    if (!brands.some((b) => b.id === l.brand))
      failures.push(`${l.id}: 未注册品牌`);
    if (l.brand !== file.replace(".json", ""))
      failures.push(`${l.id}: 品牌文件不匹配`);
    if (l.weight != null && (l.weight < 30 || l.weight > 15000))
      failures.push(`${l.id}: 重量超出合理范围，请核查 g 单位`);
    if (l.minFocus != null && (l.minFocus < 0.02 || l.minFocus > 30))
      failures.push(`${l.id}: 对焦距离异常，请核查 m 单位`);
    if (l.maxMagnification != null && l.maxMagnification > 10)
      failures.push(`${l.id}: 放大倍率异常`);
    if (l.filterSize != null && (l.filterSize < 20 || l.filterSize > 150))
      failures.push(`${l.id}: 滤镜口径异常`);
    if (l.releaseDate) {
      const precision = { year: 4, month: 7, day: 10 }[l.releasePrecision!];
      if (
        l.releaseDate.length !== precision ||
        Number.isNaN(Date.parse(l.releaseDate))
      )
        failures.push(`${l.id}: 日期与精度不一致`);
    }
    if (
      l.verification === "verified" &&
      [
        l.weight,
        l.diameter,
        l.length,
        l.minFocus,
        l.maxMagnification,
        l.elements,
        l.groups,
        l.blades,
      ].some((x) => x == null)
    )
      failures.push(`${l.id}: 主要规格不完整却标为 verified`);
    all.push(l);
  }
}
const ids = new Set<string>();
for (const l of all) {
  if (ids.has(l.id)) failures.push(`重复 ID: ${l.id}`);
  ids.add(l.id);
}
const modelKeys = new Set<string>();
for (const l of all) {
  const key = `${l.brand}:${l.model.toLowerCase()}`;
  if (modelKeys.has(key)) failures.push(`重复型号: ${key}`);
  modelKeys.add(key);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `数据校验通过：${all.length} 款镜头，${new Set(all.map((l) => l.brand)).size} 个品牌；${all.filter((l) => l.verification === "verified").length} 款主要规格完整，${all.filter((l) => l.price).length} 条可溯源价格。`,
  );
