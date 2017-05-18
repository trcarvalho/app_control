var gulp   = require('gulp');
var concat = require('gulp-concat')
var less   = require('gulp-less')

gulp.task('less',function() {
  return gulp.src("./less/*.less")
             .pipe(concat('main.css'))
             .pipe(less())
             .pipe(gulp.dest("./css"))

})
gulp.task('default',['less']);
