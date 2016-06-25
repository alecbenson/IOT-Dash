var gulp = require('gulp');
// Include plugins
var plugins = require("gulp-load-plugins")();
var merge = require('merge-stream');
//Output destination
var dest = './public/dist/';
//Filters for file types
const jsFilter = plugins.filter('**/*.js', {restore: true});
const lessFilter = plugins.filter('**/*.less', {restore: true});
const sassFilter = plugins.filter('**/*.scss', {restore: true});
const cssFilter = plugins.filter('**/*.css', {restore: true});
const fontFilter = plugins.filter('**/*.ttf', {restore: true});

//Run bower
gulp.task('bower', function() {
  return plugins.bower();
});

//Concatenate and minify JS
gulp.task('js', function() {
	gulp.src('./bower.json')
    .pipe(plugins.mainBowerFiles())
		.pipe(jsFilter)
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'js'));
});

//Concatenate and minify CSS
gulp.task('css', function() {
  var lessStream = gulp.src('./bower.json')
    .pipe(plugins.mainBowerFiles())
		.pipe(lessFilter)
    .pipe(plugins.less())
    .pipe(plugins.concat('less-files.less'));

  var scssStream = gulp.src('./bower.json')
    .pipe(plugins.mainBowerFiles())
		.pipe(sassFilter)
    .pipe(plugins.sass())
    .pipe(plugins.concat('scss-files.less'));

  var cssStream = gulp.src('./bower.json')
    .pipe(plugins.mainBowerFiles())
		.pipe(cssFilter)
    .pipe(plugins.concat('css-files.less'));

  var mergedStream = merge(lessStream, scssStream, cssStream)
    .pipe(plugins.concat('style.css'))
    .pipe(plugins.uglifycss())
    .pipe(gulp.dest(dest + 'css'));

  return mergedStream;
});

//Handle fonts
gulp.task('fonts', function() {
	gulp.src('./bower.json')
    .pipe(plugins.mainBowerFiles())
		.pipe(fontFilter)
		.pipe(gulp.dest(dest + 'fonts'));
});

gulp.task('default', ['bower', 'js', 'css', 'fonts']);
