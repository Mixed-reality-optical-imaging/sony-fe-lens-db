# 2026-09-22 官网规格补充记录 / Manufacturer specification enrichment

本轮保持 286 款、13 个品牌的收录范围，重点补足现有条目的参数。补充 **103 款镜头、476 个空值字段**，修正 **5 个已有数值**。主要规格完整的型号由 **158 增至 199**；仍有 **87 款**缺少至少一项主要规格。此统计不代表所有字段齐全或准确性保证。

This update enriches 103 existing lenses with 476 previously missing specification values and corrects 5 existing values. Records with all primary specification fields increase from 158 to 199; 87 records remain partial. The catalogue remains at 286 lenses across 13 brands. Completeness is not a guarantee of accuracy.

## 核验方法

- 依据厂家产品页、规格图和由品牌站链接的原厂说明书；保留来源 URL 与核验日期。
- 只整理参数事实与自行撰写的备注，不将下载的产品图、完整网页或说明书复制到仓库。
- 优先使用 Sony E / FE 专属栏位。原厂共用标称尺寸另加说明；明确属于其他卡口的重量和长度不挪用。
- 距离统一为米，尺寸为毫米，重量为克；工作距离与最近对焦距离、镜身与包装尺寸、前后置滤镜分别处理。
- 无可靠佐证、厂家未公布、固定光圈不适用、或来源冲突的字段继续保留空值。价格、销售状态和日期不由外币、页面在线状态或固件时间推测。

## 逐品牌结果

| 品牌 | 参数有变化的型号 | 新补字段 | 主要规格完整（更新前 → 后） |
|---|---:|---:|---:|
| sony | 0 | 0 | 56 → 56 |
| sigma | 1 | 3 | 57 → 58 |
| tamron | 0 | 0 | 20 → 20 |
| zeiss | 3 | 3 | 0 → 3 |
| samyang | 18 | 47 | 11 → 16 |
| viltrox | 17 | 129 | 0 → 13 |
| laowa | 21 | 37 | 0 → 11 |
| voigtlander | 3 | 9 | 13 → 16 |
| ttartisan | 11 | 48 | 0 → 0 |
| 7artisans | 15 | 94 | 0 → 2 |
| yongnuo | 1 | 9 | 1 → 2 |
| sirui | 2 | 18 | 0 → 2 |
| meike | 11 | 79 | 0 → 0 |

## 已有值修正

