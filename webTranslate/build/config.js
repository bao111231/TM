const rollup=require("rollup");
const path=require("path");

const resolveFile=function(filePath){
    return path.join(__dirname,'..',filePath);
}
//配置参数
const options={
    //源文件
    srcPath:"src/webTranslate.js",
    //rollup打包后的中间文件（不含脚本头，随后与脚本头/配置块合并为最终产物）
    bundlePath:"dist/webTranslate.bundle.js",
    //最终编译产物
    distPath:"dist/webTranslate.js",
    //TM配置
    tmconfigPath:"src/webTranslate.tmconfig.js",
}

const inputOptions={
    input:resolveFile(options.srcPath),
}
const outputOptions={
    output:{
        file:resolveFile(options.bundlePath),
        format:"iife"
    },
}

async function build(){
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}



module.exports={
    //inputOptions:inputOptions,
    //outputOptions:outputOptions,
    build:build,
    options:options
}
