// Gather dependencies
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    gulp = require('gulp'),
    browserify = require('browserify')
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    sass = require('gulp-sass'),
    install = require("gulp-install");

gulp.task('default', function() {
    gutil.log('Gulp is running!');
});


// Setting up

gulp.task('setup', function() {
    gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});


// Building

gulp.task('build', ['copy-dependencies', 'copy-html', 'transpile-jsx', 'build-scss'], function() {
    gutil.log('build is running!');
});

gulp.task('copy-dependencies', function() {
    gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/tether/dist/js/tether.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
        ])
        .pipe(gulp.dest('target/js'));
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
    gulp.src('src/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('target/css'));
});
