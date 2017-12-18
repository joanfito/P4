var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var htmlmin = require('gulp-html-minifier2');

gulp.task('html', function(){
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
});

gulp.task('css', function(){
  return gulp.src('css/*.css')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('default', [ 'html', 'css' ]);
