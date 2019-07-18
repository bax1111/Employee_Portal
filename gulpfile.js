"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");

// Compile Sass
gulp.task("sass", function() {
  return gulp
    .src("./scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("watch", function() {
  gulp.watch("./scss/*.scss", gulp.parallel("sass"));
});

// Default
// gulp.task("default", ["sass", "watch"]);
