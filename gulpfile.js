const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const deploy = require('gulp-gh-pages');

//compiling sass and injectinig into browser
gulp.task('sass',function(){
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
	.pipe(sass())
	.pipe(gulp.dest("src/css"))
	.pipe(browserSync.stream());
});
//moving js files to src/js
gulp.task('js',function(){
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
	.pipe(gulp.dest("src/js"))
	.pipe(browserSync.stream());
});

//sass & server
gulp.task('serve',['sass'],function(){
	browserSync.init({
		server: "./src"
	})
	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass']);
	gulp.watch("src/*.html").on('change',browserSync.reload);
});
//moving fonts folder from src/fonts
gulp.task('fonts',function(){
	return gulp.src(['node_modules/font-awesome/fonts/*'])
	.pipe(gulp.dest("src/fonts"));
});

//moving font awesome css folder from src/css
gulp.task('fa',function(){
	return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
	.pipe(gulp.dest("src/css"));
});
//push build to gh-pages
gulp.task('deploy',['build'],function(){
	return gulp.src("./dist/**/*")
	.pipe(deploy())
});

gulp.task('default',['js','serve','fonts','fa','sass']);