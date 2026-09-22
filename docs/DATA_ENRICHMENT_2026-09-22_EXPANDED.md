# 2026-09-22 扩大来源补充记录 / Expanded source review

本轮在上一轮 286 款的基础上，补充 **30 款已有镜头的 56 个缺失参数**，修正 **4 个已有数值**，新增 **5 款**镜头及 **Thypoch** 品牌。当前共 **291 款 / 14 个品牌**，主要规格完整 **215 款**，信息不全 **76 款**。新增记录的参数不计入“补充空值”数量。

This follow-up adds 56 missing values across 30 existing lenses, corrects 4 values, and adds 5 lenses including the first Thypoch record. The catalogue now contains 291 lenses across 14 brands; 215 have complete primary specifications. Completeness does not guarantee accuracy or full market coverage.

## 扩大的检索范围

- 老蛙中文官网 7 页摄影目录、独立产品表和说明书下载中心；与原有荷兰品牌站、原厂说明书交叉核对。
- 铭匠品牌主站的规格与相机兼容名单，不仅依赖国际商城商品标题。
- 七工匠 Sony E 专属商品页与 Z/E 参数长图。
- 唯卓仕 Sony E 产品页、官方近摄参数图片。
- 日本代理焦点工房（代理身份由其产品页说明）：仅补充明确的 E 卡口重量和镜身尺寸；来源标题标明代理身份。
- Thypoch 官方商城的 Voyager 全画幅 E 卡口规格表。

只提交结构化参数、来源链接及自行撰写的说明。研究缓存中的厂家完整网页、图片、说明书不发布到仓库。不推算价格、发布日期或销售状态。

## 新增正式记录

