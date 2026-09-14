### Tampermonkey (TM) Script 油猴脚本
#### Tampermonkey (TM)简介
Tampermonkey 是一款免费的浏览器扩展和最为流行的用户脚本管理器，可以在与规则匹配的网页执行任何js脚本。它适用于 Chrome, Microsoft Edge, Safari, Opera Next, 和 Firefox。
##### Tampermonkey (TM)官网：[www.tampermonkey.net](http://www.tampermonkey.net/)

##### 本站提供的油猴脚本简介

- *goTopBottom (返回顶部和或底部)* [点此安装脚本](https://greasyfork.org/zh-CN/scripts/385225-%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8%E5%92%8C%E5%BA%95%E9%83%A8)
    - 返回顶部或底部，在网页右下角创建一个返回顶部和底部的按钮，点击按钮即可返回到顶部或底部。

- *getWebsiteImg (获取网站所有图片)* [点此安装脚本](https://greasyfork.org/zh-CN/scripts/388066-%E8%8E%B7%E5%8F%96%E7%BD%91%E7%AB%99%E6%89%80%E6%9C%89%E5%9B%BE%E7%89%87)
    - 获取网站上的所有图片，按住鼠标左键并且拖动鼠标选择或取消选择图片，并下载。

- *webTranslate(网页翻译助手)*[点此安装脚本](https://greasyfork.org/zh-CN/scripts/389784-%E7%BD%91%E9%A1%B5%E7%BF%BB%E8%AF%91%E5%8A%A9%E6%89%8B)
    - 自行选择谷歌翻译和有道词典翻译以及选择中文，英文，韩文，日文，法文等语言在网页上进行划词翻译和输入文本翻译。

#### ⭐ webTranslate 使用百度翻译前必读

`webTranslate` 的百度引擎需要你自己的 **百度翻译开放平台 AppID + API Key** 才能使用（AI 文本翻译接口，Bearer Token 鉴权）。

1. 到 [百度翻译开放平台](https://fanyi-api.baidu.com/) 登录 → 注册开发者 → (建议)实名认证；
2. 管理控制台 → **开发者信息**：复制 **AppID**，创建/复制 **API Key**；
3. 打开 `webTranslate/dist/webTranslate.js`（已编译产物），在文件开头的 `BAIDU_TRANSLATE_CONFIG` 中填入；或按 `webTranslate/README.md` 的"从源码构建"自行编译后填写。

> 详细注册 + 配置教程见：[webTranslate/README.md](webTranslate/README.md)。未配置时不发请求，面板会给出中文提示。

- *ifmRadio(iFM-网络收音机广播电台)*[点此安装脚本](https://greasyfork.org/zh-CN/scripts/411743-ifm-%E7%BD%91%E7%BB%9C%E6%94%B6%E9%9F%B3%E6%9C%BA%E5%B9%BF%E6%92%AD%E7%94%B5%E5%8F%B0)
    - FM网络收音机，广播电台在线收听。
