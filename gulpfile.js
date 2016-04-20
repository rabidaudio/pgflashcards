var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
//  
var concat = require("gulp-concat");
var webpack = require('webpack-stream');

gulp.task("js", function () {
  return gulp.src("app/js/main.js")
    .pipe(sourcemaps.init())
    .pipe(webpack({
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    }))
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