| 型号 | 依据 | 注意事项 |
|---|---|---|
| 14mm F2.8 ASPH. | [官方来源](https://www.ttartisan.com/?full-frame-lenses/347.html) | 已确认全画幅及原生 E 卡口，从待核验清单转入。77mm 滤镜须通过滤镜支架安装。官网重量 437–445g 为多卡口范围，E 卡口独立值未确认。 |
| Tilt-Shift 17mm F4 ASPH. | [官方来源](https://www.ttartisan.com/?full-frame-lenses/345.html) | 已确认全画幅及原生 E 卡口，从待核验清单转入。官网重量 1051–1056g 未区分卡口，不取范围端点当作 E 版本重量。 |
| 17mm F4 Zero-D Tilt-Shift | [官方来源](https://www.laowalens.com/camera-lens-92) | TS 倾斜＋移轴版与 S 仅移轴版分开收录。官网明确 E 卡口净重 810g，不含遮光罩、支架及前后盖。 |
| Aksen 17.5mm F1.7 5-10X Ultra Macro APO | [官方来源](https://www.laowalens.com/camera-lens-98) | 采用官方 E 卡口镜头版本的重量和尺寸，不把单独的卡口配件当作镜头。工作距离 22.48mm 不等于最近对焦距离，后者官方标为 N/A。放大范围 5–10 倍，不能按普通镜头理解为可对焦到无穷远。 |
| Voyager 24-50mm F2.8 | [官方来源](https://store.thypoch.com/products/voyager-24-50mm) | 官方标明 Sony E、43.2mm 全画幅成像圈。直径 73mm 来自代理镜身尺寸；厂家 Front Dia. 70mm 为前端直径，不混作最大镜身直径。长度采用厂家前端至法兰面 92.8mm。 |

## 已有记录的字段变更

数值单位：重量 g、尺寸/滤镜 mm、距离 m、倍率 ×。`null` 表示原先缺失。

| 型号 | 字段：原值 → 新值 | 来源 |
|---|---|---|
| AF 85mm F1.8 Prima | diameter: null → 69.8 | [来源](https://samyangus.com/products/af-85mm-f1-8-p-fe) |
| AF 16mm F2.8 Prima | diameter: null → 69.8 | [来源](https://samyangus.com/products/af-16mm-f2-8-p-fe) |
| AF 35mm F1.4 Prima | diameter: null → 75 | [来源](https://samyangus.com/products/af-35mm-f1-4-p-fe) |
| AF 24-70mm F2.8 | diameter: null → 88 | [来源](https://samyangus.com/products/24-70mm-f2-8-af-full-frame-zoom-lens-sony-e) |
| MF 12mm F2.8 Fisheye | blades: null → 7 | [来源](https://samyangus.com/products/12mm-f2-8-full-frame-fisheye) |
| MF 14mm F2.8 | blades: null → 6 | [来源](https://samyangus.com/products/14mm-f2-8-full-frame-ultra-wide-angle) |
| MF 35mm F1.4 | blades: null → 8 | [来源](https://samyangus.com/products/35mm-f1-4-full-frame-wide-angle) |
| MF 50mm F1.4 | blades: null → 8 | [来源](https://samyangus.com/products/50mm-f1-4-full-frame-high-speed) |
| MF 85mm F1.4 | blades: null → 8 | [来源](https://samyangus.com/products/85mm-f1-4-full-frame) |
| MF 100mm F2.8 Macro | blades: null → 9；maxMagnification: null → 1 | [来源](https://samyangus.com/products/100mm-f2-8-full-frame-macro) |
| MF 135mm F2.0 | blades: null → 9 | [来源](https://samyangus.com/products/135mm-f2-0-full-frame-telephoto) |
| MF 85mm F1.4 II | blades: null → 9 | [来源](https://samyangus.com/products/85mm-f1-4-series-ii-high-speed-full-frame) |
| 17mm F4 Zero-D Shift | diameter: null → 93；length: null → 111；minFocus: null → 0.25；maxMagnification: null → 0.131；elements: 12 → 18 | [来源](https://www.laowalens.com/camera-lens-92) |
| 180mm F4.5 1.5x Ultra Macro APO Auto Focus lens | diameter: null → 67.6；length: null → 134.4；minFocus: null → 0.3；weight: 520 → 521.6 | [来源](https://www.laowalens.com/camera-lens-90) |
| 35mm F2.8 Zero-D Tilt-Shift 0.5X Macro | diameter: null → 105；length: null → 149；minFocus: null → 0.228 | [来源](https://www.laowalens.com/camera-lens-93) |
| Aksen 45mm F2.8 1-5X Ultra Macro APO | diameter: null → 70.2；length: null → 149.5；weight: 600 → 646 | [来源](https://www.laowalens.com/camera-lens-98) |
| Argus 28mm F1.2 FF lens | diameter: null → 68.5；length: null → 106.31；weight: null → 562；maxMagnification: 0.1 → 0.073 | [来源](https://www.laowalens.com/camera-lens-62) |
| Argus 45mm F0.95 FF | diameter: null → 76.8；length: null → 110 | [来源](https://www.laowalens.com/camera-lens-48) |
| 15mm F5 Cookie FF | length: null → 35.2 | [来源](https://www.laowalens.com/camera-lens-84) |
| 58mm F2.8 2X Ultra Macro APO | elements: null → 14；groups: null → 11 | [来源](https://www.laowalens.com/camera-lens-56) |
| 85mm F5.6 2X Ultra-Macro APO Lens | elements: null → 13；groups: null → 9 | [来源](https://www.laowalens.com/camera-lens-47) |
| 15mm F4.5 Zero-D Shift Lens | maxMagnification: null → 0.2 | [来源](https://www.laowalens.com/camera-lens-26) |
| 15mm F4.5R Zero-D Shift Lens | maxMagnification: null → 0.2 | [来源](https://www.laowalens.com/camera-lens-26) |
| 20mm F4 Zero-D Shift Lens | filterSize: null → 82 | [来源](https://www.laowalens.com/camera-lens-50) |
| AF 16mm F1.8 | diameter: null → 85.2；length: null → 103；weight: null → 550 | [来源](https://viltrox.com/products/viltrox-af-16mm-f1-8-fe) |
| AF 85mm F1.8 II | minFocus: null → 0.8；maxMagnification: null → 0.125 | [来源](https://cdn.shopify.com/s/files/1/0104/0380/7298/files/10_8b5506dd-b183-4d78-b9a9-3853e67811f7.jpg) |
| AF 85mm F1.8 Neo | weight: null → 332 | [来源](https://www.stkb.jp/shopdetail/000000003688) |
| AF 50mm F1.8 Neo | weight: null → 156 | [来源](https://www.stkb.jp/shopdetail/000000003650) |
| AF 85mm F1.8 | weight: null → 437.5；diameter: null → 72；length: null → 96；filterSize: null → 62；minFocus: null → 0.8；elements: null → 10；groups: null → 7；blades: null → 11 | [来源](https://7artisans.store/products/af-85mm) |
| AF 50mm F1.8 | weight: null → 421；diameter: null → 72；length: null → 104 | [来源](https://7artisans.store/products/50mm-f1-8-af-lens) |

## 保留的缺项与冲突

- 老蛙 Aksen 的工作距离不当作最近对焦距离。17mm S 与 TS 重量分开；15mm Cookie 的 E 长度 35.2mm 不取 M 版 25mm。
- 老蛙 100mm 下载项虽然冠以 AF，实际 PDF 标注手动 MF；暂不新增 AF 版本。35mm AF 尚有试用/上市和距离口径待澄清。
- 铭匠 Neo 的厂商尺寸图与代理舍入尺寸有轻微差异，保留厂商尺寸，仅采用代理逐卡口重量。未明确卡口的重量范围仍为空。
- 七工匠 AF 85 / AF 50 沿用历史 ID（其中含 for-l），避免已有详情链接失效；规格来源已改为支持 E 卡口的页面。
- Thypoch 厂家前端直径 70mm 与代理镜身直径 73mm 含义不同，数据库使用后者并注明；品牌其他系列仍未完成逐项清点。
- 其余未知光学倍率、停产状态、发布日期和大陆官方价格仍留空；详见 [最新覆盖及缺项清单](DATA_COVERAGE.md)。
