/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp');
// Include plugins
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'del'],
    replaceString: /\bgulp[\-.]/
});

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


// create a default task to build the app
gulp.task('default', ['typescript', 'bowerjs', 'bowercss', 'appcss'], function() {
return plugins.util.log('App is built!');
});


// TYPESCRIPT to JavaScript
gulp.task('typescript', function () {
    return gulp.src('app/**/*.ts')
        .pipe(plugins.typescript({
            noImplicitAny: true,
            out: 'app.js'
        }))
        .pipe(gulp.dest('dist/app/'))
        .pipe(reload({stream: true}))
        ;
});

// BOWER
gulp.task('bowerjs', function () {

    gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('**/*.js'))
        .pipe(plugins.debug())
        .pipe(plugins.concat('vendor.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/js'));

});

gulp.task('bowercss', function () {
    gulp.src(plugins.mainBowerFiles())
        .pipe(plugins.filter('**/*.css'))
        .pipe(plugins.debug())
        .pipe(plugins.concat('vendor.css'))
        .pipe(gulp.dest('dist/css'));

});

// APP css
gulp.task('appcss', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(gulp.dest('dist/css/'))
        .pipe(reload({
            stream: true
        }));
});

// CLEAN
gulp.task('clean', function (done) {
    var delconfig = [].concat(
        'dist',
        '.tmp/js'
    );

    // force: clean files outside current directory
    plugins.del(delconfig, {
        force: true
    }, done);
});


// Watch scss AND html files, doing different things with each.
gulp.task('serve', ['default'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch("src/**/*.ts", ['typescript']).on("change", reload);

});
