var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var htmlmin = require('gulp-html-minifier');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('html', function() {
  gulp.src('app/view/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'))
});

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
});

gulp.task('default', [ 'html', 'css' ]);