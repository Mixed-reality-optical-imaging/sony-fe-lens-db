import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { lensSchema, type Lens } from "../src/schema.ts";
import brands from "../src/data/brands.json";
import review from "../src/data/brand-review.json";
import audit from "../src/data/coverage.json";
const all: Lens[] = [];
for (const f of await readdir("src/data/lenses"))
  all.push(
    ...lensSchema
      .array()
      .parse(JSON.parse(await readFile(`src/data/lenses/${f}`, "utf8"))),
  );
const date = all
  .flatMap((l) => l.sources.map((s) => s.checkedAt))
  .sort()
  .at(-1);
const escape = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
let md = `# 数据覆盖清单\n\n核验日期：${date}。本清单由 \`npm run data:report\` 从正式记录生成。\n\n共 **${all.length} 款、${brands.filter((b) => all.some((l) => l.brand === b.id)).length} 个品牌**，其中 ${all.filter((l) => l.verification === "verified").length} 款主要规格完整，${all.filter((l) => l.verification === "partial").length} 款信息不全，${all.filter((l) => l.price).length} 条可追溯人民币价格，${all.filter((l) => l.status === "discontinued").length} 款有明确停产依据。\n\n**此清单记录已核验范围，不代表市场全量。** 正式条目已确认原生 Sony E 卡口及全画幅身份；缺失字段仍显示暂无数据。\n\n| 品牌 | 已收录 | 主要规格完整 | 信息不全 | 待核验 | 排除 |\n|---|---:|---:|---:|---:|---:|\n`;
for (const b of brands) {
  const ls = all.filter((l) => l.brand === b.id);
  md += `| ${b.name} ${b.en} | ${ls.length} | ${ls.filter((l) => l.verification === "verified").length} | ${ls.filter((l) => l.verification === "partial").length} | ${audit.filter((x) => x.brand === b.id && x.status === "pending").length} | ${audit.filter((x) => x.brand === b.id && x.status === "excluded").length} |\n`;
}
md += "\n## 逐品牌范围与型号\n";
for (const b of brands) {
  const r = review.find((r) => r.brand === b.id);
  md += `\n### ${b.name} ${b.en}\n\n${r?.scope ?? ""}\n\n覆盖边界：${r?.limits ?? "待清点"}\n\n| 型号（独立 ID） | 主要规格 | 来源 |\n|---|---|---|\n`;
  for (const l of all.filter((l) => l.brand === b.id))
    md += `| ${escape(l.name)}（\`${l.id}\`） | ${l.verification === "verified" ? "已核验" : "信息不全"} | [厂家资料](${l.sources[0].url}) |\n`;
}
md +=
  "\n## 待核验与排除条目\n\n不进入正式搜索结果。已确认身份但仅缺参数的型号属于上方“信息不全”，不重复计算为待核验。\n\n| 品牌 | 候选型号 | 状态 | 原因 |\n|---|---|---|---|\n";
for (const c of audit)
  md += `| ${brands.find((b) => b.id === c.brand)?.name ?? c.brand} | [${escape(c.model)}](${c.url}) | ${c.status === "pending" ? "待核验" : "排除"} | ${escape(c.reason)} |\n`;
await mkdir("docs", { recursive: true });
await writeFile("docs/DATA_COVERAGE.md", md);
console.log(
  `已更新覆盖清单：${all.length} 款，${audit.length} 条待核验 / 排除记录。`,
);
