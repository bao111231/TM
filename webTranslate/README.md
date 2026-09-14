## 安装

1. 下载编译好的版本：[webTranslate.js（v1.4.0）](https://github.com/bao111231/TM/releases/latest/download/webTranslate.js)
2. 到[百度翻译开放平台](https://fanyi-api.baidu.com/)注册开发者并开通翻译服务，在"开发者信息"获取 **AppID** 和 **API Key**（见下方配置说明）
3. 用记事本打开下载的脚本，在开头的 `BAIDU_TRANSLATE_CONFIG` 中填入你的 AppID / API Key，保存
4. 打开 **Watt Toolkit**（原 Steam++）→ 脚本配置 → 右上角 **导入**，选择填好配置的脚本文件
5. 开启 **Steam 社区加速**，刷新 Steam 页面即可使用（划词翻译自动生效）

## 配置百度翻译

1. 打开 <https://fanyi-api.baidu.com/>，用百度账号登录，注册为开发者（建议完成实名认证）
2. 管理控制台 → **开发者信息**：复制 **AppID**，创建或复制 **API Key**
3. 用记事本打开脚本，在文件开头找到这一段：

```js
var BAIDU_TRANSLATE_CONFIG = {
    appid: "",     // 你的百度翻译 AppID
    apiKey: ""     // 你的百度翻译 API Key(Bearer Token)
};
```

4. 把 `appid` 和 `apiKey` 改成你自己的值，保存即可。漏填/填错时翻译面板会给出中文提示

> API Key 等同密码，请勿泄露，泄露后请到控制台重置。

## 更新记录

- 2026/9  v1.4.0  百度翻译接入 AI 文本翻译接口（Bearer Token 鉴权），AppID / API Key 可配置，适配 Watt Toolkit 脚本导入

## 项目地址

- 原作者（Johnny Li）：[zyufstudio/TM](https://github.com/zyufstudio/TM/tree/master/webTranslate)
- 本分支（百度AI文本翻译接口改造）：[bao111231/TM webtranslate-baidu-api](https://github.com/bao111231/TM/tree/webtranslate-baidu-api)
