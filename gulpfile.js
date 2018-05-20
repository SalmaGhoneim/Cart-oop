
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('es6-class', () => {
    return gulp.src('./cart.js')
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(gulp.dest('build'))
});
gulp.task('es6-test', () => {
    return gulp.src('./cart.test.js')
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(gulp.dest('build'))
});
gulp.task('default',['es6-class'], () => {
    gulp.start('es6-test');
    gulp.watch('./cart.test.js',['es6-class'])
})