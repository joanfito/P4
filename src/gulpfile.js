var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var htmlmin = require('gulp-html-minifier2');
var jsObfuscator = require('gulp-javascript-obfuscator');
var beautify = require('gulp-beautify');

gulp.task('html', function(){
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../build'));
});

gulp.task('css', function(){
  return gulp.src('css/*.css')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('../build/css'));
});

gulp.task('js', function () {
  return gulp.src('js/*.js')
    .pipe(beautify({indent_size: 2}))
    .pipe(jsObfuscator())
    .pipe(gulp.dest('../build/js'));
});

gulp.task('images', function () {
  return gulp.src('media/images/*')
  .pipe(gulp.dest('../build/media/images'));
});

gulp.task('videos', function () {
  return gulp.src('media/videos/*')
  .pipe(gulp.dest('../build/media/videos'));
});

gulp.task('music', function () {
  return gulp.src('media/music/*')
  .pipe(gulp.dest('../build/media/music'));
});

gulp.task('default', [ 'html', 'css', 'js', 'images', 'videos', 'music' ]);
