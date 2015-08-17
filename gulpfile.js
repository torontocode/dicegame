var gulp          = require('gulp'),
    shell         = require('gulp-shell'),
    jshint        = require('gulp-jshint'),
    livereload    = require('gulp-livereload');

gulp.task('default', function() {
  return gulp.watch('app/**/*.js', function(obj) {
    livereload.listen({port:35728});
    gulp.src(['app/**/*.js', '!app/js/vendor/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(gulp.dest('dist/'));
    gulp.src(['app/index.html'])
      .pipe(gulp.dest('dist/'));
    gulp.src(['app/js/vendor/**/*.js'])
      .pipe(gulp.dest('dist/js/vendor'));
    gulp.src(['app/partials/**/*.html'])
      .pipe(gulp.dest('dist/partials/'))
      .pipe(livereload());
  });
});


gulp.task('serve', shell.task([
  'node ./server.js'
]));

gulp.task('lint', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});