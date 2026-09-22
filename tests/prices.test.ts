import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { lensSchema, priceSchema } from "../src/schema.ts";
import { priceLabel } from "../src/prices.ts";
import { queryLenses, defaults } from "../src/query.ts";

const lenses = readdirSync("src/data/lenses").flatMap((f) =>
  lensSchema
    .array()
    .parse(JSON.parse(readFileSync(`src/data/lenses/${f}`, "utf8"))),
);

test("商家价必须注明条件，且与上市价使用不同标签", () => {
  const lens = lenses.find((l) => l.id === "sony-sel2870gm")!;
  assert.equal(priceLabel(lens.price), "商家页面价");
  assert.ok(lens.priceHistory?.some((p) => p.type === "launch"));
  assert.equal(priceLabel(lens.priceHistory![0]), "上市指导价");
  assert.equal(
    priceSchema.safeParse({ ...lens.price, conditions: undefined }).success,
    false,
  );
  assert.equal(
    priceSchema.safeParse({ ...lens.price, amount: -1 }).success,
    false,
  );
  assert.equal(
    priceSchema.safeParse({ ...lens.price, collectedAt: "2026-02-30" }).success,
    false,
  );
});

test("筛选使用当前展示价，不使用已保留的历史指导价", () => {
  const l = lenses.find((l) => l.id === "sony-sel2870gm")!;
  const amount = l.price!.amount;
  assert.equal(
    queryLenses([l], {
      ...defaults,
      priceMin: String(amount),
      priceMax: String(amount),
    }).length,
    1,
  );
  assert.equal(
    queryLenses([l], { ...defaults, priceMax: String(amount - 0.01) }).length,
    0,
  );
  for (const dir of ["asc", "desc"])
    assert.equal(
      queryLenses([l, { ...l, id: "unknown", price: null }], {
        ...defaults,
        sort: "price",
        dir,
      }).at(-1)?.id,
      "unknown",
    );
});

test("全库查询清单无重复，并覆盖本轮所有正式型号", () => {
  const audit = JSON.parse(readFileSync("src/data/price-review.json", "utf8"));
  assert.equal(
    new Set(audit.map((x: { id: string }) => x.id)).size,
    audit.length,
  );
  assert.deepEqual(
    audit.map((x: { id: string }) => x.id).sort(),
    lenses.map((l) => l.id).sort(),
  );
  for (const row of audit) {
    const lens = lenses.find((l) => l.id === row.id)!;
    assert.ok(row.query && row.reason && row.searchedAt);
    assert.equal(row.sourceUrl, lens.price?.source.url ?? null);
    assert.equal(
      row.status === "retail-recorded",
      lens.price?.type === "retail",
    );
    assert.equal(row.status === "unresolved", !lens.price);
  }
});
