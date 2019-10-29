const gulp = require('gulp'); // Подключаем Gulp
const sass = require('gulp-sass'); //Подключаем Sass пакет,
const browserSync = require('browser-sync').create(); // Подключаем Browser Sync
const sourcemaps = require('gulp-sourcemaps'); // Для удобства чтения в инспекторе сжатых файлов
const concat = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)
const uglify = require('gulp-uglify'); // Подключаем gulp-uglify (для сжатия JS)
const cleanCSS = require('gulp-clean-css'); // Подключаем пакет для минификации CSS
const rename = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
const del = require('del'); // Подключаем библиотеку для удаления файлов и папок
const imagemin = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const notify = require('gulp-notify'); // Оповещение об ошибках
const plumber = require('gulp-plumber'); // Неубиваемый watch
const cache = require('gulp-cache'); // Подключаем библиотеку кеширования
const autoprefixer = require('gulp-autoprefixer'); // Подключаем библиотеку для автоматического добавления префиксов

function styles() {
  return gulp.src('app/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'Sass!!!',
          message: err.message
        };
      })
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }).on("error", notify.onError()))
    .pipe(autoprefixer(['last 3 versions'], {
      cascade: false
    })) // Создаем префиксы
    .pipe(cleanCSS({
      level: 2
    })) // минификация
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
};

//
function scripts() {
  return gulp.src([
    'app/js/scripts.js'
  ]) // Сюда добавляем js файлы
    .pipe(sourcemaps.init())
    .pipe(uglify({
      toplevel: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('app/js')) // Выгружаем в папку app/js
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
};

function watch() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  })
  gulp.watch('app/sass/**/*.scss', styles)
  gulp.watch('app/js/scripts.js', scripts)
  gulp.watch("app/*.html").on('change', browserSync.reload)
};

function clean() {
  return del(['dist/*'])
};
////
function cssLibs() {
  return gulp.src([
      'app/fonts/font-awesome/css/font-awesome.min.css',
      'app/css/jquery.fancybox.min.css',
      'app/css/owl.carousel.min.css'
  ]) // Сюда добавляем сss библиотеки
    .pipe(concat('libs.min.css')) // Собираем библиотеки в кучу в новом файле libs.min.css
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('dist/css')) // Выгружаем в папку dist/css
};


function jsLibs() {
  return gulp.src([
      'app/js/jquery-3.4.1.min.js',
      'app/js/jquery.fancybox.min.js',
      'app/js/owl.carousel.min.js'
  ]) // Сюда добавляем сss библиотеки
    .pipe(concat('libs.min.js')) // Собираем библиотеки в кучу в новом файле main.min.css
    .pipe(uglify())
    .pipe(gulp.dest('dist/js')) // Выгружаем в папку dist/css  
};

function code() {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist/'))
};

function fonts() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
};

//

function images() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      progressive: true
    }))) // Cache Images
    .pipe(gulp.dest('dist/img'));
};

gulp.task('styles', styles)
gulp.task('scripts', scripts)
gulp.task('watch', watch)
gulp.task('cssLibs', cssLibs)
gulp.task('jsLibs', jsLibs)
gulp.task('images', images)
gulp.task('code', code)
gulp.task('fonts', fonts)

gulp.task('default', gulp.series(gulp.parallel('styles', 'scripts'), 'watch'))
gulp.task('build', gulp.series(clean, gulp.parallel('styles', 'scripts', 'images'), 'cssLibs', 'jsLibs', 'fonts', 'code'))
