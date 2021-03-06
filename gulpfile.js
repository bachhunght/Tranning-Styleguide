//Gulp files.
var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  twig = require('gulp-twig'),
  compass = require('gulp-compass'),
  prettify = require('gulp-html-prettify'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename');

  // BrowserSync.
  gulp.task('browsersync', function () {
    "use strict";
    browserSync({
      notify: false,
      server:{
        baseDir: '.'
      }
    });
  });

  // Compass Tasks.
  gulp.task('compass', function() {
    "use strict";
    gulp.src('scss/styles.scss')
      .pipe(plumber())
      .pipe(compass({
        config_file: './config.rb',
        css: 'css',
        sass: 'scss',
        require: ['susy']
      }))

      .pipe(gulp.dest('css/'))
      .pipe(reload({stream:true}));
  });

  // Twig Tasks.
  gulp.task('twig', function() {
    "use strict";
    gulp.src('template/*.twig')
      .pipe(twig())
      .pipe(prettify({indent_char: ' ', indent_size: 2}))
      .pipe(gulp.dest('.'))
      .pipe(reload({stream:true}));
  });

  // Twig Components Tasks.
  gulp.task('twig_components', function() {
    "use strict";
    gulp.src('components/**/*.twig')
      .pipe(twig())
      .pipe(prettify({indent_char: ' ', indent_size: 2}))
      .pipe(gulp.dest('components/'))
      .pipe(reload({stream:true}));
  });

  // Auto run when change.
  gulp.task('watch', function(){
    "use strict";
    gulp.watch('js/**/*.js', reload);
    gulp.watch('scss/**/*.scss', ['compass'],reload);
    gulp.watch('components/**/*.twig', ['twig_components'],reload);
    gulp.watch(['template/*.twig','template/layout/**/*.twig','components/**/*.html'], ['twig'],reload);
  });

// Default Tasks
gulp.task('default', ['compass','browsersync','twig_components','twig','watch']);