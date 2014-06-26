var gulp = require('gulp')

var less = require('gulp-less')
var jade = require('gulp-jade')
var coffee = require('gulp-coffee')


var gutil = require('gulp-util')
var plumber = require('gulp-plumber')
var liveReload = require('gulp-livereload')

var config = {
  jade: {
    src: 'jade/**/*',
    dest: './',
    watch: 'jade/**/*',
    lr: './*.html',
    param: {}
  },
  less: {
    src: 'layout/less/layout*.less',
    dest: 'layout/css',
    watch: 'layout/less/**/*',
    lr: 'layout/css/*.css',
    param: {dumpLineNumbers: 'comments'}
  }
  // coffee: {

  // }
}
var gplugin = {
  jade: jade,
  less: less
}


var port = 9010

var gulpSrc = function(src){
  return gulp.src(src)
    .pipe(plumber({
      errorHandler: function(err){
        gutil.beep()
        gutil.log(err)
      }
    }))
}

var allTask = [];

for(var task in config){
  allTask.push(task);
  (function(tt){
    gulp.task(tt, function(){
      gulpSrc(config[tt].src)
        .pipe(gplugin[tt](config[tt].param))
        .pipe(gulp.dest(config[tt].dest))
    })
  })(task);
};

gulp.task('watch', function(){
  var LR = liveReload()


  for(var task in config){
    if( config[task].watch ){
      gulp.watch(config[task].watch, [task])

      gulp.watch(config[task].lr, function(file){
        LR.changed(file.path);
      })
    }
  }
});

gulp.task('default', allTask);

gulp.task('wd', allTask.concat(['watch']));

