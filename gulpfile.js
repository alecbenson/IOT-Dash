var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  notify = require("gulp-notify"),
  bower = require('gulp-bower');

var config = {
  sassPath: './resources/sass',
  bowerDir: './bower_components'
};

//Run bower
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir));
});

//Install fontawesome
gulp.task('icons', function() {
  return gulp.src(config.bowerDir +
    '/fontawesome/fonts/**.*').pipe(gulp.dest('./public/fonts'));
});

gulp.task('default', ['bower', 'icons']);
