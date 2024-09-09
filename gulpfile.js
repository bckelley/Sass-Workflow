const gulp = require('gulp')
const browserSyncInstance = require('browser-sync').create()
const sass = require('sass')
const gulpSass = require('gulp-sass')(sass)


// Compile Sass into CSS & auto-inject into browsers
gulp.task('sass', async function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))  // Compile SCSS with error logging
    
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSyncInstance.stream());  // Inject CSS changes into the browser
})

// Start a local server with BrowserSync & watch files for changes
gulp.task('serve', () => {
  browserSyncInstance.init({
      proxy: 'http://localhost:3002',
      files: ['src/**/*.html', 'dist/css/*.css', 'src/scripts/**/*.js'],
      port: 3000
  })

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
})

// Default task: compile Sass, autoprefix, and start the server
gulp.task('default', gulp.series('sass', 'serve'))