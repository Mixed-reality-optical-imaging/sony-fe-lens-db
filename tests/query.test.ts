import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { performance } from "node:perf_hooks";
import {
  defaults,
  parseQuery,
  serializeQuery,
  queryLenses,
  matchesPreset,
  readSelection,
  PAGE_SIZE,
} from "../src/query.ts";
import { lensSchema, type Lens } from "../src/schema.ts";
const data: Lens[] = readdirSync("src/data/lenses").flatMap((f) =>
  lensSchema
    .array()
    .parse(JSON.parse(readFileSync(`src/data/lenses/${f}`, "utf8"))),
);
const search = (q: string) => queryLenses(data, { ...defaults, q });
const lens = (id: string) => {
  const l = data.find((l) => l.id === id);
  assert.ok(l, id);
  return l;
};
test("中英文品牌与组合规格搜索得到相同的结果", () => {
  const zh = search("适马 35mm F1.4").map((l) => l.id);
  assert.ok(zh.length > 0);
  assert.ok(
    search("适马 35mm F1.4").every(
      (l) => l.focalMin === 35 || l.focalMax === 35,
    ),
  );
  assert.deepEqual(
    search("Sigma 35mm f/1.4").map((l) => l.id),
    zh,
  );
  assert.ok(search("腾龙").every((l) => l.brand === "tamron"));
  assert.equal(search("SEL2470GM2")[0].id, "sony-sel2470gm2");
});
test("产品别名可以搜索，搜索词之间取交集", () => {
  const row = { ...data[0], aliases: ["测试别名"] };
  assert.equal(queryLenses([row], { ...defaults, q: "测试别名" }).length, 1);
  assert.equal(
    queryLenses([row], { ...defaults, q: "测试别名 不存在" }).length,
    0,
  );
});
test("同类别品牌取并集，品牌与 AF、定焦、重量条件取交集", () => {
  const rows = queryLenses(data, {
    ...defaults,
    brands: ["sony", "tamron"],
    type: "prime",
    focus: "AF",
    weight: "350",
  });
  assert.ok(rows.length > 0);
  assert.ok(
    rows.every(
      (l) =>
        ["sony", "tamron"].includes(l.brand) &&
        l.focalMin === l.focalMax &&
        l.focus === "AF" &&
        l.weight != null &&
        l.weight <= 350,
    ),
  );
});
test("焦段区间按交集匹配，包含上下边界", () => {
  const zoom = lens("sony-sel2470gm2");
  const prime = lens("sony-sel85f18");
  const ids = (min: string, max: string) =>
    queryLenses([zoom, prime], {
      ...defaults,
      focalMin: min,
      focalMax: max,
    }).map((l) => l.id);
  assert.deepEqual(ids("70", "85").sort(), [zoom.id, prime.id].sort());
  assert.deepEqual(ids("71", "84"), []);
  assert.deepEqual(ids("24", "24"), [zoom.id]);
});
test("变光圈广角端与长焦端独立筛选，不能进入大三元", () => {
  const variable = lens("sony-sel2870");
  assert.equal(
    queryLenses([variable], { ...defaults, apertureWide: "4" }).length,
    1,
  );
  assert.equal(
    queryLenses([variable], { ...defaults, apertureTele: "4" }).length,
    0,
  );
  assert.equal(
    matchesPreset({ ...variable, apertureWide: 2.8 }, "trinity"),
    false,
  );
  assert.equal(matchesPreset(lens("sony-sel2470gm2"), "trinity"), true);
});
test("未知参数不满足数值条件或“无防抖”条件", () => {
  const unknown = {
    ...data[0],
    weight: null,
    filterSize: null,
    price: null,
    stabilization: null,
  };
  for (const patch of [
    { weight: "500" },
    { filter: "67" },
    { priceMax: "10000" },
    { oss: "no" },
  ])
    assert.equal(queryLenses([unknown], { ...defaults, ...patch }).length, 0);
});
test("价格、重量、日期无论升降序，未知值都在末尾", () => {
  const rows = [
    { ...data[0], id: "missing", weight: null, price: null, releaseDate: null },
    { ...lens("sony-sel2470gm2"), id: "known" },
  ];
  for (const sort of ["price", "weight", "release"])
    for (const dir of ["asc", "desc"])
      assert.equal(
        queryLenses(rows, { ...defaults, sort, dir }).at(-1)?.id,
        "missing",
      );
});
test("价格边界包含指导价，状态与滤镜条件生效", () => {
  const l = lens("sony-sel2470gm2");
  assert.equal(
    queryLenses([l], {
      ...defaults,
      priceMin: "14499",
      priceMax: "14499",
      filter: "82",
    }).length,
    1,
  );
  assert.equal(
    queryLenses([{ ...l, status: "discontinued" }], {
      ...defaults,
      status: "current",
    }).length,
    0,
  );
});
test("全部快捷筛选规则适用于返回的每一项", () => {
  assert.ok(
    queryLenses(data, { ...defaults, preset: "light" }).every(
      (l) => l.weight != null && l.weight <= 350,
    ),
  );
  assert.ok(
    queryLenses(data, { ...defaults, preset: "gm" }).every(
      (l) => l.brand === "sony" && l.series === "GM",
    ),
  );
  assert.ok(
    queryLenses(data, { ...defaults, preset: "portrait" }).every(
      (l) => l.focalMin === l.focalMax && l.apertureWide <= 1.8,
    ),
  );
});
test("网址状态完整往返，默认值不会污染网址", () => {
  assert.equal(serializeQuery(defaults).toString(), "");
  const state = {
    ...defaults,
    q: "适马 F1.4",
    brands: ["sigma", "sony"],
    focalMin: "24",
    focalMax: "70",
    sort: "weight",
    dir: "asc",
    page: 3,
    view: "table",
  };
  assert.deepEqual(parseQuery(serializeQuery(state)), state);
  assert.equal(PAGE_SIZE, 24);
});
test("损坏和恶意网址参数回退，颠倒的区间自动恢复", () => {
  const s = parseQuery(
    new URLSearchParams(
      "brands=sony,evil,sony&sort=evil&page=Infinity&focalMin=200&focalMax=24&weight=-1&priceMax=NaN&view=oops",
    ),
  );
  assert.deepEqual(s.brands, ["sony"]);
  assert.equal(s.page, 1);
  assert.equal(s.weight, "");
  assert.equal(s.priceMax, "");
  assert.equal(s.sort, "release");
  assert.equal(s.view, "cards");
  assert.equal(s.focalMin, "24");
  assert.equal(s.focalMax, "200");
});
test("损坏本地偏好可恢复，排除失效 ID、去重并限制四款", () => {
  const valid = new Set(["a", "b", "c", "d", "e"]);
  for (const raw of ["{bad", "null", "123", "{}"])
    assert.deepEqual(readSelection(raw, valid), []);
  assert.deepEqual(readSelection('["a","a","fake",2,"b","c","d","e"]', valid), [
    "a",
    "b",
    "c",
    "d",
  ]);
});
test("关键数据回归：STF 透光量、对焦距离、Sony E 专属重量", () => {
  const stf = lens("sony-sel100f28gm");
  assert.equal(stf.apertureTele, 2.8);
  assert.equal(stf.minFocus, 0.57);
  assert.equal(stf.maxMagnification, 0.25);
  assert.equal(lens("sony-sel24f28g").minFocus, 0.18);
  assert.equal(lens("tamron-a067").weight, 1155);
  assert.equal(lens("sony-sel50f14gm").focalMax, 50);
});
test("类型校验拒绝错误卡口、负数、无效日期和混乱光学结构", () => {
  for (const patch of [
    { mount: "Canon RF" },
    { weight: -2 },
    { releaseDate: "2025-02-31", releasePrecision: "day" },
    { releaseDate: "2025", releasePrecision: "day" },
    { groups: 40, elements: 10 },
    { blades: 7.5 },
  ])
    assert.equal(lensSchema.safeParse({ ...data[0], ...patch }).success, false);
});
test("千条记录组合查询响应检查", () => {
  const thousand = Array.from({ length: 1200 }, (_, i) => ({
    ...data[i % data.length],
    id: `benchmark-${i}`,
  }));
  const start = performance.now();
  for (let i = 0; i < 50; i++)
    queryLenses(thousand, {
      ...defaults,
      brands: ["sony", "sigma"],
      weight: "1000",
      sort: "weight",
      dir: "asc",
    });
  const average = (performance.now() - start) / 50;
  console.log(`1200 条记录平均查询 ${average.toFixed(2)} ms`);
  assert.ok(average < 100, `查询过慢：${average} ms`);
});
