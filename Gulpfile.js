const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require("gulp-util");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const stream = require('webpack-stream');
const mocha = require('gulp-mocha');

const webpackConfig = require("./webpack.config.js");

gulp.task("webpack-dev-server", (callback) => {
  const compiler = webpack(webpackConfig.config);

  compiler.plugin('done', () => {
    console.log(`App is running at ${webpackConfig.host}:${webpackConfig.port}`);
  });

  const server = new WebpackDevServer(compiler, {
    historyApiFallback: true,
    hot: true,
    contentBase: './public',
    stats: 'errors-only'
  });

  server.listen(webpackConfig.port);
});

gulp.task('webpack', [], () => {
  const path = {
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

gulp.task('spec', () => {
  gulp
    .src(['src/**/*.spec.js'], { read: false })
    .pipe(mocha({
      reporter: 'nyan',
      require: 'babel-register',
      colors: true
    }));
});

gulp.task('default', ['webpack-dev-server']);
