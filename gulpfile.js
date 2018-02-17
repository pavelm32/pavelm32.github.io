const gulp      = require('gulp');
const scss      = require('gulp-sass');
//const brwSync   = require('browser-sync');
//const aprfx     = require('gulp-autoprefixer');

const sassGlob = require('gulp-sass-glob');
const groupMediaQueries = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-cleancss');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const paths =  {
    src: './app/',
    build: './build/'
};

function styles() {
    return gulp.src(paths.src + 'sass/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(scss()) // { outputStyle: 'compressed' }
        // .pipe(aprfx(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(groupMediaQueries())
        .pipe(cleanCSS())
       // .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.build + 'css'))
}

function scripts() {

        return gulp.src([
            paths.src + 'js/jquery.min.js',
            paths.src + 'js/mobile-detect.min.js',
            paths.src + 'js/jquery.touchSwipe.min.js',
            paths.src + 'js/owl.carousel.min.js',
            paths.src + 'js/main.js'
        ])
            .pipe(plumber())
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify())
            .pipe(concat('main.js'))
            .pipe(gulp.dest(paths.build + 'js/'))

}

function htmls() {
    return gulp.src(paths.src + '*.html')
        .pipe(plumber())
        .pipe(gulp.dest(paths.build));
}

function clean() {
    return del(paths.build)
}

function css() {
    return gulp.src([
        paths.src + 'css/*.css'
    ]).pipe(gulp.dest(paths.build + 'css'));
}

function fonts() {
    return gulp.src(paths.src + 'fonts/**/*')
        .pipe(gulp.dest(paths.build + 'fonts'));
}

function img() {
    return gulp.src(paths.src + 'img/**/*')
        .pipe(gulp.dest(paths.build + 'img'));
}

function watch() {
    gulp.watch(paths.src + 'sass/**/*.scss', styles);
    gulp.watch(paths.src + 'js/*.js', scripts);
    gulp.watch(paths.src + '*.html', htmls);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: paths.build
        }
    });
    browserSync.watch(paths.build + '**/*.*', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.clean = clean;
exports.watch = watch;
exports.bdef = css;
exports.bdef = fonts;
exports.bdef = img;


gulp.task('build', gulp.series(
    clean,
    styles,
    scripts,
    htmls,
    css,
    fonts,
    img
    // gulp.parallel(styles, scripts, htmls)
));

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, scripts, htmls, css, fonts, img),
    gulp.parallel(watch, serve)
));

