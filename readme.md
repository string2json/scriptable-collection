# scriptable-collection

个人收集的 Loon 代理插件、rewrite JS 脚本、Scriptable 小组件等。

## loon/

Loon 代理客户端的 `.plugin` 插件文件。

所有 plugin 均使用 Loon 正确语法:`[Script] http-request / http-response` + `[Rewrite]` + `[Mitm]`,非 Surge 的 `script-request-header` 旧语法。

### WeChatMiniPrograms_AdBlock.plugin

**马上充小程序去广告** —— 针对佛山商捷"马上充"充电小程序的广告拦截。

- **广告平台**:易电联(`yidianlingyi.cn`)
- **拦截方式**:DNS 层域名拦截,不需要 MitM
- **核心规则**:`api.yidianlingyi.cn` → REJECT-DICT(广告数据主 API)

原理:小程序调用 `universalAdQuery` 获取广告 JSON,我们直接返回空对象,小程序拿不到广告数据就不会加载图片。

### CalculatorHDPro_Unlock.plugin

**计算器 HD 解锁会员** —— 破解 `www.40sishi.com` App 的 Pro 版会员状态。

- **触发规则**:拦截 `/user/profile` 响应,伪造 `vipState`
- **MitM**:需要,plugin 已自动配置 hostname
- **脚本路径**:`rewrite/CalculatorHDPro/index.js`(本仓库维护)
- **上游**:https://github.com/yqc007/QuantumultX/blob/master/CalculatorHDProCrack.js

### XuanTu_AI_Unlock.plugin

**炫图 AI 画图解锁会员** —— 自动注册临时账号、解锁 AI 功能、去水印。

- **核心脚本**:xt.js(自动注册拿 token) + xt2.js(注入 header) + xt3.js(伪造 userInfo)
- **运行机制**:每次 App 访问 `/creation/myworks` 时自动触发
- **MitM**:需要,plugin 已自动配置 hostname
- **脚本来源**:github.com/ios151/Rewrite(远程 raw,不在本仓库)

### ChinaUnicom_Cookie.plugin

**中国联通 Cookie 自动获取** —— 打开联通 App 首页流量查询时自动捕获 Cookie(JSESSIONID)。

- **触发规则**:匹配 `smartwisdomCommon` / `smartwisdomCommonNew` 请求
- **MitM**:需要,plugin 已自动配置 hostname
- **脚本路径**:`rewrite/10010/index.js`(本仓库维护)
- **上游**:https://github.com/dompling/Script/tree/master/10010

### SouthernPower_95598.plugin

**南网在线 95598 Token 自动获取** —— 支持 App 和微信小程序双端。

- **触发规则**:匹配 `queryBindEleUsers` 请求,从 request header 读取 `x-auth-token`
- **双端域名**:`95598.csg.cn`(App) + `weixin.csg.cn`(微信小程序)
- **MitM**:需要,plugin 已自动配置 hostname
- **脚本路径**:`rewrite/95598/get_95598_token.js`(本仓库维护)
- **上游**:https://github.com/95du/scripts/blob/master/rewrite/get_95598_token.js

### 12123_token.plugin

**交管12123 Token 自动获取** —— 打开支付宝交管12123小程序自动捕获 `verifyToken` / `sign`。

- **触发规则**:匹配 `miniappcsfw.122.gov.cn:8443/openapi/invokeApi/business/biz`
- **脚本逻辑**:从 `request.body` 提取 sign,找到 `biz.user.msg.subscribe` API 时保存
- **MitM**:需要,plugin 已自动配置 hostname
- **脚本路径**:`rewrite/12123/getBody_12123.js`(本仓库维护)
- **上游**:https://github.com/95du/scripts/blob/master/rewrite/getBody_12123.js
- **组件**:搭配 `script/交管12123.scriptable`(Scriptable 小组件使用)

### 12123.js

旧版脚本(从 Env 框架看是早期版本),已废弃,使用 `rewrite/12123/getBody_12123.js`。

## rewrite/

Surge / Loon / QX 三端通用的 rewrite JS 脚本。

| 脚本 | 用途 | 框架 |
|---|---|---|
| `xt.js` | 炫图自动注册核心 | chavy Env |
| `10010/index.js` | 中国联通 Cookie 获取 | dompling API |
| `95598/get_95598_token.js` | 南网在线 Token 获取 | chavy Env |
| `12123/getBody_12123.js` | 交管12123 Token 获取(支付宝小程序) | chavy Env |
| `CalculatorHDPro/index.js` | 计算器 HD 解锁会员(伪造 vipState) | 原生 |

## script/

Scriptable(iOS)小组件脚本。

- `TodayOilPrice.scriptable` —— 今日油价小组件(继承 DmYY 框架,支持小/中/大尺寸)
- `交管12123.scriptable` —— 交管12123 查违章/查分/看驾照,需配合 `12123_token.plugin` 先获取 verifyToken

## 使用

Loon 设置 → 插件 → 导入 `.plugin` 文件,或在主配置中订阅 raw URL:

```
[Plugin]
https://raw.githubusercontent.com/string2json/scriptable-collection/main/loon/WeChatMiniPrograms_AdBlock.plugin, enabled=true
```

订阅地址统一格式:
```
https://raw.githubusercontent.com/string2json/scriptable-collection/main/loon/<文件名>.plugin
```

## img/

Loon plugin 图标资源目录。所有 plugin 的 `#!icon=` 都指向本目录下的文件,避免上游删库导致图标丢失。

| 文件 | 对应 plugin |
|---|---|
| `mascc.png` | WeChatMiniPrograms_AdBlock |
| `calculatorhd.png` | CalculatorHDPro_Unlock |
| `xuantu.png` | XuanTu_AI_Unlock |
| `unicom.png` | ChinaUnicom_Cookie |
| `95598.png` | SouthernPower_95598 |
| `12123.png` | 12123_token |

## json/

通用 JSON 配置片段。

## 维护日志

| 日期 | 变更 |
|---|---|
| 2026-10-16 | 全部 plugin 新增 `#!icon=`,建立 `img/` 目录统一维护图标,避免上游删库导致图标丢失 |
| 2026-10-16 | 12123 plugin 修复:script-path 从已删除的 `getToken_12123.js` 改为 `getBody_12123.js`;MitM 从 `sni-hosts` 改为 `hostname`;保存最新 rewrite 脚本 |
| 2026-10-16 | 全部 plugin 从 `[Rewrite] script-request-header`(Surge 语法)迁移为 `[Script] http-request`(Loon 正确语法) |
| 2026-10-16 | 95598 plugin 补充 `weixin.csg.cn` 域名(微信小程序实际使用) |
| 2026-10-16 | 新增炫图、联通、95598 三个 plugin |
| 2026-10-14 | 马上充 plugin 从 `image.yidianlingyi.cn` 改为 `api.yidianlingyi.cn`(广告数据主 API) |
