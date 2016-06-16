var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var sass = require('gulp-sass');
var serve = require('gulp-serve');

var svgOpts = {
	mode: 'symbol'
};

gulp.task('watch', function() {
	gulp.watch('src/app/**/*.html', ['build']);
	gulp.watch('src/scss/**/*.scss', ['build']);
});

gulp.task('svg-combine', function() {
	gulp.src('src/svg/*.svg')
		.pipe(svgSprite(svgOpts))
		.pipe(gulp.dest('build'));
});

gulp.task('sass', ['svg-combine'], function() {
	gulp.src('src/scss/main.scss')
		.pipe(sass({
			includePaths: ['build/css']			
		}).on('error', sass.logError))
		.pipe(gulp.dest('build/css'));
});

gulp.task('static:html', function() {
	gulp.src('src/app/**/*.html')
		.pipe(gulp.dest('build'));
});

gulp.task('build', ['sass', 'static:html'], function() {});

gulp.task('serve', ['build', 'watch'], serve('build'));

gulp.task('default', ['serve'], function() {
});
