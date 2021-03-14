// Themesberg
const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const sass          = require('gulp-sass');
// const pug           = require('gulp-pug');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
// const prettier      = require('gulp-prettier');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// // pug is not ugly
// gulp.task('pug', function() {
//     return gulp.src('src/pug/*.pug')
//      .pipe(pug({ locals: {}, pretty: true }))
//      .pipe(prettier({
//         printWidth: 1000,
//         tabWidth: 4,
//         singleQuote: true,
//         proseWrap: 'preserve',
//         endOfLine: 'lf',
//         parser: 'html',
//         htmlWhitespaceSensitivity: 'ignore'
//     }))
//      .pipe(gulp.dest('./'))
//      .pipe(browserSync.stream());
//   })

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("src/scss/*.scss", gulp.series('sass'));
    // gulp.watch("src/pug/*.pug", gulp.series('pug'));
    gulp.watch([ "app/*.html", "app/js/*.js"]).on('change', browserSync.reload);
    
}));

gulp.task('default', gulp.series('serve'));
    
