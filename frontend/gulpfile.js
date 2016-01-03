// Gather dependencies
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    gulp = require('gulp'),
    browserify = require('browserify')
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    sass = require('gulp-sass'),
    install = require("gulp-install"),
    changed = require('gulp-changed');

gulp.task('default', function() {
    gutil.log('Gulp is running!');
});


// Setting up

gulp.task('setup', function() {
    return gulp
        .src(['./bower.json', './package.json'])
        .pipe(install());
});


// Building

gulp.task('build', ['copy-dependencies', 'copy-html', 'transpile-jsx', 'build-scss'], function() {
    return gutil.log('Build is running!');
});

gulp.task('copy-dependencies', ['copy-dependencies-js', 'copy-dependencies-css'], function() {});

gulp.task('copy-dependencies-js', function() {
    return gulp
        .src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/tether/dist/js/tether.js',
            'bower_components/bootstrap/dist/js/bootstrap.js'
        ])
        .pipe(changed('target/js'))
        .pipe(gulp.dest('target/js'));
});

gulp.task('copy-dependencies-css', function() {
    return gulp
        .src([
            'bower_components/animate.css/animate.min.css'
        ])
        .pipe(changed('target/css'))
        .pipe(gulp.dest('target/css'));
});

gulp.task('copy-html', function() {
    return gulp
        .src('src/*.html')
        .pipe(gulp.dest('target'));
});

gulp.task('transpile-jsx', function() {
    return browserify('src/jsx/index.jsx')
        .transform('babelify', {
            presets: ['es2015', 'react', 'stage-0']
        })
        .bundle()
        .pipe(vinylSourceStream('index.js'))
        .pipe(vinylBuffer())
        .pipe(gulp.dest('target/js'));
});

gulp.task('build-scss', function() {
    return gulp
        .src('src/scss/index.scss')
        .pipe(changed('target/css'))
        .pipe(sass())
        .pipe(gulp.dest('target/css'));
});
