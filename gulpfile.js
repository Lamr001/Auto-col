

const {src, dest, parallel, watch, series}    = require("gulp"),
      sass                                    = require("gulp-sass"),
      pug                                     = require("gulp-pug"),
      sync                                    = require("browser-sync");

function compileHtml() {

    return src("src/template/*.pug")
        .pipe(pug({pretty:true}))
        .pipe(dest("src/"))
        .pipe(sync.reload({stream:true}))
};


function compileCss() {

    return src("src/style/sass/*.sass")
        .pipe(sass())
        .pipe(dest("src/style"))
        .pipe(sync.reload({stream:true}))
};

function pagesync() {
    sync({
        server:{
            baseDir:"./",
            directory: true
        }
    });
};

function watchCompile() {
    watch("./src/template/*.pug", compileHtml);
    watch("./src/style/sass/*.sass", compileCss);
};

exports.compileHtml = compileHtml;
exports.compileCss  = compileCss;
exports.pagesync    = pagesync;
exports.watchCompile = watchCompile;
exports.default     = series(parallel(compileHtml, compileCss), parallel(pagesync, watchCompile));