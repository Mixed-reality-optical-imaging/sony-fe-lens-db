import type { PriceReference } from "./schema";

export const priceLabel = (price: PriceReference | null) =>
  price
    ? {
        official: "官方公开价",
        launch: "上市指导价",
        retail: "商家页面价",
        submitted: "用户提供参考价",
      }[price.type]
    : "参考价格";
