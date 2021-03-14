// Themesberg
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./app/"
    });

    gulp.watch("app/scss/*.scss", gulp.series('sass'));
    gulp.watch([ "app/*.html", "app/js/*.js"]).on('change', browserSync.reload);
    
}));

gulp.task('default', gulp.series('serve'));
    
// const { src, dest, watch, series } = require('gulp');
// const sass = require('gulp-sass');
// const postcss = require('gulp-postcss');
// const cssnano = require('cssnano');
// const terser = require('gulp-terser');
// const browsersync = require('browser-sync').create();

// // Sass Task
// function scssTask(){
//   return src('app/scss/style.scss', { sourcemaps: true })
//     .pipe(sass())
//     .pipe(postcss([cssnano()]))
//     .pipe(dest('dist', { sourcemaps: '.' }));
// }

// // JavaScript Task
// function jsTask(){
//   return src('app/js/script.js', { sourcemaps: true })
//     .pipe(terser())
//     .pipe(dest('dist', { sourcemaps: '.' }));
// }

// // Browsersync Tasks
// function browsersyncServe(cb){
//   browsersync.init({
//     server: {
//       baseDir: '.'
//     }
//   });
//   cb();
// }

// function browsersyncReload(cb){
//   browsersync.reload();
//   cb();
// }

// // Watch Task
// function watchTask(){
//   watch('*.html', browsersyncReload);
//   watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
// }

// // Default Gulp task
// exports.default = series(
//   scssTask,
//   jsTask,
//   browsersyncServe,
//   watchTask
// );
