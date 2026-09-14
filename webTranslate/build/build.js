const gulp = require('gulp');
const concat=require("gulp-concat");
const path=require("path");
const config=require("./config");
const del=require("del");
const checks=require("./check");

const resolveFile=function(filePath){
    return path.join(__dirname,'..',filePath);
}

function js(){ 
    return gulp.src([
            resolveFile(config.options.tmconfigPath),   //油猴脚本头
            resolveFile("build/baidu-config.js"),        //用户可编辑的百度翻译配置块
            resolveFile(config.options.bundlePath)])     //rollup 打包的脚本主体
        .pipe(concat("webTranslate.js"))
        .pipe(gulp.dest(resolveFile("dist")))
}
function removeFile(){
    return del([
            resolveFile("dist/webTranslate.bundle.js"),  //删除中间产物
            resolveFile("dist/webTranslate.dev.js")],{force:true});
}
exports.default=gulp.series(checks.check,config.build,js,removeFile);

