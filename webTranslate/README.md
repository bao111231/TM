# 网页翻译助手 (webTranslate)

划词翻译、输入文本翻译的油猴（Tampermonkey / Violentmonkey）脚本。

- 划词翻译、文本翻译，适配所有网站
- 翻译引擎：**百度翻译**（AI 文本翻译接口）、有道、谷歌
- 支持中文简体、繁体、英文、日文、韩文、法文、西班牙文、德文、俄文等十余种语言
- 默认翻译引擎为百度翻译

## 安装

1. 浏览器安装油猴扩展（Tampermonkey / Violentmonkey）
2. 打开 `dist/webTranslate.js`（若仓库未附带，请按下方"从源码构建"自行编译）
3. 复制全部内容，在油猴中"新建脚本"粘贴并保存；或直接把文件拖入油猴安装

> 注意：百度翻译必须填写你自己的账号信息后才能使用，见下方配置说明。

## ⭐ 配置百度翻译（必看）

百度翻译默认引擎走**百度翻译开放平台 AI 文本翻译接口**（`https://fanyi-api.baidu.com/ait/api/aiTextTranslate`），需要你自己的 **AppID** 和 **API Key**（Bearer Token 鉴权），否则无法使用百度翻译。

### 1. 获取 AppID 和 API Key

1. 打开 [百度翻译开放平台](https://fanyi-api.baidu.com/) ，用百度账号登录；
2. 按页面指引注册为开发者并完成实名认证（个人开发者即可，免费）；
3. 在"管理控制台"中开通翻译服务（通用文本翻译 / AI 文本翻译）；
4. 进入 **管理控制台 → 开发者信息**：
   - 复制你的 **AppID**（一串数字）；
   - 创建 / 查看 **API Key**（Bearer Token 使用的密钥，一串字母数字），已创建过则直接复制；
5. 妥善保管，不要泄露，泄露后可在控制台重置。

### 2. 把配置填进脚本

打开 `dist/webTranslate.js`，在文件**开头**（`// ==UserScript==` 头之后）找到：

```js
var BAIDU_TRANSLATE_CONFIG = {
    appid: "",     // 你的百度翻译 AppID
    apiKey: ""     // 你的百度翻译 API Key(Bearer Token)
};
```

把 `appid` 和 `apiKey` 改成你自己的值，保存后刷新页面即可。**没填写时会给出中文提示，不会报网络错误。**

### 3. 从源码构建时如何配置

源码中不做配置（占位为空），构建时 `build/baidu-config.js` 会作为可编辑配置块注入到编译产物开头。

- 修改 `build/baidu-config.js` 中的 `appid` / `apiKey` 后执行构建；
- 或构建完成后直接改 `dist/webTranslate.js` 开头的配置块（推荐，重新构建会被覆盖）。

## 其他翻译引擎

- **有道 / 谷歌**：无需配置账号，但属于破解网页接口的方式，可能随时失效；
- 在脚本设置（油猴菜单 → 设置）或翻译面板右上角的引擎下拉框中切换。

## 从源码构建

需要 Node.js。

```bash
cd webTranslate
npm install
npx gulp -f ./build/build.js
```

编译产物输出到 `dist/webTranslate.js`（已包含油猴脚本头与用户配置块）。`dist/` 目录默认已被 `.gitignore` 排除，不会提交到仓库。

## 页面结构

```
src/
├── webTranslate.js             # 主程序入口
├── webTranslate.tmconfig.js    # 油猴脚本头(版本/授权/依赖CDN)
├── lib/                        # 面板、设置、工具函数
└── transEngine/
    ├── googleTrans/            # 谷歌翻译
    ├── youdaoTrans/            # 有道翻译
    └── baiduTrans/             # 百度翻译(AI文本翻译接口 + Bearer鉴权)
build/
├── build.js                    # gulp 构建脚本
├── baidu-config.js             # ★ 用户配置块模板（编译时注入产物开头）
└── config.js                   # 源码/产物路径等
```

## 更新记录

- 2026/9  v1.4.x  百度翻译接入 AI 文本翻译接口（`ait/api/aiTextTranslate`），改用 AppID + API Key（Bearer Token）鉴权；AppID/API Key 改为脚本开头可编辑配置块，未配置时给出提示
- 2022/3/22  v1.3.3  修复有道翻译只能翻译前面一部分内容
- 2021/11/3  v1.3.1  修复谷歌翻译接口不能使用问题
- 2020/4/3   v1.2.0   加入百度翻译

## 项目地址

- https://github.com/zyufstudio/TM/tree/master/webTranslate