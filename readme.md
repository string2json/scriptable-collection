# scriptable-collection

个人收集的 Loon 插件、JSON 配置等。

## loon/

Loon 代理客户端的 `.plugin` 插件文件。

### WeChatMiniPrograms_AdBlock.plugin

**马上充小程序去广告** —— 针对佛山商捷"马上充"充电小程序的广告拦截。

- **广告平台**:易电联(`yidianlingyi.cn`)
- **拦截方式**:DNS 层域名拦截,不需要 MitM
- **核心规则**:`api.yidianlingyi.cn` → REJECT-DICT(广告数据主 API)

原理:小程序调用 `universalAdQuery` 获取广告 JSON,我们直接返回空对象,小程序拿不到广告数据就不会加载图片。

### 12123_token.plugin + 12123.js

12123 App 相关的 Token 获取/解析脚本。

## 使用

Loon 设置 → 插件 → 导入 `.plugin` 文件,或在主配置中订阅 raw URL:

```
[Plugin]
https://raw.githubusercontent.com/string2json/scriptable-collection/main/loon/WeChatMiniPrograms_AdBlock.plugin, enabled=true
```

## json/

通用 JSON 配置片段。
