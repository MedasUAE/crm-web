const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require("browser-sync").create();

const scripts = require("./scripts");
const styles = require("./styles");

let devMode = false;

// CSS 
gulp.task('css', ()=>{
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.reload({
            stream:true
        }));
});

// JS
gulp.task('js', ()=>{
    gulp.src(scripts)
        .pipe(concat("scripts.js"))
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.reload({
            stream:true
        }));
});

//HTML
gulp.task('html', ()=>{
    gulp.src("./src/templates/**/*.html")
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.reload({
            stream:true
        }));
});

//IMAGES
gulp.task('images', function() {
    gulp.src(['./src/css/**/*.{gif,jpg,png,svg}'])
        .pipe(gulp.dest('dist/css/'));
});

//BUILD
gulp.task('build',()=>{
    gulp.start(['css','images','js','html']);
});

//BROWSER SYNC
gulp.task('browser-sync',()=>{
    browserSync.init(null,{
        open:false,
        server:{
            baseDir:'dist'
        }
    })
});

//START
gulp.task('start', ()=>{
    devMode = true;
    gulp.start(['build', 'browser\-sync']);
    gulp.watch("./src/css/**/*.css",['css']);
    gulp.watch("./src/js/**/*.js",['js']);
    gulp.watch("./src/templates/**/*.html",['html']);
});