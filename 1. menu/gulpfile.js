var gulp = require('gulp');
    fs = require('fs');
    sass = require('gulp-sass');
    sassGlob = require('gulp-sass-glob');
    autoprefixer = require('gulp-autoprefixer');
    cssnano = require('gulp-cssnano');
    plumber = require('gulp-plumber');
    server = require('browser-sync').create();

    scssSrc = 'scss/main.scss';
    watchScss = 'scss/*.scss';
    cssOut = 'css';


gulp.task('styles', function () {
  return gulp.src(scssSrc)

    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 11', 'ios_saf 7', 'safari 7'],
      cascade: false
    }))
    .pipe(cssnano())   
    .pipe(gulp.dest(cssOut))
});

function reload(done) {
  server.reload();
  done();
}

function server(done) {
  server.init({
    server: {
      baseDir: './'
    }
  });
  done();
}


gulp.task('watch', function (){
  gulp.watch(watchScss, gulp.series('styles'));
  gulp.watch('*.html', gulp.series(reload));
  gulp.watch(watchScss, gulp.series(reload));
});