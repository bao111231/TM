### Tampermonkey (TM) Script 油猴脚本
#### Tampermonkey (TM)简介
Tampermonkey 是一款免费的浏览器扩展和最为流行的用户脚本管理器，可以在与规则匹配的网页执行任何js脚本。它适用于 Chrome, Microsoft Edge, Safari, Opera Next, 和 Firefox。
##### Tampermonkey (TM)官网：[www.tampermonkey.net](http://www.tampermonkey.net/)

##### 本站提供的油猴脚本简介

- *webTranslate (网页翻译助手)* —— 划词翻译 / 文本翻译，默认百度翻译（AI 文本翻译接口），适配 Steam（配合 Watt Toolkit 使用）
    - [下载编译版 v1.4.0](https://github.com/bao111231/TM/releases/latest/download/webTranslate.js)
    - **安装**
        1. 下载编译好的版本：点击上面的链接下载 `webTranslate.js`
        2. 到[百度翻译开放平台](https://fanyi-api.baidu.com/)注册开发者并开通翻译服务，在"开发者信息"获取 **AppID** 和 **API Key**
        3. 用记事本打开下载的脚本，在开头的 `BAIDU_TRANSLATE_CONFIG` 中填入你的 AppID / API Key，保存
        4. 打开 **Watt Toolkit**（原 Steam++）→ 脚本配置 → 右上角 **导入**，选择填好配置的脚本文件
        5. 开启 **Steam 社区加速**，刷新 Steam 页面即可使用（划词翻译自动生效）
    - **配置百度翻译**
        1. 打开 <https://fanyi-api.baidu.com/>，用百度账号登录，注册为开发者（建议完成实名认证）
        2. 管理控制台 → **开发者信息**：复制 **AppID**，创建或复制 **API Key**
        3. 用记事本打开脚本，在文件开头找到 `var BAIDU_TRANSLATE_CONFIG = { appid: "", apiKey: "" };`，把 `appid` 和 `apiKey` 改成你自己的值，保存即可
        4. 漏填/填错时翻译面板会给出中文提示；API Key 等同密码，请勿泄露，泄露后请到控制台重置
    - **更新记录**
        - 2026/9  v1.4.0  百度翻译接入 AI 文本翻译接口（Bearer Token 鉴权），AppID / API Key 可配置，适配 Watt Toolkit 脚本导入
    - **项目地址**
        - 原作者（Johnny Li）：[zyufstudio/TM](https://github.com/zyufstudio/TM/tree/master/webTranslate)
        - 本分支（百度AI文本翻译接口改造）：[bao111231/TM webtranslate-baidu-api](https://github.com/bao111231/TM/tree/webtranslate-baidu-api)

- *goTopBottom (返回顶部和或底部)* [点此安装脚本](https://greasyfork.org/zh-CN/scripts/385225-%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8%E5%92%8C%E5%BA%95%E9%83%A8)
    - 返回顶部或底部，在网页右下角创建一个返回顶部和底部的按钮，点击按钮即可返回到顶部或底部。

- *getWebsiteImg (获取网站所有图片)* [点此安装脚本](https://greasyfork.org/zh-CN/scripts/388066-%E8%8E%B7%E5%8F%96%E7%BD%91%E7%AB%99%E6%89%80%E6%9C%89%E5%9B%BE%E7%89%87)
    - 获取网站上的所有图片，按住鼠标左键并且拖动鼠标选择或取消选择图片，并下载。

- *ifmRadio(iFM-网络收音机广播电台)* [点此安装脚本](https://greasyfork.org/zh-CN/scripts/411743-ifm-%E7%BD%91%E7%BB%9C%E6%94%B6%E9%9F%B3%E6%9C%BA%E5%B9%BF%E6%92%AD%E7%94%B5%E5%8F%B0)
    - FM网络收音机，广播电台在线收听。
