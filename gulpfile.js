const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

gulp.task(
    'default',
    ['styles', 'copy-html', 'copy-jasmine', 'scripts-dist', 'copy-fonts'],
    function() {
      gulp.watch('css/**/*.css', ['styles']);
      gulp.watch('js/**/*.js', ['lint']);
      browserSync.init({
        server: './',
      });
    }
);

gulp.task('dist', [
  'styles',
  'copy-html',
  'copy-jasmine',
  'scripts-dist',
  'copy-fonts',
]);

gulp.task('styles', function() {
  gulp
      .src('css/**/*.css')
      .pipe(
          autoprefixer({
            browsers: ['last 2 versions'],
          })
      )
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});

gulp.task('lint', function() {
  return gulp
      .src(['js/**/*.js'])
      .pipe(eslint({fix: 'true'}))
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('copy-html', function() {
  return gulp.src('./index.html').pipe(gulp.dest('./dist'));
});

gulp.task('copy-jasmine', function() {
  return gulp.src('jasmine/**/*.*').pipe(gulp.dest('dist/jasmine'));
});

gulp.task('scripts-dist', function() {
  return gulp
      .src('js/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-fonts', function() {
  return gulp.src('fonts/**/*.*').pipe(gulp.dest('dist/fonts'));
});
