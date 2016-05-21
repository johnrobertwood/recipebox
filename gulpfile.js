var gulp = require('gulp');
var sass = require('gulp-sass')
var react = require('gulp-react');

var path = {
  HTML: 'src/index.html',
  ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/sass/*.scss', 'src/index.html'],
  JS: ['src/js/*.js', 'src/js/**/*.js'],
  SASS: ['src/sass/*.scss'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist'
};

gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST + '/js/'));
});

gulp.task('styles', function() {
  gulp.src(path.SASS)
    .pipe(sass())
    .pipe(gulp.dest(path.DEST + '/css/'));
})

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform', 'styles', 'copy']);
});

gulp.task('default', ['watch']);