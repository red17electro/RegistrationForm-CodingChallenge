/* eslint-env node */

var gulp = require("gulp");

/* Live CSS Reload & Browser Syncing */
var browserSync = require("browser-sync").create();

/* Gulp plugin, compressed es6 + code. */

const terser = require("gulp-terser");

/* A modular minifier, built on top of the PostCSS ecosystem */

var cssnano = require("cssnano");

/* Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use website */

var autoprefixer = require("autoprefixer");

/* PostCSS gulp plugin to pipe CSS through several plugins, but parse CSS only once. */
var postcss = require("gulp-postcss");

/* Convert sass to css*/

var sass = require("gulp-sass");
sass.compiler = require("node-sass");

/* Lets using ES6 features*/

var babel = require("gulp-babel");

/* gulp plugin to minify HTML. */

var htmlmin = require("gulp-htmlmin");

/* A string replace plugin for gulp */

var replace = require("gulp-replace");

/* Optimizing the scripts */
gulp.task("scripts-dist", function(cb) {
  gulp
    .src(["js/**/*.js"])
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest("dist/js"))
    .on("end", cb);
});

gulp.task("sassy", function(cb) {
  var plugins = [
    autoprefixer({
      browsers: ["last 1 version"]
    }),
    cssnano()
  ];

  gulp
    .src("sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(postcss(plugins))
    .pipe(gulp.dest("dist/css"))
    .on("finish", function() {
      gulp
        .src("*.html")
        .pipe(
          replace('<link rel="stylesheet" href="css/styles.css">', function(s) {
            var style = fs.readFileSync("dist/css/styles.css", "utf8");
            return "<style>\n" + style + "\n</style>";
          })
        )
        .pipe(
          htmlmin({
            collapseWhitespace: true
          })
        )
        .pipe(gulp.dest("dist/"))
        .on("end", cb);
    })
    .pipe(browserSync.stream());
});

gulp.task("dist", gulp.parallel("scripts-dist", "sassy"));
