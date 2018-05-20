# Dreidev_cart
Object Oriented JavaScript - a mini cart.

USING ES6 may cause problems in running th classes 
--using gulp & babel
1- create an empyty folder build to save in it the translated ES5 files.

2- create a file gulpfile.js with the following code snippet

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

3- change the test script in package.json to "mocha ./build/cart.test.js"

TO run the tests
after cloning the repo open a cmd in the repo folder. the type npm test.