| 型号 | 字段 | 原值 → 新值 | 依据 |
|---|---|---|---|
| AF 85mm F2.0 EVO | 重量 g | 484 → 340 | [官方资料](https://viltrox.com/products/af-85mm-f2-0-fe)；依据官网 E/FE-mount 规格区补充；尺寸为直径×长度（mm），重量为官方约值。 |
| 90mm F1.25 | 滤镜 mm | 52 → 77 | [官方资料](https://en.ttartisan.com/static/upload/file/20230327/1679882838946101.pdf)；官方多卡口使用说明书明确 90mm F1.25、77mm 滤镜、1m 最近对焦。通用约 1013g 未分卡口，不补填重量。 |
| 12mm F2.8 Lite Zero-D FF Auto Focus Lens | 重量 g | 380 → 377 | [官方资料](https://fs.myteam44.nl/attachments/Laowa/User_Manual/12mm%20f2.8%20Lite%20Zero-D%20FF.pdf)；人工核对品牌产品页所附官方说明书规格表。AF E 栏为约 377g、5 叶片；MF 14 叶片版本不混用。 |
| 200mm F2 AF FF | 重量 g | 1590 → 1765 | [官方资料](https://fs.myteam44.nl/attachments/Laowa/User_Manual/200mm-f2-AF-FF.pdf)；人工核对品牌产品页所附官方说明书规格表。E 卡口尺寸 118×175mm，E/Z 净镜重 1765g。前滤镜 105mm；另支持 43mm 后置滤镜，不能混作前置滤镜。 |
| 58mm F2.8 2X Ultra Macro APO | 最近对焦 m | 0.185 → 0.183 | [官方资料](https://fs.myteam44.nl/attachments/Laowa/User_Manual/58mm%20f2.8%202X%20Ultra%20MAcro%20APO.pdf)；人工核对品牌产品页所附官方说明书规格表。共用尺寸为原厂标称值；595g 明确含前后盖，不替代已有净镜重量。 |

## 补充字段与来源

以下只列实际新填的字段。更多卡口口径说明见各型号 JSON 的 notes。

| 型号（ID） | 新增参数 | 依据 |
|---|---|---|
| 35mm F1.4 DG HSM（`sigma-a012-35-14`） | 直径 mm：77；长度 mm：120；重量 g：734 | [来源 1](https://www.sigma-global.com/jp/lenses/a012_35_14/) |
| AF 26mm F2.8 EVO（`viltrox-af-26mm-f2-8-fe`） | 镜片数：8；镜组数：6；叶片数：7；最近对焦 m：0.2；最大倍率 ×：0.2；滤镜 mm：43；直径 mm：66；长度 mm：23.8 | [来源 1](https://viltrox.com/products/af-26mm-f2-8-fe) |
| AF 35mm F1.8 EVO（`viltrox-af-35mm-f1-8-fe`） | 镜片数：13；镜组数：10；直径 mm：69；长度 mm：76；叶片数：9；最近对焦 m：0.34；最大倍率 ×：0.15；重量 g：355；滤镜 mm：58 | [来源 1](https://viltrox.com/products/af-35mm-f1-8-fe) |
| AF 55mm F1.8 EVO（`viltrox-af-55mm-f1-8-fe`） | 镜片数：13；镜组数：9；直径 mm：69；长度 mm：76；叶片数：9；最近对焦 m：0.43；最大倍率 ×：0.16；重量 g：370；滤镜 mm：58 | [来源 1](https://viltrox.com/products/af-55mm-f1-8-fe) |
| AF 85mm F2.0 EVO（`viltrox-af-85mm-f2-0-fe`） | 镜片数：10；镜组数：8；直径 mm：69；长度 mm：76；叶片数：9；最近对焦 m：0.74；最大倍率 ×：0.13；滤镜 mm：58 | [来源 1](https://viltrox.com/products/af-85mm-f2-0-fe) |
| AF 50mm F1.4 Pro（`viltrox-af-50mm-f1-4-fe`） | 镜片数：15；镜组数：11；直径 mm：84.5；长度 mm：111；叶片数：11；最近对焦 m：0.45；最大倍率 ×：0.145；重量 g：800；滤镜 mm：77 | [来源 1](https://viltrox.com/products/af-50mm-f1-4-fe) |
| AF 14mm F4.0 Air（`viltrox-af-14mm-f4-0-fe`） | 镜片数：12；镜组数：9；直径 mm：65；长度 mm：56.4；叶片数：7；最近对焦 m：0.13；最大倍率 ×：0.23；滤镜 mm：58 | [来源 1](https://viltrox.com/products/af-14mm-f4-0-fe) |
| AF 85mm F1.4 Pro（`viltrox-af-85mm-f1-4-fe`） | 镜片数：15；镜组数：11；直径 mm：84.5；长度 mm：108.5；最近对焦 m：0.79 | [来源 1](https://viltrox.com/products/af-85mm-f1-4-fe) |
| AF 35mm F1.2 LAB（`viltrox-af-35mm-f1-2-fe`） | 镜片数：15；镜组数：10；直径 mm：89.2；长度 mm：121.8；叶片数：11；最近对焦 m：0.34；最大倍率 ×：0.17；滤镜 mm：77；重量 g：910 | [来源 1](https://viltrox.com/products/af-35mm-f1-2-fe) |
| AF 50mm F2.0 Air（`viltrox-af-50mm-f2-fe`） | 镜片数：13；镜组数：9；直径 mm：65；长度 mm：56.5；叶片数：9；最近对焦 m：0.51；最大倍率 ×：0.11；滤镜 mm：58 | [来源 1](https://viltrox.com/products/af-50mm-f2-fe) |
| AF 135mm F1.8 LAB（`viltrox-af-135mm-f1-8-lab-fe`） | 镜片数：14；镜组数：9；直径 mm：93；长度 mm：145.7；叶片数：11；最近对焦 m：0.72；最大倍率 ×：0.25；重量 g：1235；滤镜 mm：82 | [来源 1](https://viltrox.com/products/af-135mm-f1-8-lab-fe) |
| AF 28mm F4.5（`viltrox-28mm-f4-5-fe`） | 镜片数：6；镜组数：6；直径 mm：60.3；长度 mm：15.3；最近对焦 m：0.38；最大倍率 ×：0.11 | [来源 1](https://viltrox.com/products/28mm-f4-5-fe) |
| AF 40mm F2.5 Air（`viltrox-af-40mm-f2-5-full-frame-lens-for-sony-fe-mount`） | 镜片数：10；镜组数：6；直径 mm：65；长度 mm：59.5；叶片数：7；最近对焦 m：0.34；最大倍率 ×：0.14；滤镜 mm：52 | [来源 1](https://viltrox.com/products/af-40mm-f2-5-full-frame-lens-for-sony-fe-mount) |
| AF 28mm F1.8（`viltrox-viltrox-af-28mm-f1-8-full-frame-lens-for-sony-e-mount`） | 重量 g：367；直径 mm：70；长度 mm：88.2；滤镜 mm：55；最近对焦 m：0.37；最大倍率 ×：0.1；镜片数：11；镜组数：9；叶片数：9 | [来源 1](https://viltrox.com/products/viltrox-af-28mm-f1-8-full-frame-lens-for-sony-e-mount) |
| AF 20mm F2.8 Air（`viltrox-viltrox-af-20mm-f2-8`） | 直径 mm：65；长度 mm：59.5；滤镜 mm：52；最近对焦 m：0.19；最大倍率 ×：0.17；镜片数：10；镜组数：8；叶片数：7 | [来源 1](https://viltrox.com/products/viltrox-af-20mm-f2-8) |
| AF 16mm F1.8（`viltrox-viltrox-af-16mm-f1-8-fe`） | 滤镜 mm：77；最近对焦 m：0.27；最大倍率 ×：0.1；镜片数：15；镜组数：12；叶片数：9 | [来源 1](https://viltrox.com/products/viltrox-af-16mm-f1-8-fe) |
| AF 85mm F1.8 II（`viltrox-viltrox-85mm-f18-e-mount-sony-markii`） | 镜片数：10；镜组数：7 | [来源 1](https://viltrox.com/products/viltrox-85mm-f18-e-mount-sony-markii) |
| MF 20mm F1.8（`viltrox-viltrox-20mm-f-1-8-wide-angle-full-frame-manual-focus-prime-lens-for-sony-e-mount`） | 重量 g：775；直径 mm：76.8；长度 mm：102；滤镜 mm：82；最近对焦 m：0.25；镜片数：12；镜组数：9；叶片数：14 | [来源 1](https://viltrox.com/products/viltrox-20mm-f-1-8-wide-angle-full-frame-manual-focus-prime-lens-for-sony-e-mount) |
| AF 60-180mm F2.8（`samyang-rokinon-60-180mm-f2-8-af-zoom-lens-sony-fe-mount`） | 镜片数：17；镜组数：14；直径 mm：86.7；重量 g：730；长度 mm：149 | [来源 1](https://samyangus.com/products/rokinon-60-180mm-f2-8-af-zoom-lens-sony-fe-mount) |
| AF 24-60mm F2.8（`samyang-24-60mm-f2-8-af-standard-zoom-lens-sony-e`） | 镜片数：14；镜组数：11 | [来源 1](https://samyangus.com/products/24-60mm-f2-8-af-standard-zoom-lens-sony-e) |
| AF 85mm F1.8 Prima（`samyang-af-85mm-f1-8-p-fe`） | 镜片数：9；镜组数：8 | [来源 1](https://samyangus.com/products/af-85mm-f1-8-p-fe) |
| AF 16mm F2.8 Prima（`samyang-af-16mm-f2-8-p-fe`） | 镜片数：8；镜组数：7 | [来源 1](https://samyangus.com/products/af-16mm-f2-8-p-fe) |
| AF 14-24mm F2.8（`samyang-af-14-24mm-f2-8-af-wide-angle-zoom-lens-sony-e`） | 镜片数：15；镜组数：11 | [来源 1](https://samyangus.com/products/af-14-24mm-f2-8-af-wide-angle-zoom-lens-sony-e) |
| AF 35mm F1.4 Prima（`samyang-af-35mm-f1-4-p-fe`） | 镜片数：12；镜组数：10 | [来源 1](https://samyangus.com/products/af-35mm-f1-4-p-fe) |
| AF 35-150mm F2-2.8（`samyang-35-150mm-f2-2-8-af-full-frame-zoom-lens`） | 镜片数：21；镜组数：18 | [来源 1](https://samyangus.com/products/35-150mm-f2-2-8-af-full-frame-zoom-lens) |
| AF 24-70mm F2.8（`samyang-24-70mm-f2-8-af-full-frame-zoom-lens-sony-e`） | 镜片数：17；镜组数：14 | [来源 1](https://samyangus.com/products/24-70mm-f2-8-af-full-frame-zoom-lens-sony-e) |
| AF 24mm F1.8（`samyang-24mm-f1-8-af-compact-full-frame-wide-angle-sony-e`） | 最近对焦 m：0.19 | [来源 1](https://samyangus.com/products/24mm-f1-8-af-compact-full-frame-wide-angle-sony-e) |
| MF 12mm F2.8 Fisheye（`samyang-12mm-f2-8-full-frame-fisheye`） | 直径 mm：77.3；重量 g：525；长度 mm：98.7 | [来源 1](https://samyangus.com/products/12mm-f2-8-full-frame-fisheye) |
| MF 14mm F2.8（`samyang-14mm-f2-8-full-frame-ultra-wide-angle`） | 直径 mm：87；重量 g：570；长度 mm：122.1 | [来源 1](https://samyangus.com/products/14mm-f2-8-full-frame-ultra-wide-angle) |
| MF 35mm F1.4（`samyang-35mm-f1-4-full-frame-wide-angle`） | 直径 mm：83；重量 g：735；长度 mm：137.5 | [来源 1](https://samyangus.com/products/35mm-f1-4-full-frame-wide-angle) |
| MF 50mm F1.4（`samyang-50mm-f1-4-full-frame-high-speed`） | 直径 mm：81.6；重量 g：565；长度 mm：100.7 | [来源 1](https://samyangus.com/products/50mm-f1-4-full-frame-high-speed) |
| MF 85mm F1.4（`samyang-85mm-f1-4-full-frame`） | 直径 mm：78；重量 g：570；长度 mm：100.7 | [来源 1](https://samyangus.com/products/85mm-f1-4-full-frame) |
| MF 100mm F2.8 Macro（`samyang-100mm-f2-8-full-frame-macro`） | 直径 mm：72.5；重量 g：730；长度 mm：149.1 | [来源 1](https://samyangus.com/products/100mm-f2-8-full-frame-macro) |
| MF 135mm F2.0（`samyang-135mm-f2-0-full-frame-telephoto`） | 直径 mm：82；重量 g：840；长度 mm：148.1 | [来源 1](https://samyangus.com/products/135mm-f2-0-full-frame-telephoto) |
| MF 14mm F2.8 II（`samyang-14mm-f2-8-series-ii-full-frame-ultra-wide-angle`） | 直径 mm：81.6；重量 g：708；长度 mm：122.1 | [来源 1](https://samyangus.com/products/14mm-f2-8-series-ii-full-frame-ultra-wide-angle) |
| MF 85mm F1.4 II（`samyang-85mm-f1-4-series-ii-high-speed-full-frame`） | 直径 mm：78；重量 g：599；长度 mm：100.7 | [来源 1](https://samyangus.com/products/85mm-f1-4-series-ii-high-speed-full-frame) |
| AF 85mm F1.8 Neo（`ttartisan-ttartisan-af-85mm-f1-8-neo`） | 镜片数：12；镜组数：8；叶片数：11；直径 mm：70；长度 mm：90.5 | [来源 1](https://ttartisan.store/products/ttartisan-af-85mm-f1-8-neo) |
| AF 50mm F1.8 Neo（`ttartisan-ttartisan-af-50mm-f1-8-neo`） | 镜片数：12；镜组数：8；叶片数：7；直径 mm：61；长度 mm：51.5 | [来源 1](https://ttartisan.store/products/ttartisan-af-50mm-f1-8-neo) |
| AF 40mm F2（`ttartisan-af-40mm-f2`） | 镜片数：9；镜组数：6；叶片数：7；直径 mm：61；长度 mm：44 | [来源 1](https://ttartisan.store/products/af-40mm-f2) |
| AF 75mm F2（`ttartisan-ttartisan-af-75mm-f2`） | 镜片数：10；镜组数：7；叶片数：9；直径 mm：67；长度 mm：74 | [来源 1](https://ttartisan.store/products/ttartisan-af-75mm-f2) |
| 100mm F2.8 Macro（`ttartisan-100mm-f2-8macro`） | 叶片数：12；滤镜 mm：67；最近对焦 m：0.25；最大倍率 ×：2；直径 mm：72；长度 mm：150 | [来源 1](https://ttartisan.store/products/100mm-f2-8macro) |
| 500mm F6.3（`ttartisan-500mm`） | 镜片数：8；镜组数：5；叶片数：12；直径 mm：88；长度 mm：317 | [来源 1](https://ttartisan.store/products/500mm) |
| 50mm F1.4 Tilt（`ttartisan-tilt50mm`） | 镜片数：7；镜组数：6；叶片数：13 | [来源 1](https://ttartisan.store/products/tilt50mm) |
| 50mm F2.0（`ttartisan-multi-mounts-50mm-f2-0`） | 镜片数：6；镜组数：5；叶片数：10 | [来源 1](https://ttartisan.store/products/multi-mounts-50mm-f2-0) |
| 11mm F2.8 Fisheye（`ttartisan-11mmf28`） | 最近对焦 m：0.17；镜片数：11；镜组数：7；叶片数：7 | [来源 1](https://ttartisan.store/products/11mmf28) |
| 90mm F1.25（`ttartisan-90mm-f1-25`） | 镜片数：11；镜组数：7；叶片数：10 | [来源 1](https://en.ttartisan.com/static/upload/file/20230327/1679882838946101.pdf) |
| 21mm F1.5（`ttartisan-ttartisan-21mm-f1-5`） | 镜片数：13；镜组数：11；叶片数：10；滤镜 mm：72 | [来源 1](https://ttartisan.store/products/ttartisan-21mm-f1-5) |
| AF 10mm F2.5（`7artisans-af-10mm-f2-5-full-frame-lens-for-e-z-l`） | 直径 mm：76；长度 mm：94；最近对焦 m：0.15；镜片数：11；镜组数：8；叶片数：9；重量 g：504 | [来源 1](https://7artisans.store/products/af-10mm-f2-5-full-frame-lens-for-e-z-l) |
| AF 135mm F1.8（`7artisans-af-135mm-f1-8-full-frame-lens-for-e-z-l`） | 直径 mm：91.2；长度 mm：130；最近对焦 m：0.68；镜片数：16；镜组数：13；叶片数：12；重量 g：1014；滤镜 mm：82；最大倍率 ×：0.25 | [来源 1](https://7artisans.store/products/af-135mm-f1-8-full-frame-lens-for-e-z-l) |
| AF 40mm F2.5（`7artisans-af-40mm-f2-5-full-frame-lens-for-e-z-l`） | 直径 mm：63；长度 mm：40；最近对焦 m：0.4；叶片数：9；重量 g：90；滤镜 mm：46 | [来源 1](https://7artisans.store/products/af-40mm-f2-5-full-frame-lens-for-e-z-l) |
| AF 35mm F1.8（`7artisans-af-35mm-f1-8-full-frame-lens-for-e-z-l`） | 直径 mm：72；长度 mm：94；最近对焦 m：0.4；镜片数：11；镜组数：8；叶片数：11；重量 g：426；滤镜 mm：62 | [来源 1](https://7artisans.store/products/af-35mm-f1-8-full-frame-lens-for-e-z-l) |
| MF 14mm F2.8（`7artisans-14mm-f-2-8-full-frame-wide-angle-lens-for-sony-e-canon-eos-r-nikon-z-panasonic-l`） | 直径 mm：79；长度 mm：87；最近对焦 m：0.43；镜片数：13；镜组数：9；叶片数：10；重量 g：504；滤镜 mm：77 | [来源 1](https://7artisans.store/products/14mm-f-2-8-full-frame-wide-angle-lens-for-sony-e-canon-eos-r-nikon-z-panasonic-l) |
| MF 75mm F1.4（`7artisans-75mm-f-1-4-full-frame-lens-for-sony-e-canon-eos-r-nikon-z-panasonic-l-lumix-s`） | 直径 mm：62；长度 mm：77；最近对焦 m：0.88；镜片数：6；镜组数：6；叶片数：13；滤镜 mm：58 | [来源 1](https://7artisans.store/products/75mm-f-1-4-full-frame-lens-for-sony-e-canon-eos-r-nikon-z-panasonic-l-lumix-s) |
| AF 24mm F1.8（`7artisans-af-24mm-f1-8-full-frame-lens-for-e`） | 直径 mm：72；长度 mm：92；最近对焦 m：0.32；镜片数：14；镜组数：11；叶片数：11；重量 g：424；滤镜 mm：62 | [来源 1](https://7artisans.store/products/af-24mm-f1-8-full-frame-lens-for-e) |
| AF 50mm F1.8（`7artisans-af-50mm-f1-8-full-frame-lens-for-l`） | 镜片数：11；镜组数：9；叶片数：11；滤镜 mm：62；最近对焦 m：0.5 | [来源 1](https://7artisans.store/products/af-50mm-f1-8-full-frame-lens-for-l) |
| MF 18mm F5.6（`7artisans-18mm-f-5-6-full-frame-lens-for-e-z-l`） | 重量 g：146；最近对焦 m：0.3；镜片数：7；镜组数：5；滤镜 mm：49 | [来源 1](https://7artisans.store/products/18mm-f-5-6-full-frame-lens-for-e-z-l) |
| MF 10mm F2.8 II Fisheye（`7artisans-10mm-f-2-8-ii-ultra-wide-angle-full-frame-fisheye-lens-for-e-l-r-z-1`） | 重量 g：602；直径 mm：75；长度 mm：95；最近对焦 m：0.15；镜片数：11；镜组数：8 | [来源 1](https://7artisans.store/products/10mm-f-2-8-ii-ultra-wide-angle-full-frame-fisheye-lens-for-e-l-r-z-1) |
| MF 60mm F2.8 Macro（`7artisans-60mm-f-2-8-full-frame-2x-ultra-macro-lens-for-e-rf-z`） | 直径 mm：70；长度 mm：109；最近对焦 m：0.17；镜片数：14；镜组数：12；叶片数：9；重量 g：550；滤镜 mm：67；最大倍率 ×：2 | [来源 1](https://7artisans.store/products/60mm-f-2-8-full-frame-2x-ultra-macro-lens-for-e-rf-z) |
| MF 35mm F1.4 III（`7artisans-35mm-f-1-4-full-frame-lens-for-e-eos-r-z-l`） | 镜片数：7；镜组数：5；叶片数：10；滤镜 mm：52 | [来源 1](https://7artisans.store/products/35mm-f-1-4-full-frame-lens-for-e-eos-r-z-l) |
| MF 9mm F5.6（`7artisans-9mm-f-5-6-full-frame-wide-angle-lens-for-e-l-r-z`） | 直径 mm：70；长度 mm：86；最近对焦 m：0.2；镜片数：16；镜组数：11；叶片数：5 | [来源 1](https://7artisans.store/products/9mm-f-5-6-full-frame-wide-angle-lens-for-e-l-r-z) |
| MF 10mm F2.8 Fisheye（`7artisans-7artisans-10mm-f2-8-full-frame-fisheye-lens-for-e-l-r-z-mount`） | 镜片数：11；镜组数：8；叶片数：8；最近对焦 m：0.17 | [来源 1](https://7artisans.store/products/7artisans-10mm-f2-8-full-frame-fisheye-lens-for-e-l-r-z-mount) |
| MF 35mm F5.6（`7artisans-35mm-f5-6`） | 镜片数：5；镜组数：4 | [来源 1](https://7artisans.store/products/35mm-f5-6) |
| AF 35mm F1.4 AURORA（`sirui-sirui-aurora-series-35mm-f1-4-full-frame-autofocus-lens`） | 重量 g：490；直径 mm：76；长度 mm：102.9；滤镜 mm：62；最近对焦 m：0.35；最大倍率 ×：0.14；镜片数：16；镜组数：11；叶片数：13 | [来源 1](https://store.sirui.com/products/sirui-aurora-series-35mm-f1-4-full-frame-autofocus-lens) |
| AF 85mm F1.4 AURORA（`sirui-sirui-aurora-series-85mm-full-frame-autofocus-lens`） | 重量 g：540；直径 mm：80.3；长度 mm：102；滤镜 mm：67；最近对焦 m：0.85；最大倍率 ×：0.1152；镜片数：14；镜组数：9；叶片数：15 | [来源 1](https://store.sirui.com/products/sirui-aurora-series-85mm-full-frame-autofocus-lens) |
| HELIAR-HYPER WIDE 10mm F5.6 Aspherical（`voigtlander-heliar-hyper-wide-10mm-f5-6-aspherical`） | 直径 mm：67.4；长度 mm：68.5；最大倍率 ×：0.044 | [来源 1](https://www.cosina.co.jp/voigtlander/en/e-mount/heliar-hyper-wide-10mm-f5-6-aspherical/) |
| SUPER WIDE-HELIAR 15mm F4.5 Aspherical III（`voigtlander-super-wide-heliar-15mm-f4-5-aspherical-iii`） | 直径 mm：66.4；长度 mm：62.3；最大倍率 ×：0.065 | [来源 1](https://www.cosina.co.jp/voigtlander/en/e-mount/super-wide-heliar-15mm-f4-5-aspherical-iii/) |
| NOKTON 21mm F1.4 Aspherical（`voigtlander-nokton-21mm-f1-4-aspherical`） | 直径 mm：70.5；长度 mm：79.5；滤镜 mm：62 | [来源 1](https://www.cosina.co.jp/voigtlander/en/e-mount/nokton-21mm-f1-4-aspherical/) |
| Otus ML 35mm F1.4（`zeiss-otus-ml-35`） | 叶片数：10 | [来源 1](https://www.zeiss.com/photonics-and-optics/en/photography/products/lenses-for-mirrorless-system-cameras/otus-ml-lenses.html) |
| Otus ML 50mm F1.4（`zeiss-otus-ml-50`） | 叶片数：10 | [来源 1](https://www.zeiss.com/photonics-and-optics/en/photography/products/lenses-for-mirrorless-system-cameras/otus-ml-lenses.html) |
| Otus ML 85mm F1.4（`zeiss-otus-ml-85`） | 叶片数：10 | [来源 1](https://www.zeiss.com/photonics-and-optics/en/photography/products/lenses-for-mirrorless-system-cameras/otus-ml-lenses.html) |
| 10-18mm F4.5-5.6 Zoom Lens（`laowa-10-18mm-f-4-5-5-6-zoom-lens-sony-fe`） | 直径 mm：70；长度 mm：90.9 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/LAOWA%201018.pdf) |
| 100mm F2.8 2X Ultra-Macro APO Lens（`laowa-100mm-f-2-8-2x-ultra-macro-apo-lens-sony-fe`） | 直径 mm：72 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/LAOWA%20100m%20f2.8.pdf) |
| 100mm F2.8 Tilt-Shift 1X Macro（`laowa-100mm-f-2-8-tilt-shift-1x-macro-sony-fe`） | 直径 mm：85；长度 mm：162 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/100mm%20f2.8%20Tilt-Shift.pdf) |
| 10mm F2.8 Zero-D FF Auto Focus Lens（`laowa-10mm-f-2-8-zero-d-ff-auto-focus-lens-sony-fe`） | 直径 mm：82；长度 mm：70.8 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/10mm%20f2.8%20FF%20Zero-D.pdf) |
| 11mm F4.5 FF RL Lens（`laowa-11mm-f-4-5-ff-rl-lens-sony-fe`） | 直径 mm：63.5 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/LAOWA%2011mm%20f4.5.pdf) |
| 12-24mm F5.6 Zoom（`laowa-12-24mm-f-5-6-zoom-sony-fe`） | 直径 mm：69.4 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/12-24mm%20f5.6%20Zoom.pdf) |
| 12mm F2.8 Lite Zero-D FF Auto Focus Lens（`laowa-12mm-f-2-8-lite-zero-d-ff-auto-focus-lens-sony-fe`） | 直径 mm：77；长度 mm：76.5 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/12mm%20f2.8%20Lite%20Zero-D%20FF.pdf) |
| 14mm F4 FF RL Zero-D Lens（`laowa-14mm-f-4-ff-rl-zero-d-lens-sony-fe`） | 直径 mm：58；长度 mm：59 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/14mm%20f4.pdf) |
| 15mm F2 Zero-D Lens（`laowa-15mm-f-2-zero-d-lens-sony-fe`） | 直径 mm：77.2；长度 mm：82 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/LAOWA%2015mm%20f2.pdf) |
| 15mm F4.5 0.5X Macro Groothoek（`laowa-15mm-f-4-5-0-5x-macro-groothoek-sony-fe-auto-aperture`） | 直径 mm：70；长度 mm：47.7；镜片数：16；镜组数：11 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/15mm%20f4.5%200.5x.pdf) |
| 15mm F4.5 Zero-D Shift Lens（`laowa-15mm-f-4-5-zero-d-shift-lens-sony-fe`） | 直径 mm：79 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/15mm%20f4.5%20Zero-D%20Shift.pdf) |
| 15mm F4.5R Zero-D Shift Lens（`laowa-15mm-f-4-5r-zero-d-shift-lens-sony-fe`） | 直径 mm：79 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/15mm%20f4.5R%20Zero-D%20Shift.pdf) |
| 15mm F5 Cookie FF（`laowa-15mm-f-5-cookie-ff-sony-fe-zilver`） | 直径 mm：67.1 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/15mm%20f5%20Cookies%20FF.pdf) |
| 200mm F2 AF FF（`laowa-200mm-f-2-af-ff-sony-fe`） | 直径 mm：118；长度 mm：175；最近对焦 m：1.5 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/200mm-f2-AF-FF.pdf) |
| 20mm F4 Zero-D Shift Lens（`laowa-20mm-f-4-zero-d-shift-lens-sony-fe`） | 直径 mm：95；最大倍率 ×：0.17 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/20mm%20f4%20Zero-D%20Shift.pdf) |
| 55mm F2.8 Tilt-Shift 1X Macro（`laowa-55mm-f-2-8-tilt-shift-1x-macro-sony-fe`） | 直径 mm：85；长度 mm：168.5 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/55mm%20f2.8%20Tilt-Shift.pdf) |
| 58mm F2.8 2X Ultra Macro APO（`laowa-58mm-f-2-8-2x-ultra-macro-apo-sony-fe`） | 直径 mm：74；长度 mm：117 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/58mm%20f2.8%202X%20Ultra%20MAcro%20APO.pdf) |
| 85mm F5.6 2X Ultra-Macro APO Lens（`laowa-85mm-f-5-6-2x-ultra-macro-apo-lens-sony-fe`） | 直径 mm：53 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/LAOWA%2085mm%20f5.6%20Macro.pdf) |
| 90mm F2.8 2X Ultra-Macro APO Lens（`laowa-90mm-f-2-8-2x-ultra-macro-apo-lens-sony-fe`） | 直径 mm：74；长度 mm：120 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/90mm%20f2.8%202X%20Ultra%20Macro%20APO.pdf) |
| 9mm F5.6 FF RL Lens（`laowa-9mm-f-5-6-ff-rl-lens-sony-fe`） | 直径 mm：62.4 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/LAOWA%209mm%20f5.6.pdf) |
| Argus 35mm F0.95 FF（`laowa-argus-35mm-f-0-95-ff-sony-fe`） | 直径 mm：76.8；长度 mm：103 | [来源 1](https://fs.myteam44.nl/attachments/Laowa/User_Manual/LAOWA%20Argus%2035mm%20f0.95.pdf) |
| FE 50mm F1.8 II Lite（`yongnuo-50f1-8s-df`） | 重量 g：273；直径 mm：68；长度 mm：79；滤镜 mm：58；最近对焦 m：0.45；最大倍率 ×：0.13；镜片数：10；镜组数：6；叶片数：9 | [来源 1](https://th.hkyongnuo.com/products/50f18s-df) |
| AF 85mm F1.4 II（`meike-8514iie`） | 直径 mm：85；长度 mm：110；滤镜 mm：77；最近对焦 m：0.81；镜片数：15；镜组数：11；叶片数：11；重量 g：648 | [来源 1](https://meikeglobal.com/products/8514iie) |
| AF 85mm F1.8 II SE（`meike-8518ii-se-e-mount`） | 直径 mm：76；长度 mm：100.2；滤镜 mm：62；最近对焦 m：0.65；镜片数：11；镜组数：7；叶片数：11；重量 g：369 | [来源 1](https://meikeglobal.com/products/8518ii-se-e-mount) |
| AF 24mm F1.4 MIX（`meike-2414e`） | 直径 mm：79；长度 mm：107；滤镜 mm：72；最近对焦 m：0.28；镜片数：15；镜组数：12；叶片数：11；重量 g：556 | [来源 1](https://meikeglobal.com/products/2414e) |
| AF 35mm F2（`meike-3520e`） | 直径 mm：73；长度 mm：90；滤镜 mm：58；最近对焦 m：0.45；镜片数：11；镜组数：9；叶片数：9 | [来源 1](https://meikeglobal.com/products/3520e) |
| AF 35mm F1.8 Pro（`meike-3518proe`） | 直径 mm：74；长度 mm：93；滤镜 mm：58；最近对焦 m：0.35；镜片数：12；镜组数：10；叶片数：9；重量 g：400 | [来源 1](https://meikeglobal.com/products/3518proe) |
| AF 85mm F1.8 Pro（`meike-8518proe`） | 直径 mm：76；长度 mm：95；滤镜 mm：62；最近对焦 m：0.85；镜片数：11；镜组数：8；叶片数：9；重量 g：389 | [来源 1](https://meikeglobal.com/products/8518proe) |
| AF 55mm F1.8 Pro（`meike-5518e`） | 直径 mm：74；长度 mm：90；滤镜 mm：58；最近对焦 m：0.55；镜片数：11；镜组数：8；叶片数：9；重量 g：364 | [来源 1](https://meikeglobal.com/products/5518e) |
| AF 85mm F1.4 MIX（`meike-meike-85mm-f1-4-auto-focus-lens`） | 直径 mm：87；长度 mm：114；滤镜 mm：77；最近对焦 m：0.98；镜片数：13；镜组数：8；叶片数：12；防抖：false | [来源 1](https://meikeglobal.com/products/meike-85mm-f1-4-auto-focus-lens) |
| AF 85mm F1.8（`meike-85mm-f1-8-full-frame-auto-focus-stm-lens-for-sony-e-mount-cameras`） | 滤镜 mm：67；最近对焦 m：0.9；镜片数：9；镜组数：6；叶片数：9 | [来源 1](https://meikeglobal.com/products/85mm-f1-8-full-frame-auto-focus-stm-lens-for-sony-e-mount-cameras) |
| MF 50mm F1.2（`meike-50mm-large-aperture-lens`） | 滤镜 mm：67；最近对焦 m：0.6；镜片数：12；镜组数：7 | [来源 1](https://meikeglobal.com/products/50mm-large-aperture-lens) |
| MF 50mm F1.7（`meike-meike-mk-50mm-f1-7-full-frame-wedding-photography`） | 重量 g：310；直径 mm：61；长度 mm：54.5；滤镜 mm：52；最近对焦 m：0.5；镜片数：6；镜组数：5 | [来源 1](https://meikeglobal.com/products/meike-mk-50mm-f1-7-full-frame-wedding-photography) |

## 仍待核验

逐型号缺项及字段覆盖数量由 [DATA_COVERAGE.md](DATA_COVERAGE.md) 自动生成。主要限制包括：

- **sony**：56 款已确认；部分历史停产状态、发布日期和中国大陆现行价格仍待核实。电动变焦摄影镜头保留，专用电影镜头排除。
- **sigma**：已拆分 DG DN 旧款与 DG 新标识型号；不同官方条目作为独立型号，不能把名称更新直接视作光学升级。
- **tamron**：G2 与第一代独立收录。规格页仍在线不等于仍在生产，未取得明确停产说明的状态保留为未知。
- **zeiss**：不包含单反 Otus、Milvus 或电影系列。Otus ML 已补充官方 10 叶片说明；Batis / Loxia 未取得叶片数的充分官方佐证。
- **samyang**：Rokinon 地区名称不重复计数；套装、模块化和无法确认全画幅的条目进入待核验表。历史型号仍可能遗漏。
- **viltrox**：已复核 E/FE 专属参数区并区分同页比较型号。16mm、85mm II 等部分历史资料仍缺逐卡口参数；固定光圈型号的叶片字段不适用。
- **laowa**：已逐份核对地区品牌站链接的原厂说明书，补充尺寸和距离单位。部分手册只列 M/F/EF/RF 等卡口尺寸，或与 E 页冲突，相关值继续留空；共用标称尺寸在型号备注说明。
- **voigtlander**：当前目录不完整代表历史系列；早期 SE 版本及其他已下架型号需继续对照历史目录。
- **ttartisan**：已核对官网文字表格、E 卡口尺寸图和 90mm F1.25 官方说明书。跨卡口重量区间不当作 E 卡口定值，未公布倍率继续留空。
- **7artisans**：已核对官网文字规格及参数图片。10mm F2.8 II 的 8/10 叶片说明冲突，留空；共用 L 页重量尺寸不移用于 E。部分型号尚缺倍率与专属重量。
- **yongnuo**：已补充 Lite II 官方规格图片中的完整主要参数；50mm DSM 的叶片数冲突仍留空，85mm 仍缺部分官方佐证，早期塑料镜身版本单列待核验。
- **sirui**：已核对两款 AURORA 的 E Mount 规格，重量和长度使用不含镜头盖口径；85mm 不混入 X 卡口 101.7mm 长度。
- **meike**：11 款已确认身份，已读取新款规格图片补齐多数字段；许多型号官网未列最大放大倍率，部分早期镜头仍缺逐卡口重量和尺寸。其他长尾品牌尚未完成清点。

索尼与腾龙原有主要规格已完整，本轮没有为了增加数量而重复改写。仍缺的历史日期、停产依据及大陆官方人民币价格继续保留空值。
