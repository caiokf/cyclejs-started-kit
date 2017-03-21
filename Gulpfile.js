var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var stream = require('webpack-stream');

var webpackConfig = require("./webpack.config.js");

gulp.task("webpack-dev-server", function(callback) {
  var compiler = webpack(webpackConfig.config);

  compiler.plugin('done', () => {
    console.log(`App is running at ${webpackConfig.host}:${webpackConfig.port}`);
  });

  var server = new WebpackDevServer(compiler, {
    historyApiFallback: true,
    hot: true,
    contentBase: './public',
    stats: 'errors-only'
  });

  server.listen(webpackConfig.port);
});

gulp.task('webpack', [], function() {
  var path = {
    ALL: ['src/**/*.js'],
    DEST: 'dist/build',
  };

  return gulp
    .src(path.ALL)
    .pipe(sourcemaps.init())
    .pipe(stream(webpackConfig.config))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.DEST));
});

gulp.task('default', ['webpack-dev-server']);
