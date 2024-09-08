const gulp = require('gulp')
const browserSyncInstance = require('browser-sync').create()
const sass = require('sass')
const gulpSass = require('gulp-sass')(sass)

// Dynamic import of gulp-autoprefixer
async function loadAutoprefixer() {
    const { default: autoprefixer } = await import('gulp-autoprefixer')
    return autoprefixer
}


// Compile Sass into CSS & auto-inject into browsers
gulp.task('sass', async function () {
  const autoprefixer = await loadAutoprefixer();  // Load autoprefixer dynamically
  return gulp.src('src/scss/**/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))  // Compile SCSS with error logging
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSyncInstance.stream());  // Inject CSS changes into the browser
})

// Start a local server with BrowserSync & watch files for changes
gulp.task('serve', function () {
  browserSyncInstance.init({
    server: './src'  // Serve from the root directory (or specify a different folder)
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));  // Watch for Sass changes
  gulp.watch('*.html').on('change', browserSyncInstance.reload);  // Watch for HTML changes
  gulp.watch('dist/css/**/*.css').on('change', browserSyncInstance.reload);  // Watch for CSS changes
})

// Default task: compile Sass, autoprefix, and start the server
gulp.task('default', gulp.series('sass', 'serve'));