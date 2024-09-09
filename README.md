# Sass Workflow

A light package for compiling Sass and running a dev server

## Version

1.0.0

## Usage

### Installation

Install the dependencies (gulp, gulp-sass, browser-sync)

```sh
 npm install
```

### Run

This will watch your sass files, compile them and run your dev server at <http://localhost:3000>

```sh
$ npm start

> sass_workflow@1.0.0 start
> concurrently "gulp" "node server.js"

[1] Server is running on http://localhost:3002
[0] [15:16:53] Using gulpfile <YOUR PATH>\gulpfile.js
[0] [15:16:53] Starting 'default'...
[0] [15:16:53] Starting 'sass'...
[0] [15:16:53] Finished 'sass' after 8.43 ms
[0] [15:16:53] Starting 'serve'...
[0] [Browsersync] Proxying: http://localhost:3002
[0] [Browsersync] Access URLs:
[0]  --------------------------------------
[0]        Local: http://localhost:3000
[0]     External: http://<YOUR LOCAL IP>:3000
[0]  --------------------------------------
[0]           UI: http://localhost:3001
[0]  UI External: http://<YOUR LOCAL IP>:3001
[0]  --------------------------------------
[0] [Browsersync] Watching files...
[0] [Browsersync] 1 file changed (style.css)
[0] [Browsersync] File event [change] : dist\css\style.css
```
