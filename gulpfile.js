'use strict';

var gulp = require('gulp');
// Include plugins
var plugins = require("gulp-load-plugins")();
var merge = require('merge-stream');
//Output destination
var base = '';
var dest = 'public/dist/';
var vendorDest = 'public/dist/vendor/';
//Filters for file types
const jsFilter = plugins.filter('**/*.js', {
	restore: true
});
const lessFilter = plugins.filter('**/*.less', {
	restore: true
});
const sassFilter = plugins.filter('**/*.scss', {
	restore: true
});
const cssFilter = plugins.filter('**/*.css', {
	restore: true
});

const mainPaths = {
	js: [
		'public/js/module.js',
		'public/js/directives/**/*.js',
		'public/js/controllers/**/*.js'
	],
	css: [
		'public/css/app.css'
	]
};

//Run bower
gulp.task('bower', function () {
	return plugins.bower();
});

//Concatenate and minify iotdash JS
gulp.task('js', function () {
	gulp.src(mainPaths.js, {
			base: base
		})
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglify({
			mangle: false
		}))
		.pipe(gulp.dest(dest + 'js'));
});

//Concatenate and minify vendor CSS
gulp.task('css', function () {
	gulp.src(mainPaths.css, {
			base: base
		})
		.pipe(plugins.concat('app.css'))
		.pipe(plugins.uglifycss())
		.pipe(gulp.dest(dest + 'css'));
});

//Concatenate and minify vendor JS
gulp.task('vendorJs', function () {
	gulp.src('./bower.json', {
			base: base
		})
		.pipe(plugins.mainBowerFiles())
		.pipe(jsFilter)
		.pipe(plugins.concat('vendor.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(vendorDest + 'js'));
});

//Concatenate and minify vendor CSS
gulp.task('vendorCss', function () {
	var lessStream = gulp.src('./bower.json', {
			base: base
		})
		.pipe(plugins.mainBowerFiles())
		.pipe(lessFilter)
		.pipe(plugins.less())
		.pipe(plugins.concat('less-files.less'));

	var scssStream = gulp.src('./bower.json', {
			base: base
		})
		.pipe(plugins.mainBowerFiles())
		.pipe(sassFilter)
		.pipe(plugins.sass())
		.pipe(plugins.concat('scss-files.less'));

	var cssStream = gulp.src('./bower.json', {
			base: base
		})
		.pipe(plugins.mainBowerFiles())
		.pipe(cssFilter)
		.pipe(plugins.concat('css-files.css'));

	var mergedStream = merge(lessStream, scssStream, cssStream)
		.pipe(plugins.concat('style.css'))
		.pipe(plugins.uglifycss())
		.pipe(gulp.dest(vendorDest + 'css'));

	return mergedStream;
});

gulp.task('vendorFonts', function () {
	return gulp.src('./bower_components/**/*.{eot,svg,ttf,woff,woff2}', {
			base: base
		})
		.pipe(plugins.flatten())
		.pipe(gulp.dest(vendorDest + 'fonts'));
});

//Lint everything using elsint
gulp.task('lint', function () {
	return gulp.src(['**/**.js', '!gulpfile.js', '!public/dist/**', '!node_modules/**', '!bower_components/**'])
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failAfterError());
});

gulp.task('default', ['bower', 'lint', 'js', 'css', 'vendorFonts', 'vendorJs', 'vendorCss']);
