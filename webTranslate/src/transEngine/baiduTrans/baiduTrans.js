import {Trans} from "../trans"

//读取用户在脚本开头 BAIDU_TRANSLATE_CONFIG 填写的百度翻译配置。
//源码中此处的 appid/apiKey 为空占位，真实的账号信息由使用者在编译产物顶部的
//BAIDU_TRANSLATE_CONFIG 中填写（模板见 build/baidu-config.js，说明见 README.md）。
function getUserConfig() {
    if (typeof BAIDU_TRANSLATE_CONFIG !== "undefined" && BAIDU_TRANSLATE_CONFIG) {
        return BAIDU_TRANSLATE_CONFIG;
    }
    return {};
}

//将待翻译文本按行拆分成多个请求块，每个请求块不超过maxChars个字符，
//避免超出接口单次请求的长度限制(约6000字符)
function splitTextByChars(text, maxChars) {
    var lines = text.split("\n");
    var chunks = [];
    var current = [];
    var currentLen = 0;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.length > maxChars) {
            //先提交已积累的内容
            if (current.length > 0) {
                chunks.push(current.join("\n"));
                current = [];
                currentLen = 0;
            }
            //超长行按字符硬切
            var rest = line;
            while (rest.length > maxChars) {
                chunks.push(rest.substring(0, maxChars));
                rest = rest.substring(maxChars);
            }
            if (rest !== "") {
                current = [rest];
                currentLen = rest.length;
            }
            continue;
        }
        var newLen = currentLen + (current.length > 0 ? 1 : 0) + line.length;
        if (newLen > maxChars) {
            chunks.push(current.join("\n"));
            current = [line];
            currentLen = line.length;
        } else {
            currentLen = newLen;
            current.push(line);
        }
    }
    if (current.length > 0) {
        chunks.push(current.join("\n"));
    }
    return chunks;
}

//百度翻译(AI文本翻译接口 https://fanyi-api.baidu.com/ait/api/aiTextTranslate)
//鉴权方式：请求头 Authorization: Bearer <API Key>
//注意：请将appid和apiKey替换成你自己的百度翻译开放平台账号信息(https://fanyi-api.baidu.com)
export var baiduTrans = {
    code: "bd",
    codeText: "百度",
    //百度翻译开放平台的AppID（占位，请勿在此填写，使用者在编译产物顶部的 BAIDU_TRANSLATE_CONFIG 中配置）
    appid: "",
    //API Key(Bearer Token鉴权，占位，同上)
    apiKey: "",
    //AI文本翻译API地址
    apiUrl: "https://fanyi-api.baidu.com/ait/api/aiTextTranslate",
    defaultOrigLang: "auto",         //默认源语言
    defaultTargetLang: "zh",         //默认目标语言
    langList: {"auto": "自动检测","zh": "中文","cht": "繁体中文","en": "英语","jp": "日语","kor": "韩语","fra": "法语","spa": "西班牙语","pt": "葡萄牙语","it": "意大利语","ru": "俄语","vie": "越南语","de": "德语","ara": "阿拉伯语"},
    //返回实际生效的配置（优先使用使用者在 BAIDU_TRANSLATE_CONFIG 中填写的值）
    GetConfig: function () {
        var userCfg = getUserConfig();
        return {
            appid: userCfg.appid || this.appid,
            apiKey: userCfg.apiKey || this.apiKey
        };
    },
    Execute: function (h_onloadfn) {
        var cfg = this.GetConfig();
        if (!cfg.appid || !cfg.apiKey) {
            //未配置百度翻译账号时给出提示，而不是发无效请求
            console.error("未配置百度翻译AppID或API Key，请参考README在脚本开头的BAIDU_TRANSLATE_CONFIG中填写。");
            Trans.transResult.trans = ["未配置百度翻译 AppID / API Key，请在脚本开头 BAIDU_TRANSLATE_CONFIG 中填写（获取方法见 README）"];
            Trans.transResult.orig = [""];
            Trans.transResult.origLang = "";
            h_onloadfn();
            return;
        }
        var chunks = splitTextByChars(Trans.transText, 5000);
        var transAll = [];
        var origAll = [];
        var origLang = "";
        var index = 0;
        var self = this;

        var requestNext = function () {
            if (index >= chunks.length) {
                Trans.transResult.trans = transAll;
                Trans.transResult.orig = origAll;
                Trans.transResult.origLang = origLang;
                h_onloadfn();
                return;
            }
            var chunk = chunks[index];
            index++;
            self.RequestTranslate(chunk, function (data) {
                if (data && data.trans_result) {
                    for (var i = 0; i < data.trans_result.length; i++) {
                        origAll.push(data.trans_result[i].src);
                        transAll.push(data.trans_result[i].dst);
                    }
                    if (data.from) {
                        origLang = data.from;
                    }
                }
                if (index < chunks.length) {
                    //分块请求串行发送，留出间隔避免触发频率限制
                    setTimeout(requestNext, 300);
                } else {
                    requestNext();
                }
            });
        };
        requestNext();
    },
    RequestTranslate: function (chunk, callback) {
        var cfg = this.GetConfig();
        var datas = {
            appid: cfg.appid,
            from: Trans.transOrigLang,
            to: Trans.transTargetLang,
            q: chunk
        };
        GM_xmlhttpRequest({
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + cfg.apiKey
            },
            url: this.apiUrl,
            data: JSON.stringify(datas),
            onload: function (r) {
                var data = JSON.parse(r.responseText);
                if (data.error_code) {
                    console.error("百度翻译API错误: " + data.error_code + " " + data.error_msg);
                }
                callback(data);
            },
            onerror: function (e) {
                console.error(e);
                callback(null);
            }
        });
    }
}