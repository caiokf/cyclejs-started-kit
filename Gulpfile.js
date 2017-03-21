const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const stream = require('webpack-stream');
const mocha = require('gulp-mocha');

const webpackConfig = require('./webpack.config.js');

const path = {
  SRC: 'src/**/*.js',
  SPECS: 'src/**/*.spec.js',
  DIST_DIR: 'dist/build',
};

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
  return gulp
    .src(path.SRC)
    .pipe(sourcemaps.init())
    .pipe(stream(webpackConfig.config))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.DIST_DIR));
});

gulp.task('spec', () => {
  return gulp
    .src([path.SPECS], { read: false })
    .pipe(mocha({
      reporter: 'nyan',
      require: 'babel-register',
      colors: true
    }));
});

gulp.task('eslint', () => {
  return gulp
    .src([path.SRC, '!' + path.SPECS])
    .pipe(eslint({
      configFile: './.eslintrc.js'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['webpack-dev-server']);
