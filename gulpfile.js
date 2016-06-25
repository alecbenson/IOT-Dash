var gulp = require('gulp');
// Include plugins
var plugins = require("gulp-load-plugins")();
var merge = require('merge-stream');
//Output destination
var base = '';
var dest = 'public/dist/';
var vendorDest = 'public/dist/vendor/';
//Filters for file types
const jsFilter = plugins.filter('**/*.js', {restore: true});
const lessFilter = plugins.filter('**/*.less', {restore: true});
const sassFilter = plugins.filter('**/*.scss', {restore: true});
const cssFilter = plugins.filter('**/*.css', {restore: true});

const mainPaths = {
  js: [
    'public/js/directives/**/*.js',
    'public/js/controllers/**/*.js'
  ]
};

//Run bower
gulp.task('bower', function() {
  return plugins.bower();
});

//Concatenate and minify JS
gulp.task('js', function() {
	gulp.src(mainPaths.js, {base: base})
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'js'));
});

//Concatenate and minify vendor JS
gulp.task('vendorJs', function() {
	gulp.src('./bower.json', {base: base})
    .pipe(plugins.mainBowerFiles())
		.pipe(jsFilter)
		.pipe(plugins.concat('vendor.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(vendorDest + 'js'));
});

//Concatenate and minify vendor CSS
gulp.task('vendorCss', function() {
  var lessStream = gulp.src('./bower.json', {base: base})
    .pipe(plugins.mainBowerFiles())
		.pipe(lessFilter)
    .pipe(plugins.less())
    .pipe(plugins.concat('less-files.less'));

  var scssStream = gulp.src('./bower.json', {base: base})
    .pipe(plugins.mainBowerFiles())
		.pipe(sassFilter)
    .pipe(plugins.sass())
    .pipe(plugins.concat('scss-files.less'));

  var cssStream = gulp.src('./bower.json', {base: base})
    .pipe(plugins.mainBowerFiles())
		.pipe(cssFilter)
    .pipe(plugins.concat('css-files.less'));

  var mergedStream = merge(lessStream, scssStream, cssStream)
    .pipe(plugins.concat('style.css'))
    .pipe(plugins.uglifycss())
    .pipe(gulp.dest(vendorDest + 'css'));

  return mergedStream;
});

gulp.task('default', ['bower', 'js', 'vendorJs', 'vendorCss']);
