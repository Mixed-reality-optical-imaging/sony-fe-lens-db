import { z } from "zod";

const positive = z.number().positive().nullable();
const validDate = (s: string) => {
  const d = new Date(s);
  return Number.isFinite(d.getTime()) && d.toISOString().slice(0, 10) === s;
};
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(validDate, "日期无效");
export const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.url().startsWith("https://"),
  checkedAt: date,
});
export const priceSchema = z.object({
  amount: z.number().positive(),
  currency: z.literal("CNY"),
  type: z.enum(["official", "launch"]),
  source: sourceSchema,
  collectedAt: date,
});
export const lensSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    brand: z.string().min(1),
    name: z.string().min(1),
    model: z.string().min(1),
    aliases: z.array(z.string()),
    series: z.string().nullable(),
    generation: z.string().nullable(),
    mount: z.literal("Sony E"),
    format: z.literal("Full Frame"),
    focalMin: z.number().positive(),
    focalMax: z.number().positive(),
    apertureWide: z.number().positive(),
    apertureTele: z.number().positive(),
    focus: z.enum(["AF", "MF", "unknown"]),
    stabilization: z.boolean().nullable(),
    weight: positive,
    diameter: positive,
    length: positive,
    filterSize: positive,
    minFocus: positive,
    maxMagnification: positive,
    elements: positive,
    groups: positive,
    blades: positive,
    releaseDate: z
      .string()
      .regex(/^\d{4}(-\d{2})?(-\d{2})?$/)
      .nullable(),
    releasePrecision: z.enum(["year", "month", "day"]).nullable(),
    status: z.enum(["current", "discontinued", "unknown"]),
    macro: z.boolean(),
    price: priceSchema.nullable(),
    sources: z.array(sourceSchema).min(1),
    notes: z.array(z.string()),
    verification: z.enum(["verified", "partial"]),
  })
  .superRefine((l, ctx) => {
    if (l.focalMin > l.focalMax)
      ctx.addIssue({ code: "custom", message: "焦距上下限颠倒" });
    if (l.apertureWide > l.apertureTele)
      ctx.addIssue({ code: "custom", message: "两端最大光圈异常" });
    if (!!l.releaseDate !== !!l.releasePrecision)
      ctx.addIssue({ code: "custom", message: "发布日期需附精度" });
    if (
      l.releaseDate &&
      (!validDate(
        l.releaseDate.length === 4
          ? `${l.releaseDate}-01-01`
          : l.releaseDate.length === 7
            ? `${l.releaseDate}-01`
            : l.releaseDate,
      ) ||
        l.releaseDate.length !==
          { year: 4, month: 7, day: 10 }[l.releasePrecision ?? "day"])
    )
      ctx.addIssue({ code: "custom", message: "发布日期或日期精度无效" });
    for (const key of ["elements", "groups", "blades"] as const)
      if (l[key] != null && !Number.isInteger(l[key]))
        ctx.addIssue({ code: "custom", message: `${key} 必须为整数` });
    if (l.elements != null && l.groups != null && l.groups > l.elements)
      ctx.addIssue({ code: "custom", message: "镜片组数不能大于镜片数" });
    if (l.focalMin === l.focalMax && l.apertureWide !== l.apertureTele)
      ctx.addIssue({ code: "custom", message: "定焦镜头两端光圈必须一致" });
  });
export type Lens = z.infer<typeof lensSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type PriceReference = z.infer<typeof priceSchema>;
