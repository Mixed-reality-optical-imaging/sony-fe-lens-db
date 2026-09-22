# 全库价格查询记录 / Full-catalog price review

查询日期：2026-09-22。对全部 299 款镜头逐款执行型号与淘宝／京东价格检索，并补查品牌中文名与京东商品链接。**完成查询不等于每款都获得报价。**

本轮录入 **48 款京东商品页面价**；共有 **78 款具有可溯源人民币参考价**，其余 **221 款仍无可靠价格**。所有原有官方／上市价格均保留：有商家报价时放入 priceHistory，在详情中显示。未修改镜头规格和销售状态。

All 299 catalog records were individually searched. 48 JD product-page price snapshots were added; 78 records now have a sourced CNY reference, while 221 remain unpriced. These are public listing snapshots, not verified checkout prices, stock confirmations or lowest-price claims. Existing official and launch references are preserved.

## 核对标准与限制

- 核对商品名称、代际、Sony E 卡口及商品自身标价，不使用“看了又看”的推荐价格代替商品报价。
- 排除明确标注二手、准新、拆机、相机套机、付费防护套装及其他卡口的结果。不根据评论里提到的镜头判断当前 SKU。
- 银色、黑色和页面赠品在价格条件中注明。页面未公开店铺主体，不能据此声称自营或官方授权；库存、运费和优惠条件未核实。
- 页面默认配送地区为北京，并提示“登录查看到手价”。采集日期是本次读取日期，公开页面可能有缓存；下单时请重新确认。
- 未使用登录账号、未绕过访问控制、未批量调用隐藏价格接口。只保存必要事实、来源链接与自写说明，不发布商品图、评价或网页全文。
- 淘宝／天猫检索未得到可核对同版本的有效公开报价，本轮新增商家价均来自京东。未录入仅见于优惠聚合站、海外币种或无法确认 SKU 的价格。
- 单款未确认报价只代表本次检索未核实，不代表无货或没有在售商品；特别是停产和新发布型号。

机器可读逐款记录：[price-review.json](../src/data/price-review.json)。价格来源及采集日期也保存在各品牌 JSON 的 price 对象中。查询词仅用于复查，不是数据证据。

## 品牌统计

|品牌|已查询|本轮京东报价|仍无价格|
|---|---:|---:|---:|
|sony|58|14|17|
|sigma|60|20|40|
|tamron|20|5|15|
|viltrox|17|1|14|
|samyang|29|2|27|
|ttartisan|14|2|12|
|7artisans|16|2|14|
|sirui|2|1|1|
|voigtlander|16|0|16|
|zeiss|13|0|13|
|laowa|34|0|34|
|yongnuo|6|0|5|
|meike|11|1|10|
|thypoch|3|0|3|

## 逐款结果

