# 镜头数据维护

## 收录原则

只收录能够由厂家资料确认“原生 Sony E 卡口 + 全画幅摄影镜头”身份的型号。APS-C、A 卡口、M 卡口转接、增距镜、专用电影镜头和配件不进入正式列表。摄影镜头兼有视频功能不因此排除。

正式文件：`src/data/lenses/<brand>.json`。未知的数值必须为 JSON `null`，不能使用 `0`、空字符串或“待定”作为数值。品牌 ID 必须在 `src/data/brands.json` 注册。

身份不明确的候选型号写入 `src/data/coverage.json`：`brand`、`model`、`status`（`pending` 或 `excluded`）、`reason`、`url`。正式列表中的 `verification` 为 `verified` 或 `partial`，与销售状态是两个独立维度。各品牌已清点的目录与覆盖边界写入 `src/data/brand-review.json`。

## 新增一个型号

1. 在厂商产品页确认完整名称、代际、E 卡口选项和全画幅标识。只有 APS-C 机身兼容列表不足以确认镜头像场；Sony E 也不自动等于全画幅。
2. 打开同品牌 JSON，复制一个完整对象作为字段模板。设置新的稳定 `id`、`name`、`model`、`aliases`、`series`、`generation`。不要复制旧型号参数，先将无法确认的字段改为 `null`。
3. 按下方单位填写可靠参数，尤其检查 E / Z / RF 多列资料。不同代际分别建记录，同一型号的颜色、套装、地区别名不重复建记录。
4. 加入来源的 `title`、`url`、`checkedAt`。若不同来源补充不同字段，在 `notes` 说明来源与字段对应关系；每次核验后更新日期。
5. 如有可核实的中国大陆人民币官方价、上市价或商家商品页标价，按价格对象填写；否则 `price: null`。商家报价必须核对具体型号、代际、卡口、成色及套装条件。
6. 仅当重量、直径、长度、最近对焦距离、最大倍率、镜片数、组数、光圈叶片数全部已核实且不缺失时，设置 `verification: "verified"`，否则为 `partial`。发布日期、价格和销售状态可以未知。
7. 若该型号原来在待核验清单中，移除对应 `pending` 项；补充品牌覆盖边界。
8. 运行 `npm run validate:data`、`npm test`、`npm run data:report`、`npm run build`。在网页搜索新型号，打开详情核对显示，使用重量和焦距筛选确认边界。

## 字段与单位

| 字段 | 含义及规则 |
|---|---|
| `id` | 英文小写字母、数字、短横线组成；在整个库中唯一；发布后尽量不改，网址使用此 ID |
| `brand` / `model` | 品牌 ID / 厂商型号；同品牌型号不重复 |
| `mount` / `format` | 固定 `Sony E` / `Full Frame` |
| `focalMin` / `focalMax` | 毫米；定焦填写相同数字 |
| `apertureWide` / `apertureTele` | 两端最大光圈的 F 值，例如 28–200 F2.8–5.6 填 2.8 与 5.6；不填 T 值或最小光圈 |
| `focus` | `AF` / `MF` / `unknown`；支持 AF 且可手动切换的镜头填 AF |
| `stabilization` | 镜头光学防抖 true / false / null，不指机身五轴防抖 |
| `weight` | 克，仅 E 卡口；注明脚架环、遮光罩等口径 |
| `diameter` / `length` | 毫米；优先不含前后盖和遮光罩长度，在备注说明 |
| `filterSize` | 毫米；后置插入滤镜、前置旋入滤镜的区别写入备注；无旋入接口且未核验时为 null |
| `minFocus` | 米；取官方给出的最短值，AF/MF、焦段或特殊近摄模式写入备注；工作距离不能当对焦距离 |
| `maxMagnification` | 倍率数字，1:1 为 1，1:5 为 0.2；区间取最大倍率，并注明适用条件 |
| `elements` / `groups` / `blades` | 镜片数 / 组数 / 光圈叶片数，正整数；注意英文资料可能先写 groups 再写 elements |
| `macro` | 厂商是否明确作为 Macro / 微距型号；不依据一个倍率阈值擅自命名 |
| `releaseDate` | YYYY、YYYY-MM 或 YYYY-MM-DD；未知为 null，不根据网页修改日期推算 |
| `releasePrecision` | 对应 `year`、`month`、`day`；日期未知时也为 null |
| `status` | `current`、`discontinued`、`unknown`；规格页仍在线不能单独证明现售 |
| `sources` | 至少一条 HTTPS 厂家资料来源，包含标题、URL、核验日期 |
| `notes` | 参数口径、来源冲突、单位换算、代际区别、缺失原因 |

发布与开售可能不同：尽量使用发布日；厂家只给开售日时可采用，并在备注注明。排序按已记录日期进行，不为未知日期补造顺序。

## 更新一个已有型号的示例

以 `sony-sel2470gm2` 为例，打开 `src/data/lenses/sony.json` 并定位该 ID。若厂商修改重量口径，重新阅读规格原文，核对 E 卡口以及是否包含镜头盖；只更新已证实字段，在 `notes` 留下解释，并更新对应来源的核验日期。不要因为价格更新而覆盖原有重量、发布日期或代际。

已有的价格对象如下，真实记录使用真实来源而非示例占位地址：

```json
{
  "amount": 14499,
  "currency": "CNY",
  "type": "launch",
  "source": {
    "title": "索尼中国 · 产品发布新闻及上市指导价",
    "url": "https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2022/20220428-1.html",
    "checkedAt": "2026-09-22"
  },
  "collectedAt": "2026-09-22"
}
```

`launch` 为上市指导价，`official` 为在采集日核实的官方公开售价，`retail` 为商家商品页公开标价快照。`retail` 必填 `conditions`，注明卡口、颜色或赠品、登录／优惠／地区限制及未核实事项；不可将普通商家标题当成官方授权证明。采集日不等于价格生效日，也不保证网页缓存已更新。不得自动换算海外币种、混用二手成交价或将指导价标为“实时价格”。

有可靠商家价时可更新 `price`，把原有价格对象放入可选数组 `priceHistory`，保留原始来源、类型及采集日期。详情会同时展示这些历史参考，列表、价格筛选及排序使用 `price`。不同代际与卡口不得共享未经确认的报价，付费套装不得冒充裸镜价。

全库价格查询记录位于 `src/data/price-review.json`，包括逐款检索词、查询日期、结果和未补齐原因。`unresolved` 只表示报价未核实，不代表无货。新增型号后另行查询并记录，不应把旧查询日期自动复制到新记录。

## 来源冲突处理

`submitted` 表示用户提供参考价，必须有 `conditions` 说明其未经独立核验。`collectedAt` 与 `source.checkedAt` 在此类型中仅表示表格录入／检查日期，不表示访问过外部报价页；界面显示“录入于”。来源指向公开的逐行导入记录，保留原表价格、链接、店铺称谓和备注，不将占位商品链接包装为可核验来源。明确估算、其他卡口类推及代际不明的值留在 `src/data/user-price-import.json` 待核验，不写入正式价格。不得据价格表的备注更改镜头规格或销售状态。

优先查看 E 卡口说明书、专属规格页与对应厂商公告。通用多卡口宣传页若未分版本，重量尺寸留空。互相冲突的数值留空，并将两种说法、来源和处理理由写入 `notes`。照片中的参数应先人工阅读核对，再写入 JSON，不让 OCR 结果直接成为正式数据。

数据更新是手动维护，不含定时采集任务。更新后的源码会在开发服务器中自动刷新；生产版需重新执行构建。生成覆盖报告只读取本地资料，不会联系厂家网站。
