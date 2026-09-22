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
