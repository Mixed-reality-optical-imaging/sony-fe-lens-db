import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { lensSchema } from "../src/schema.ts";

const lenses = readdirSync("src/data/lenses").flatMap((file) =>
  lensSchema
    .array()
    .parse(JSON.parse(readFileSync(`src/data/lenses/${file}`, "utf8"))),
);
const get = (prefix: string) => {
  const matches = lenses.filter((lens) => lens.id.startsWith(prefix));
  assert.equal(matches.length, 1, prefix);
  return matches[0];
};

test("保留已核实的 E 卡口参数，避免多卡口表格串列", () => {
  const viltrox = get("viltrox-viltrox-af-20mm-f2-8");
  assert.deepEqual(
    [viltrox.weight, viltrox.diameter, viltrox.length],
    [157, 65, 59.5],
  );
  const samyang = get("samyang-135mm-f2-0-full-frame-telephoto");
  assert.deepEqual([samyang.weight, samyang.length], [840, 148.1]);
  const ttartisan = get("ttartisan-100mm-f2-8macro");
  assert.equal(ttartisan.length, 150);
  assert.equal(get("laowa-200mm-f-2-af-ff").weight, 1765);
});

test("规格修正采用对应型号，不取同页其他型号或包装数值", () => {
  assert.equal(get("viltrox-af-85mm-f2-0-fe").weight, 340);
  assert.equal(get("ttartisan-90mm-f1-25").filterSize, 77);
  const meike = get("meike-meike-mk-50mm-f1-7");
  assert.deepEqual([meike.diameter, meike.length], [61, 54.5]);
  assert.equal(get("yongnuo-50f1-8s-df").weight, 273);
});

test("距离与滤镜统一口径，冲突值仍为空并说明原因", () => {
  assert.equal(get("samyang-24mm-f1-8").minFocus, 0.19);
  assert.equal(get("laowa-100mm-f-2-8-tilt").minFocus, 0.32);
  assert.equal(get("laowa-200mm-f-2-af-ff").filterSize, 105);
  const conflicting = get("7artisans-10mm-f-2-8-ii");
  assert.equal(conflicting.blades, null);
  assert.ok(conflicting.notes.some((note) => note.includes("冲突")));
  assert.equal(get("laowa-25mm-f-2-8").length, null);
});

test("扩展来源区分工作距离、卡口尺寸与移轴版本", () => {
  const shift = get("laowa-17mm-f-4-zero-d-shift");
  const tiltShift = get("laowa-17mm-f4-zero-d-tilt-shift");
  assert.deepEqual([shift.weight, tiltShift.weight], [770, 810]);
  assert.deepEqual([shift.elements, shift.groups], [18, 12]);
  assert.equal(get("laowa-15mm-f-5-cookie").length, 35.2);
  const macro = get("laowa-180mm");
  assert.deepEqual([macro.minFocus, macro.weight, macro.length], [0.3, 521.6, 134.4]);
  const aksen = get("laowa-aksen-17-5mm");
  assert.equal(aksen.minFocus, null);
  assert.equal(aksen.maxMagnification, 10);
  assert.ok(aksen.notes.some((note) => note.includes("工作距离")));
});

test("新增记录已确认 E 卡口，转入正式库的型号不残留在待核验表", () => {
  const audit = JSON.parse(readFileSync("src/data/coverage.json", "utf8")) as {
    brand: string;
    model: string;
    status: string;
  }[];
  for (const id of ["ttartisan-14mm-f2-8-asph", "ttartisan-tilt-shift-17mm-f4-asph"]) {
    const lens = get(id);
    assert.equal(lens.mount, "Sony E");
    // 已找到 E 卡口独立规格，不再用早期缺值作为永久断言。
    assert.equal(lens.weight, id.includes("14mm") ? 437 : 1040);
    assert.ok(lens.sources.some((source) => source.url.startsWith("https://www.stkb.jp/shopdetail/")));
    assert.ok(!audit.some((row) => row.brand === lens.brand && row.model === lens.model));
  }
  const zoom = get("thypoch-voyager");
  assert.deepEqual([zoom.focalMin, zoom.focalMax, zoom.apertureWide, zoom.apertureTele], [24, 50, 2.8, 2.8]);
  assert.deepEqual([zoom.diameter, zoom.length], [73, 92.8]);
  assert.ok(zoom.notes.some((note) => note.includes("前端直径")));
});
