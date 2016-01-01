// Gather dependencies
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserify = require('browserify')
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    sass = require('gulp-sass');

gulp.task('default', function() {
    gutil.log('Gulp is running!');
});

gulp.task('copy-html', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('target'));
});

gulp.task('transpile-jsx', function() {
    browserify('src/jsx/index.jsx')
        .transform('babelify', {presets: ['es2015', 'react', 'stage-0']})
        .bundle()
        .pipe(vinylSourceStream('index.js'))
        .pipe(vinylBuffer())
        .pipe(gulp.dest('target/js'));
});

gulp.task('build-scss', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('target/css'));
});

gulp.task('build', ['copy-html', 'transpile-jsx', 'build-scss'], function() {
    gutil.log('build is running!');
});
