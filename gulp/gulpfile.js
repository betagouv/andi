'use strict';

var source = '../';

// Folders
var cssFolder = source + 'src/styles';

var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

gulp.task('default', ['dev:watch']);
gulp.task('dev', ['sass+sourceMap']);
gulp.task('dev:watch', ['sass+sourceMap', 'watch']);
gulp.task('prod', ['sass']);

// SASS
gulp.task('sass+sourceMap', function()
{
	return gulp.src(source + 'src/scss/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass(
		{
			outputStyle: 'expanded'
		}).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer())
		// .pipe(pixrem())
		// .pipe(plugins.rename(function(path)
		// {
		// 	path.basename += ".min";
		// }))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(cssFolder));
});

gulp.task('sass', function()
{
	return gulp.src(source + 'src/scss/*.scss')
		.pipe(plugins.sass(
		{
			outputStyle: 'compressed'
		}).on('error', plugins.sass.logError))
		.pipe(plugins.autoprefixer())
		// .pipe(pixrem())
		// .pipe(plugins.rename(function(path)
		// {
		// 	path.basename += ".min";
		// }))
		.pipe(gulp.dest(cssFolder));
});

// Watch files for changes
gulp.task('watch', function()
{
	gulp.watch(source + 'src/scss/*.scss', ['dev']);
});