|型号|查询结果|人民币参考价|来源|
|---|---|---:|---|
|sony FE 14mm F1.8 GM|已查询，保留原参考价|11300|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2021/2021-04-21.html)|
|sony FE 20mm F1.8 G|已查询，保留原参考价|7499|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2020/20200226-01.html)|
|sony FE 24mm F2.8 G|已查询，保留原参考价|4699|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2020/2021-03-24.html)|
|sony FE 35mm F1.4 GM|已查询，保留原参考价|11300|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2020/20210114-01.html)|
|sony FE 24mm F1.4 GM|已查询，报价未确认|—|—|
|sony FE 16mm F1.8 G|已查询，保留原参考价|6499|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2025/20250227-1.html)|
|sony FE 35mm F1.4 ZA|已查询，报价未确认|—|—|
|sony FE 40mm F2.5 G|已查询，保留原参考价|4699|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2020/2021-03-24.html)|
|sony FE 50mm F1.2 GM|已查询，保留原参考价|15999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2020/2021-03-18.html)|
|sony FE 50mm F1.4 GM|已查询，保留原参考价|9599|[来源](https://pet.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2023/20230222-1.html)|
|sony FE 28mm F2|已查询，报价未确认|—|—|
|sony FE 35mm F1.8|已查询，保留原参考价|4700|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2019/20190710-1.html)|
|sony FE 50mm F2.5 G|已查询，保留原参考价|4699|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2020/2021-03-24.html)|
|sony FE 35mm F2.8 ZA|已查询，报价未确认|—|—|
|sony FE 50mm F1.8|已查询，报价未确认|—|—|
|sony FE 50mm F1.4 ZA|已查询，保留原参考价|11999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2016/20160712.html)|
|sony FE 50mm F2.8 Macro|已查询，报价未确认|—|—|
|sony FE 55mm F1.8 ZA|已查询，报价未确认|—|—|
|sony FE 85mm F1.4 GM|已查询，报价未确认|—|—|
|sony FE 85mm F1.4 GM II|已查询，保留原参考价|12400|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2024/240830-1.html)|
|sony FE 90mm F2.8 Macro G OSS|已查询，报价未确认|—|—|
|sony FE 300mm F2.8 GM OSS|已查询，保留原参考价|45999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2023/20231107-3.html)|
|sony FE 100mm F2.8 STF GM OSS|已查询，保留原参考价|11999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2017/20170209.html)|
|sony FE 135mm F1.8 GM|已查询，保留原参考价|13500|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2019/20190227-1-1.html)|
|sony FE 400mm F2.8 GM OSS|已查询，保留原参考价|95000|[来源](https://www.sony.com.cn/zh-cn/cms/newscenter/product/2018/20180627-1.html)|
|sony FE 12-24mm F2.8 GM|已录入商家页面价|21199|[来源](https://item.jd.com/product/-UGx1e9WYSmhdivvOunl0w.html)|
|sony FE 85mm F1.8|已录入商家页面价|3799|[来源](https://item.jd.com/product/ditxZRKkLaY7FnmG4BRNFA.html)|
|sony FE 600mm F4 GM OSS|已录入商家页面价|103899|[来源](https://item.jd.com/product/bNE_tNJNBLUHjCcoR6-jJg.html)|
|sony FE 16-35mm F2.8 GM II|已查询，保留原参考价|16499|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2023/20230830-2.html)|
|sony FE PZ 16-35mm F4 G|已查询，保留原参考价|8499|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2022/20220323-1.html)|
|sony FE 12-24mm F4 G|已录入商家页面价|11899|[来源](https://item.jd.com/product/ViXUi6HiexzH8ZP9G8-yvQ.html)|
|sony FE 20-70mm F4 G|已查询，报价未确认|—|—|
|sony FE 24-50mm F2.8 G|已查询，保留原参考价|7999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2024/20240222.html)|
|sony FE 16-35mm F4 ZA OSS|已查询，报价未确认|—|—|
|sony FE 16-35mm F2.8 GM|已查询，报价未确认|—|—|
|sony FE 24-70mm F2.8 GM II|已查询，保留原参考价|14499|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2022/20220428-1.html)|
|sony FE 16-25mm F2.8 G|已查询，保留原参考价|8499|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2024/20240418-1.html)|
|sony FE 24-70mm F4 ZA OSS|已录入商家页面价|5799|[来源](https://item.jd.com/product/TbB_n38Yr6gO4PcHrXjrVg.html)|
|sony FE 28-60mm F4-5.6|已录入商家页面价|3299|[来源](https://item.jd.com/product/3ZhCtpOWPQk2oW8vRh6VwA.html)|
|sony FE 24-70mm F2.8 GM|已查询，报价未确认|—|—|
|sony FE 24-105mm F4 G OSS|已录入商家页面价|7665|[来源](https://item.jd.com/product/wcpzURLKdx5UEK2VTYgNLw.html)|
|sony FE 24-240mm F3.5-6.3 OSS|已查询，报价未确认|—|—|
|sony FE PZ 28-135mm F4 G OSS|已录入商家页面价|11999|[来源](https://item.jd.com/product/jNOpOfaUuzYDIrjBiBHKcA.html)|
|sony FE 70-200mm F4 Macro G II OSS|已录入商家页面价|8299|[来源](https://item.jd.com/product/i8JMnCGMR-BVPeXnhf2tzw.html)|
|sony FE 70-200mm F4 G OSS|已查询，报价未确认|—|—|
|sony FE 70-200mm F2.8 GM II OSS|已录入商家页面价|14199|[来源](https://item.jd.com/product/eIFZM_t6dA38W3iNlcu9GQ.html)|
|sony FE 28-70mm F3.5-5.6 OSS|已查询，报价未确认|—|—|
|sony FE 28-70mm F2 GM|已录入商家页面价|20499|[来源](https://item.jd.com/product/-0ON90qk0KWNH5g3XQxtNg.html)|
|sony FE 70-300mm F4.5-5.6 G OSS|已查询，报价未确认|—|—|
|sony FE 100-400mm F4.5-5.6 GM OSS|已查询，保留原参考价|18900|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2017/20170420.html)|
|sony FE 200-600mm F5.6-6.3 G OSS|已录入商家页面价|11999|[来源](https://item.jd.com/product/Z-oR8hx7Ji2CqmV1ZtHXRA.html)|
|sony FE 400-800mm F6.3-8 G OSS|已查询，保留原参考价|18999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2025/20250227-1.html)|
|sony FE 100mm F2.8 Macro GM OSS|已录入商家页面价|10299|[来源](https://item.jd.com/product/POx7jPNWe4UHgibKIAEXxQ.html)|
|sony FE 70-200mm F2.8 GM OSS|已查询，保留原参考价|20999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2016/20160712.html)|
|sony FE 50-150mm F2 GM|已录入商家页面价|26499|[来源](https://item.jd.com/product/ILiaqDxBwU-yzZbiQiGPGw.html)|
|sony FE 8-14mm F3.5 Fisheye G|已查询，保留原参考价|9999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2026/20260909-1.html)|
|sony FE 400mm F4.5 GM OSS|已查询，保留原参考价|18999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2026/20260916-1.html)|
|sony FE 600mm F6.3 GM OSS|已查询，保留原参考价|24999|[来源](https://www.sony.com.cn/content/sonyportal/zh-cn/cms/newscenter/product/2026/20260916-1.html)|
|sigma 14mm F1.4 DG|已查询，报价未确认|—|—|
|sigma 15mm F1.4 DG DN DIAGONAL FISHEYE|已查询，报价未确认|—|—|
|sigma 20mm F1.4 DG DN|已查询，报价未确认|—|—|
|sigma 17mm F4 DG|已查询，报价未确认|—|—|
|sigma 20mm F2 DG|已查询，报价未确认|—|—|
|sigma 24mm F1.4 DG DN|已录入商家页面价|5199|[来源](https://item.jd.com/product/Qr44WD1BOJH1I0tutHhvVQ.html)|
|sigma 24mm F2 DG|已查询，报价未确认|—|—|
|sigma 24mm F3.5 DG|已查询，报价未确认|—|—|
|sigma 35mm F1.2 DG II|已录入商家页面价|9499|[来源](https://item.jd.com/product/u7wlvfZbVORPCXXoJq1SWg.html)|
|sigma 35mm F1.4 DG DN|已录入商家页面价|4997.78|[来源](https://item.jd.com/product/uuWByaq1ZIqY6NFM-WaxQQ.html)|
|sigma 35mm F1.4 DG II|已查询，报价未确认|—|—|
|sigma 35mm F2 DG|已查询，报价未确认|—|—|
|sigma 45mm F2.8 DG|已查询，报价未确认|—|—|
|sigma 50mm F1.2 DG DN|已录入商家页面价|7999|[来源](https://item.jd.com/product/bKrWvElTrC8nZVRsy-0i6w.html)|
|sigma 50mm F2 DG|已查询，报价未确认|—|—|
|sigma 50mm F1.4 DG DN|已查询，报价未确认|—|—|
|sigma 85mm F1.4 DG DN|已录入商家页面价|4499|[来源](https://item.jd.com/product/OBa8NfmmBHeAhHUHxKhpZA.html)|
|sigma 65mm F2 DG|已录入商家页面价|5099|[来源](https://item.jd.com/product/3gv04gHxItDXEMv3J7fguw.html)|
|sigma 90mm F2.8 DG|已查询，报价未确认|—|—|
|sigma 105mm F2.8 DG DN MACRO|已录入商家页面价|5199|[来源](https://item.jd.com/product/VSvRBqbfzbZEDFFpCPOsKA.html)|
|sigma 135mm F1.4 DG|已录入商家页面价|12699|[来源](https://item.jd.com/product/dvqYhC3msQneg-aigtMApg.html)|
|sigma 200mm F2 DG OS|已录入商家页面价|21499|[来源](https://item.jd.com/product/SLV1vRwL0GEYhyYpCSkINA.html)|
|sigma 500mm F5.6 DG DN OS|已查询，报价未确认|—|—|
|sigma 14-24mm F2.8 DG DN|已录入商家页面价|6999|[来源](https://item.jd.com/product/6z08deON9ifI39FxYp3boQ.html)|
|sigma 16-28mm F2.8 DG DN|已录入商家页面价|5129|[来源](https://item.jd.com/product/I9e4eKuk80BtGPGJCE3Ktw.html)|
|sigma 20-200mm F3.5-6.3 DG|已查询，报价未确认|—|—|
|sigma 24-70mm F2.8 DG DN II|已查询，报价未确认|—|—|
|sigma 28-70mm F2.8 DG DN|已录入商家页面价|3999|[来源](https://item.jd.com/product/9IuyaziV-PLyR2--2xFVhw.html)|
|sigma 28-45mm F1.8 DG DN|已录入商家页面价|8900|[来源](https://item.jd.com/product/lUlW5vrENRiZGnTwkSQGEg.html)|
|sigma 28-105mm F2.8 DG DN|已录入商家页面价|9499|[来源](https://item.jd.com/product/d6gvC1kBvV60zIwOku379w.html)|
|sigma 60-600mm F4.5-6.3 DG DN OS|已录入商家页面价|11999|[来源](https://item.jd.com/product/1zKTPxOKNYEhs76BSrvkVQ.html)|
|sigma 70-200mm F2.8 DG DN OS|已录入商家页面价|9499|[来源](https://item.jd.com/product/ielPdNoJ6hySEflbXqo6uQ.html)|
|sigma 100-400mm F5-6.3 DG DN OS|已录入商家页面价|6249|[来源](https://item.jd.com/product/Fn1XFUcPuDTYASpZ-Ai9hQ.html)|
|sigma 150-600mm F5-6.3 DG DN OS|已录入商家页面价|7999|[来源](https://item.jd.com/product/LePF8XV5WdHDv6QYpa0LWw.html)|
|sigma 300-600mm F4 DG OS|已录入商家页面价|39999|[来源](https://item.jd.com/product/MVf2Wdf3kex7fAfRHXA5Yw.html)|
|sigma 14mm F1.8 DG HSM|已查询，报价未确认|—|—|
|sigma 28mm F1.4 DG HSM|已查询，报价未确认|—|—|
|sigma 70mm F2.8 DG MACRO|已查询，报价未确认|—|—|
|sigma 14mm F1.4 DG DN|已查询，报价未确认|—|—|
|sigma 17mm F4 DG DN|已查询，报价未确认|—|—|
|sigma 20mm F2 DG DN|已查询，报价未确认|—|—|
|sigma 24mm F2 DG DN|已查询，报价未确认|—|—|
|sigma 24mm F3.5 DG DN|已查询，报价未确认|—|—|
|sigma 35mm F1.2 DG DN|已查询，报价未确认|—|—|
|sigma 35mm F2 DG DN|已查询，报价未确认|—|—|
|sigma 45mm F2.8 DG DN|已查询，报价未确认|—|—|
|sigma 50mm F2 DG DN|已查询，报价未确认|—|—|
|sigma 65mm F2 DG DN|已录入商家页面价|4599|[来源](https://item.jd.com/product/0Cb-ZQIaivJxb9wnZvYx7A.html)|
|sigma 90mm F2.8 DG DN|已查询，报价未确认|—|—|
|sigma 24-70mm F2.8 DG DN|已查询，报价未确认|—|—|
|sigma 20mm F1.4 DG HSM|已查询，报价未确认|—|—|
|sigma 24mm F1.4 DG HSM|已查询，报价未确认|—|—|
|sigma 35mm F1.4 DG HSM|已查询，报价未确认|—|—|
|sigma 40mm F1.4 DG HSM|已查询，报价未确认|—|—|
|sigma 50mm F1.4 DG HSM|已查询，报价未确认|—|—|
|sigma 85mm F1.4 DG HSM|已查询，报价未确认|—|—|
|sigma 105mm F1.4 DG HSM|已查询，报价未确认|—|—|
|sigma 135mm F1.8 DG HSM|已查询，报价未确认|—|—|
|sigma 85mm F1.2 DG|已查询，报价未确认|—|—|
|sigma 20-60mm F2.8-4 DG|已查询，报价未确认|—|—|
|tamron 17-28mm F2.8 Di III RXD|已查询，报价未确认|—|—|
|tamron 16-30mm F2.8 Di III VXD G2|已查询，报价未确认|—|—|
|tamron 17-50mm F4 Di III VXD|已查询，报价未确认|—|—|
|tamron 28-200mm F2.8-5.6 Di III RXD|已录入商家页面价|3269|[来源](https://item.jd.com/product/HQaW6DGMC52zyvn7rM3Fyg.html)|
|tamron 20-40mm F2.8 Di III VXD|已查询，报价未确认|—|—|
|tamron 28-75mm F2.8 Di III VXD G2|已查询，报价未确认|—|—|
|tamron 28-75mm F2.8 Di III RXD|已查询，报价未确认|—|—|
|tamron 28-300mm F4-7.1 Di III VC VXD|已录入商家页面价|4110|[来源](https://item.jd.com/product/7k0fMDxXNVKxFmi6PfvBQA.html)|
|tamron 25-200mm F2.8-5.6 Di III VXD G2|已录入商家页面价|5545|[来源](https://item.jd.com/product/cSyCuq_AaYO7SgyMb0UVRA.html)|
|tamron 70-180mm F2.8 Di III VXD|已查询，报价未确认|—|—|
|tamron 70-300mm F4.5-6.3 Di III RXD|已查询，报价未确认|—|—|
|tamron 70-180mm F2.8 Di III VC VXD G2|已查询，报价未确认|—|—|
|tamron 50-400mm F4.5-6.3 Di III VC VXD|已录入商家页面价|8499|[来源](https://item.jd.com/product/gHj8tndFBGCra4M8HucR_Q.html)|
|tamron 150-500mm F5-6.7 Di III VC VXD|已录入商家页面价|5199|[来源](https://item.jd.com/product/oUz9H_tC8IM5c9hAay6ZhQ.html)|
|tamron 50-300mm F4.5-6.3 Di III VC VXD|已查询，报价未确认|—|—|
|tamron 35-150mm F2-2.8 Di III VXD|已查询，报价未确认|—|—|
|tamron 24mm F2.8 Di III OSD M1:2|已查询，报价未确认|—|—|
|tamron 20mm F2.8 Di III OSD M1:2|已查询，报价未确认|—|—|
|tamron 35mm F2.8 Di III OSD M1:2|已查询，报价未确认|—|—|
|tamron 90mm F2.8 Di III MACRO VXD|已查询，报价未确认|—|—|
|viltrox AF 26mm F2.8 EVO|已查询，报价未确认|—|—|
|viltrox AF 35mm F1.8 EVO (APO)|已查询，保留原参考价|1799|[来源](https://www.viltrox.com.tw/2026/04/28/from-oinepoint/)|
|viltrox AF 55mm F1.8 EVO (APO)|已查询，保留原参考价|1699|[来源](https://www.viltrox.com.tw/2026/04/28/from-oinepoint/)|
|viltrox AF 85mm F2.0 EVO|已查询，报价未确认|—|—|
|viltrox AF 50mm F1.4 Pro|已录入商家页面价|2799|[来源](https://item.jd.com/product/Kc1OvS9rpGHhJRffsOwAjw.html)|
|viltrox AF 14mm F4.0 Air|已查询，报价未确认|—|—|
|viltrox AF 85mm F1.4 Pro|已查询，报价未确认|—|—|
|viltrox AF 35mm F1.2 LAB|已查询，报价未确认|—|—|
|viltrox AF 50mm F2.0 Air|已查询，报价未确认|—|—|
|viltrox AF 135mm F1.8 LAB|已查询，报价未确认|—|—|
|viltrox AF 28mm F4.5|已查询，报价未确认|—|—|
|viltrox AF 40mm F2.5 Air|已查询，报价未确认|—|—|
|viltrox AF 28mm F1.8|已查询，报价未确认|—|—|
|viltrox AF 20mm F2.8 Air|已查询，报价未确认|—|—|
|viltrox AF 16mm F1.8|已查询，报价未确认|—|—|
|viltrox AF 85mm F1.8 II|已查询，报价未确认|—|—|
|viltrox MF 20mm F1.8|已查询，报价未确认|—|—|
|samyang AF 60-180mm F2.8|已查询，报价未确认|—|—|
|samyang AF 24-60mm F2.8|已查询，报价未确认|—|—|
|samyang AF 85mm F1.8 Prima|已查询，报价未确认|—|—|
|samyang AF 16mm F2.8 Prima|已查询，报价未确认|—|—|
|samyang AF 14-24mm F2.8|已录入商家页面价|5699|[来源](https://item.jd.com/product/0BkJhdPN7V7KvSMuEpzlOg.html)|
|samyang AF 35mm F1.4 Prima|已查询，报价未确认|—|—|
|samyang AF 35-150mm F2-2.8|已查询，报价未确认|—|—|
|samyang AF 85mm F1.4 II|已查询，报价未确认|—|—|
|samyang AF 35mm F1.4 II|已查询，报价未确认|—|—|
|samyang AF 135mm F1.8|已查询，报价未确认|—|—|
|samyang AF 50mm F1.4 II|已查询，报价未确认|—|—|
|samyang AF 24-70mm F2.8|已录入商家页面价|4499|[来源](https://item.jd.com/product/cEOgaONvlJu2z4JpB7ei4A.html)|
|samyang AF 24mm F1.8|已查询，报价未确认|—|—|
|samyang AF 14mm F2.8|已查询，报价未确认|—|—|
|samyang AF 35mm F1.4|已查询，报价未确认|—|—|
|samyang MF 12mm F2.8 Fisheye|已查询，报价未确认|—|—|
|samyang MF 14mm F2.8|已查询，报价未确认|—|—|
|samyang MF 35mm F1.4|已查询，报价未确认|—|—|
|samyang MF 50mm F1.4|已查询，报价未确认|—|—|
|samyang MF 85mm F1.4|已查询，报价未确认|—|—|
|samyang MF 100mm F2.8 Macro|已查询，报价未确认|—|—|
|samyang MF 135mm F2.0|已查询，报价未确认|—|—|
|samyang AF 18mm F2.8|已查询，报价未确认|—|—|
|samyang AF 45mm F1.8|已查询，报价未确认|—|—|
|samyang AF 85mm F1.4|已查询，报价未确认|—|—|
|samyang AF 75mm F1.8|已查询，报价未确认|—|—|
|samyang MF 14mm F2.8 II|已查询，报价未确认|—|—|
|samyang MF 85mm F1.4 II|已查询，报价未确认|—|—|
|samyang AF 35mm F1.8|已查询，报价未确认|—|—|
|ttartisan AF 85mm F1.8 Neo|已查询，报价未确认|—|—|
|ttartisan AF 50mm F1.8 Neo|已查询，报价未确认|—|—|
|ttartisan AF 40mm F2|已录入商家页面价|889|[来源](https://item.jd.com/product/UaTmgC8eEkrmUBhElv1_Gw.html)|
|ttartisan AF 75mm F2|已录入商家页面价|1150|[来源](https://item.jd.com/product/hQzfqvMWqEshkQwPL3HzVA.html)|
|ttartisan 100mm F2.8 Macro|已查询，报价未确认|—|—|
|ttartisan 500mm F6.3|已查询，报价未确认|—|—|
|ttartisan 100mm F2.8 Macro Tilt-Shift|已查询，报价未确认|—|—|
|ttartisan 50mm F1.4 Tilt|已查询，报价未确认|—|—|
|ttartisan 50mm F2.0|已查询，报价未确认|—|—|
|ttartisan 11mm F2.8 Fisheye|已查询，报价未确认|—|—|
|ttartisan 90mm F1.25|已查询，报价未确认|—|—|
|ttartisan 21mm F1.5|已查询，报价未确认|—|—|
|ttartisan 14mm F2.8 ASPH.|已查询，报价未确认|—|—|
|ttartisan Tilt-Shift 17mm F4 ASPH.|已查询，报价未确认|—|—|
|7artisans AF 10mm F2.5|已查询，报价未确认|—|—|
|7artisans AF 135mm F1.8|已查询，报价未确认|—|—|
|7artisans AF 40mm F2.5|已录入商家页面价|739|[来源](https://item.jd.com/product/bGMcRC1faQzKSGPNZyapGw.html)|
|7artisans AF 35mm F1.8|已查询，报价未确认|—|—|
|7artisans MF 14mm F2.8|已查询，报价未确认|—|—|
|7artisans MF 75mm F1.4|已查询，报价未确认|—|—|
|7artisans AF 24mm F1.8|已查询，报价未确认|—|—|
|7artisans AF 85mm F1.8|已查询，报价未确认|—|—|
|7artisans AF 50mm F1.8|已录入商家页面价|1090|[来源](https://item.jd.com/product/hVzK1mxUMN_3YeomLG8hxg.html)|
|7artisans MF 18mm F5.6|已查询，报价未确认|—|—|
|7artisans MF 10mm F2.8 II Fisheye|已查询，报价未确认|—|—|
|7artisans MF 60mm F2.8 Macro|已查询，报价未确认|—|—|
|7artisans MF 35mm F1.4 III|已查询，报价未确认|—|—|
|7artisans MF 9mm F5.6|已查询，报价未确认|—|—|
|7artisans MF 10mm F2.8 Fisheye|已查询，报价未确认|—|—|
|7artisans MF 35mm F5.6|已查询，报价未确认|—|—|
|sirui AF 35mm F1.4 AURORA|已录入商家页面价|3699|[来源](https://item.jd.com/product/J6-btzKGlRU-Jw3nkpRaUw.html)|
|sirui AF 85mm F1.4 AURORA|已查询，报价未确认|—|—|
|voigtlander HELIAR-HYPER WIDE 10mm F5.6 Aspherical|已查询，报价未确认|—|—|
|voigtlander SUPER WIDE-HELIAR 15mm F4.5 Aspherical III|已查询，报价未确认|—|—|
|voigtlander NOKTON 21mm F1.4 Aspherical|已查询，报价未确认|—|—|
|voigtlander NOKTON classic 35mm F1.4|已查询，报价未确认|—|—|
|voigtlander APO-LANTHAR 28mm F2 Aspherical|已查询，报价未确认|—|—|
|voigtlander APO-LANTHAR 35mm F2 Aspherical|已查询，报价未确认|—|—|
|voigtlander NOKTON 40mm F1.2 Aspherical|已查询，报价未确认|—|—|
|voigtlander SEPTON 40mm F2 Aspherical|已查询，报价未确认|—|—|
|voigtlander NOKTON 50mm F1 Aspherical|已查询，报价未确认|—|—|
|voigtlander NOKTON 50mm F1.2 Aspherical|已查询，报价未确认|—|—|
|voigtlander APO-LANTHAR 50mm F2 Aspherical|已查询，报价未确认|—|—|
|voigtlander MACRO APO-LANTHAR 65mm F2 Aspherical|已查询，报价未确认|—|—|
|voigtlander PORTRAIT HELIAR 75mm F1.8|已查询，报价未确认|—|—|
|voigtlander NOKTON 75mm F1.5 Aspherical|已查询，报价未确认|—|—|
|voigtlander MACRO APO-LANTHAR 110mm F2.5|已查询，报价未确认|—|—|
|voigtlander NOKTON 28mm F1.5 Aspherical|已查询，报价未确认|—|—|
|zeiss Batis 18mm F2.8|已查询，报价未确认|—|—|
|zeiss Batis 25mm F2|已查询，报价未确认|—|—|
|zeiss Batis 40mm F2 CF|已查询，报价未确认|—|—|
|zeiss Batis 85mm F1.8|已查询，报价未确认|—|—|
|zeiss Batis 135mm F2.8|已查询，报价未确认|—|—|
|zeiss Loxia 25mm F2.4|已查询，报价未确认|—|—|
|zeiss Loxia 35mm F2|已查询，报价未确认|—|—|
|zeiss Loxia 50mm F2|已查询，报价未确认|—|—|
|zeiss Loxia 85mm F2.4|已查询，报价未确认|—|—|
|zeiss Loxia 21mm F2.8|已查询，报价未确认|—|—|
|zeiss Otus ML 35mm F1.4|已查询，报价未确认|—|—|
|zeiss Otus ML 50mm F1.4|已查询，报价未确认|—|—|
|zeiss Otus ML 85mm F1.4|已查询，报价未确认|—|—|
|laowa 10-18mm F4.5-5.6 Zoom Lens|已查询，报价未确认|—|—|
|laowa 100mm F2.8 2X Ultra-Macro APO Lens|已查询，报价未确认|—|—|
|laowa 100mm F2.8 Tilt-Shift 1X Macro|已查询，报价未确认|—|—|
|laowa 10mm F2.8 Zero-D FF Auto Focus Lens|已查询，报价未确认|—|—|
|laowa 11mm F4.5 FF RL Lens|已查询，报价未确认|—|—|
|laowa 12-24mm F5.6 Zoom|已查询，报价未确认|—|—|
|laowa 12mm F2.8 Lite Zero-D FF Auto Focus Lens|已查询，报价未确认|—|—|
|laowa 12mm F2.8 Zero-D Lens|已查询，报价未确认|—|—|
|laowa 14mm F4 FF RL Zero-D Lens|已查询，报价未确认|—|—|
|laowa 15mm F2 Zero-D Lens|已查询，报价未确认|—|—|
|laowa 15mm F4 1X Macro groothoek|已查询，报价未确认|—|—|
|laowa 15mm F4.5 0.5X Macro Groothoek|已查询，报价未确认|—|—|
|laowa 15mm F4.5 Zero-D Shift Lens|已查询，报价未确认|—|—|
|laowa 15mm F4.5R Zero-D Shift Lens|已查询，报价未确认|—|—|
|laowa 15mm F5 Cookie FF|已查询，报价未确认|—|—|
|laowa 17mm F4 Zero-D Shift|已查询，报价未确认|—|—|
|laowa 180mm F4.5 1.5x Ultra Macro APO Auto Focus lens|已查询，报价未确认|—|—|
|laowa 200mm F2 AF FF|已查询，报价未确认|—|—|
|laowa 20mm F4 Zero-D Shift Lens|已查询，报价未确认|—|—|
|laowa 24mm F14 2X Macro Probe Lens (STD)|已查询，报价未确认|—|—|
|laowa 25mm F2.8 2.5-5X Ultra-Macro Lens|已查询，报价未确认|—|—|
|laowa 35mm F2.8 Zero-D Tilt-Shift 0.5X Macro|已查询，报价未确认|—|—|
|laowa 55mm F2.8 Tilt-Shift 1X Macro|已查询，报价未确认|—|—|
|laowa 58mm F2.8 2X Ultra Macro APO|已查询，报价未确认|—|—|
|laowa 8-15mm F2.8 FF Zoom Fisheye|已查询，报价未确认|—|—|
|laowa 85mm F5.6 2X Ultra-Macro APO Lens|已查询，报价未确认|—|—|
|laowa 90mm F2.8 2X Ultra-Macro APO Lens|已查询，报价未确认|—|—|
|laowa 9mm F5.6 FF RL Lens|已查询，报价未确认|—|—|
|laowa Aksen 45mm F2.8 1-5X Ultra Macro APO|已查询，报价未确认|—|—|
|laowa Argus 28mm F1.2 FF lens|已查询，报价未确认|—|—|
|laowa Argus 35mm F0.95 FF|已查询，报价未确认|—|—|
|laowa Argus 45mm F0.95 FF|已查询，报价未确认|—|—|
|laowa 17mm F4 Zero-D Tilt-Shift|已查询，报价未确认|—|—|
|laowa Aksen 17.5mm F1.7 5-10X Ultra Macro APO|已查询，报价未确认|—|—|
|yongnuo FE 35mm F2 S DF DSM|已查询，报价未确认|—|—|
|yongnuo FE 50mm F1.8 S DF DSM|已查询，报价未确认|—|—|
|yongnuo FE 85mm F1.8 S DF DSM|已查询，保留原参考价|1999|[来源](https://www.szyongnuo.com/upload/file/202403/2026-03.pdf)|
|yongnuo FE 50mm F1.8 II Lite|已查询，报价未确认|—|—|
|yongnuo FE 85mm F1.8 S DF DSM（原版）|已查询，报价未确认|—|—|
|yongnuo FE 18mm F2.8 S DF VCM|已查询，报价未确认|—|—|
|meike AF 85mm F1.4 II|已查询，报价未确认|—|—|
|meike AF 85mm F1.8 II SE|已录入商家页面价|1049|[来源](https://item.jd.com/product/Tg6BklwZp-8389N_0DJ3tw.html)|
|meike AF 24mm F1.4 MIX|已查询，报价未确认|—|—|
|meike AF 35mm F2|已查询，报价未确认|—|—|
|meike AF 35mm F1.8 Pro|已查询，报价未确认|—|—|
|meike AF 85mm F1.8 Pro|已查询，报价未确认|—|—|
|meike AF 55mm F1.8 Pro|已查询，报价未确认|—|—|
|meike AF 85mm F1.4 MIX|已查询，报价未确认|—|—|
|meike AF 85mm F1.8|已查询，报价未确认|—|—|
|meike MF 50mm F1.2|已查询，报价未确认|—|—|
|meike MF 50mm F1.7|已查询，报价未确认|—|—|
|thypoch Voyager 24-50mm F2.8|已查询，报价未确认|—|—|
|thypoch Simera 28mm F1.4 ASPH.|已查询，报价未确认|—|—|
|thypoch Simera 35mm F1.4 ASPH.|已查询，报价未确认|—|—|
