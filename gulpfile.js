var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var htmlmin = require('gulp-html-minifier');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync').create();

// HTML
gulp.task('html', function() {
  gulp.src('app/view/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream())
});

// SCSS to CSS
gulp.task('css', function(){
  return gulp.src('app/styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('bundle.css'))
    .pipe(minifyCSS())
    .pipe(autoprefixer({
    	browsers: ['last 2 versions'],
    	cascade: false
    }))
    .pipe(gulp.dest('dist/style'))
    .pipe(browsersync.stream())
});

// BrowserSync
gulp.task('browser-sync', function() {
    browsersync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

// Static Server + watching scss/html files
gulp.task('serve', ['css', 'html'], function() {

    browsersync.init({
        server: "./dist"
    });

    gulp.watch("app/styles/*.scss", ['css']);
    gulp.watch("app/view/*.html", ['html']);
});

gulp.task('default', [ 'serve' ]);