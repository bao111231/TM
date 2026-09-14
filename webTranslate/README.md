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

> 注意：百度翻译必须填写你自己的账号信息后才能使用，见下方"配置百度翻译"章节。

---

## ⭐ 配置百度翻译（必看）

百度翻译默认引擎走**百度翻译开放平台 AI 文本翻译接口**（`https://fanyi-api.baidu.com/ait/api/aiTextTranslate`），鉴权方式为 `Authorization: Bearer <API Key>`，需要你自己的 **AppID** 和 **API Key**，否则无法使用百度翻译。

### 第 1 步：注册开发者并开通服务

1. 用浏览器打开百度翻译开放平台：<https://fanyi-api.baidu.com/>，点击页面右上角登录（使用百度账号即可，没有就先注册一个）；
2. 登录后按页面提示完善开发者信息，注册成为开发者（个人开发者即可，免费，一般立刻通过）；
3. 建议顺手完成**实名认证**：个人认证后可解锁更高免费额度（标准版约 5 万字符/月，高级版约 100 万字符/月，都免费，认证仅为提高额度）；
4. 进入 **管理控制台 → 服务/总览**，开通翻译服务（选择"通用文本翻译 / AI 文本翻译"接口）。

### 第 2 步：获取 AppID 和 API Key

1. 在管理控制台左侧或顶部进入 **开发者信息** 页面；
2. 复制你的 **AppID**（一串数字，例如 `20260909002681800`）；
3. 在同一页面找到 **API Key**：
   - 若已创建过：直接复制那一串字母数字；
   - 若没有：点击创建 API Key（Bearer Token 鉴权使用），创建后复制；
4. 妥善保存。**API Key 等同密码，泄露后立即到控制台重置**，百度官方不会以任何理由索要。

> 如果你之前开通过旧版"通用翻译 API"，拿到的是 AppID + 密钥（secret）——本脚本用的是新版 AI 文本翻译接口，需要的是 AppID + **API Key** 这一对，请以"开发者信息"页展示为准。

### 第 3 步：把配置填进脚本

打开 `dist/webTranslate.js`，在文件**开头**（`// ==UserScript==` 头之后）找到配置块：

```js
var BAIDU_TRANSLATE_CONFIG = {
    appid: "",     // 你的百度翻译 AppID
    apiKey: ""     // 你的百度翻译 API Key(Bearer Token)
};
```

把 `appid` 和 `apiKey` 改成你自己的值：

```js
var BAIDU_TRANSLATE_CONFIG = {
    appid: "20260909002681800",          // 举例：你的真实 AppID
    apiKey: "ABCdef1234567890xyz"        // 举例：你的真实 API Key
};
```

保存后**刷新浏览器页面**即生效。

- 填错了或漏填：翻译时面板会显示"未配置百度翻译 AppID / API Key"的中文提示，不会发无效请求；
- 想切换回有道/谷歌：不用填任何东西，在翻译面板右上角或油猴菜单 → 设置里切换引擎即可。

### 第 4 步：验证是否成功

随便选中一段英文 → 点击弹出的翻译图标 → 如果在面板里看到中文译文，说明配置成功。仍报"未配置"提示，请检查 AppID / API Key 是否复制完整（前后不要有多余空格）、文件是否保存。

### 补充说明

- **免费额度**：标准版约 5 万字符/月、QPS 1（每秒 1 次）；个人日常划词翻译足够。超额会报 54004/54003 等错误码，此时需到控制台充值或换账号；
- **从源码构建时怎么配置**：源码中默认占位为空，构建时 `build/baidu-config.js` 会作为可编辑配置块注入到编译产物开头。可以改这个文件后重新构建，也可以构建完直接改 `dist/webTranslate.js` 开头的配置块（推荐，重新构建会被覆盖）。

---

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