'use strict';

/**
* Generate themes folder from Drupal Version
*/

var themes_folder = 'sites/all/themes';

/**
* Gulp specific config
*/

var path = {
    theme:  themes_folder + '/beaker/',
    sass:   'sass',
    css:    'css',
    js:     'js',
    img:    'images',
    tpl:    'templates'
};

var gulp          = require('gulp'),
    util          = require('gulp-util'),
    sass          = require('gulp-sass'),
    globbing      = require('gulp-css-globbing'),
    sourcemaps    = require('gulp-sourcemaps'),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),
    mqpacker      = require('css-mqpacker'),
    csswring      = require('csswring'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload,
    filter        = require('gulp-filter'),
    colors        = require('colors'),
    jshint        = require('gulp-jshint'),
    fs            = require('fs'),
    duration      = require('gulp-duration'),
    yaml          = require('js-yaml');


/* Set paths */
path.sass   = path.theme + path.sass;
path.css    = path.theme + path.css;
path.js     = path.theme + path.js;
path.img    = path.theme + path.img;
path.tpl    = path.theme + path.tpl;

if ( fs.existsSync('./docker-compose.yml') ) {
  var get_hostname     = yaml.safeLoad(fs.readFileSync('./docker-compose.yml', 'utf8'));
  var domain           = get_hostname['services']['drupal']['hostname'];
} else {
  var domain           = process.env.AMAZEEIO_SITE_URL;
}


/* Gulp jshint taskc*/
gulp.task('jshint', function() {
  return gulp.src(path.js + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


/* Gulp SASS task with browserSync*/
gulp.task('sass', function () {
  var processors = [
    autoprefixer({browsers: ['last 10 versions', 'ie 9']})
  ];
  gulp.src(path.sass + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({ extensions: ['.scss'] }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(duration('SASS compilation finished'))
    .pipe(postcss(processors))
    .pipe(duration('postCSS finished'))
    .pipe(sourcemaps.write('./map'))
    .pipe(duration('created sourcemap files'))
    .pipe(gulp.dest('./' + path.css))
    .pipe(filter([path.css + '/**/*.css', '!' + path.css + '/animate.css']))
    .pipe(browserSync.reload({stream: true}))
    .pipe(filter([path.css + '/**/*.css', '!' + path.css + '/animate.css']))
    .pipe(duration('moved all files to /css folder'));
});


/* Gulp SASS dev compile task*/
gulp.task('sass-compile', function () {
  var processors = [
    autoprefixer({browsers: ['last 10 versions', 'ie 9']})
  ];
  gulp.src(path.sass + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({ extensions: ['.scss'] }))
    .pipe(sass.sync().on('error', sass.logError).on('error', process.exit.bind(process, 1)))
    .pipe(duration('SASS compilation finished'))
    .pipe(postcss(processors))
    .pipe(duration('postCSS finished'))
    .pipe(sourcemaps.write('./map'))
    .pipe(duration('created sourcemap files'))
    .pipe(gulp.dest('./' + path.css))
    .pipe(filter([path.css + '/**/*.css', '!' + path.css + '/animate.css']))
    .pipe(browserSync.reload({stream: true}))
    .pipe(filter([path.css + '/**/*.css', '!' + path.css + '/animate.css']))
    .pipe(duration('moved all files to /css folder'));
});


/* Gulp SASS prod compile task*/
gulp.task('sass-build', function () {
  var processors = [
    autoprefixer({browsers: ['last 10 versions', 'ie 9']}),
    csswring
  ];
  gulp.src(path.sass + '/**/*.scss')
    .pipe(globbing({ extensions: ['.scss'] }))
    .pipe(sass.sync().on('error', sass.logError).on('error', process.exit.bind(process, 1)))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./' + path.css));
});


/* Gulp compile dev task*/
gulp.task('compile', ['sass-compile']);


/* Gulp build prod task*/
gulp.task('build', ['sass-build']);


/* Gulp browserSync init task*/
gulp.task('browser-sync', function() {
  if (util.env.ghostmode && util.env.open) {
    return browserSync.init(null, {
      proxy: domain,
      startPath: "",
      files: path.css + '/*.css',
      notify: false,
      logConnections: true,
      reloadOnRestart: true,
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
      }
    });
  } else if(util.env.ghostmode) {
    if (util.env.ghostmode) {
      return browserSync.init(null, {
        proxy: domain,
        open: false,
        startPath: "",
        files: path.css + '/*.css',
        notify: false,
        logConnections: true,
        reloadOnRestart: true,
        ghostMode: {
          clicks: true,
          forms: true,
          scroll: true
        }
      });
    }
  } else if(util.env.open) {
    return browserSync.init(null, {
      proxy: domain,
      ghostMode: false,
      startPath: "",
      files: path.css + '/*.css',
      notify: false,
      logConnections: true,
      reloadOnRestart: true
    });
  } else {
    return browserSync.init(null, {
      proxy: domain,
      open: false,
      ghostMode: false,
      startPath: "",
      files: path.css + '/*.css',
      notify: false,
      logConnections: true,
      reloadOnRestart: true
    });
  }
});


/* Gulp Test task*/
gulp.task('test', function() {
  return browserSync.init(null, {
    proxy: domain,
    startPath: "",
    files: path.css + '/*.css',
    notify: false,
    logConnections: true,
    reloadOnRestart: true,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true
    }
  });
});


/* Gulp browserSync init task*/
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(path.sass + '/**/*.scss', ['sass']);
    gulp.watch(path.js + '/**/*.js').on('change', reload);
    gulp.watch("*.html").on('change', reload);
    gulp.watch(path.tpl + '/**/*.html.twig').on('change', reload);
    gulp.watch(path.tpl + '/**/*.tpl.php').on('change', reload);
});


/* Default task*/
gulp.task('default', ['watch']);


/*Help task*/
gulp.task('help', function () {
  console.log("\n\nUsage".underline);
  console.log("  gulp [command] --option\n\n"+"Commands:".underline);
  console.log('gulp watch'.yellow+'\t\trun with browserSync extension');
  console.log('gulp compile'.yellow+'\t\tcompile SASS for local/dev enviroment');
  console.log('gulp build'.yellow+'\t\tcompile SASS for live/staging enviroment');
  console.log('gulp jshint'.yellow+'\t\ttool that helps to detect errors & problems');
  console.log('gulp test'.yellow+'\t\trun Gulp test enviroment');
  console.log("\nOptions for watch task:".underline);
  console.log("\n  --ghostmode\t\tsyncs clicks,scroll,forms across browsers");
  console.log("  --open\t\topen site in browser\n\n");
});
