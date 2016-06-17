var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")();


//Output destination
var dest = 'dist/';

//Run bower
gulp.task('bower', function() {
  return plugins.bower();
});

//Handle JS
gulp.task('js', function() {
	gulp.src('./bower.json')
    .pipe(plugins.mainBowerFiles())
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'js'));
});

//Handle CSS
gulp.task('css', function() {
	gulp.src('./bower.json')
    .pipe(plugins.mainBowerFiles())
		.pipe(plugins.filter('*.css'))
		.pipe(plugins.concat('main.css'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'css'));
});

//Handle fonts
gulp.task('fonts', function() {
	gulp.src('./bower.json')
    .pipe(plugins.mainBowerFiles())
		.pipe(plugins.filter('*.ttf'))
		.pipe(gulp.dest(dest + 'fonts'));
});

gulp.task('default', ['bower', 'js', 'css', 'fonts']);
