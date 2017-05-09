var gulp = require('gulp');
var path = require('path');
// var webpack = require('webpack-stream');
var webpack = require('webpack');
var pump = require('pump');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var gutil = require("gulp-util");
var concat = require('gulp-concat');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // publicPath: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  plugins : [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   output: {comments: false}
    // }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    })

  ],
  module: {
         loaders: [
           {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loaders: ["react-hot-loader","babel-loader"]
           },
          {
            test : /(\.css|\.svg|\.jpg|\.png|\.ico)$/,
            exclude : /node_modules/,
            loaders:["ignore-loader"]
          }
       ]
  }
};

gulp.task('html', function() {
  return gulp.src('public/*.html')
    .pipe(htmlmin({collapseWhitespace: true,removeComments: true}))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del([
    // 'build/*.js',
    // 'build/*.css',
    // 'build/*.html'
    'build/**/*.*'
    // here we use a globbing pattern to match everything inside the `mobile` folder
    // 'dist/mobile/**/*',
    // we don't want to clean this file though so we negate the pattern
    // '!dist/mobile/deploy.json'
  ]);
});

gulp.task('webpack', function(callback) {

  // return gulp.src('src/index.js')
  //   .pipe(webpack(webpackConfig))
  //   .pipe(rename('bundle.js'))
  //   .pipe(gulp.dest('build'));

  webpack( webpackConfig , function(err, stats) {
       if(err) throw new gutil.PluginError("webpack", err);
       gutil.log("[webpack]", stats.toString({
           // output options
           colors:true
       }));
       callback();
   });

});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
    .pipe(cleanCSS()) // {debug:true,compatibility: 'ie8'},function(details){console.log(details);}
    .pipe(concat('bundle.css'))
    // .pipe(rename('bundle.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('static',function(){
  return gulp.src(['src/**/*.jpg','src/**/*.png','src/**/*.svg','public/*.ico'])
  .pipe(gulp.dest('build'));
});
gulp.task('webpack-dev-server',['clean','css','static','html','webpack'],function(){ //'webpack',
    new WebpackDevServer(webpack(webpackConfig), {
        // publicPath: "/" + webpackConfig.output.publicPath,
        // contentBase:"/build/" ,
        publicPath: "/build/" ,
        stats: {
          colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/");
    });
});

// gulp.task('default',['webpack-dev-server'],function(){
gulp.task('default',['clean','css','static','html','webpack'],function(){
  console.log("Gulped");
});
