const { src, dest, series, watch } = require('gulp');
const sass         = require('gulp-sass'),
	  cleancss     = require('gulp-clean-css'),
	  notify       = require('gulp-notify'),
	  livereload   = require('gulp-livereload'),
	  sourcemaps   = require('gulp-sourcemaps'),
	  postcss      = require('gulp-postcss'),
	  autoprefixer = require('autoprefixer'),
	  webpack      = require('webpack-stream'),
	  paths        = { js: './js/index.js' , sass: { index: './sass/custom.scss', sections: './sass/sections/*.scss', partials: './sass/partials/*.scss' }, css:  ['../assets/custom.css'] }

function buildJS(done) {
	return src(paths.js)
		.pipe(webpack( require('./webpack.config.js') ))
		.pipe(dest('../assets'))
		.pipe(notify({ message: "🥤 build js complete", title: " ", onLast: true }))
		.on('end', () => { done() })
}

function buildCSS(done) {
	return src(paths.sass.index)
		.pipe(sourcemaps.init())
		.pipe(sass({ includePaths: ['node_modules'] }))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('../assets'))
		.pipe(notify({ message: "🥤 build css complete", title: " ", onLast: true }))
		.on('end', () => { done() })
}

function buildSectionsCSS(done) {
	return src(paths.sass.sections)
		.pipe(sourcemaps.init())
		.pipe(sass({ includePaths: ['node_modules'] }))
		.pipe(dest('../assets'))
		.pipe(notify({ message: "🥤 build section css complete", title: " ", onLast: true }))
		.on('end', () => { done() })
}

function css(done) {
	return src(paths.css)
		.pipe(sourcemaps.init())
		.pipe(postcss([ autoprefixer ]))
		.pipe(cleancss({compatibility: 'ie8'}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('../assets'))
		.pipe(notify({ message: "🥤 production css complete", title: " ", onLast: true }))
		.on('end', () => { done() })
}

exports.build = series(buildJS, buildCSS, buildSectionsCSS, css);

exports.default = function() {
	watch(paths.js, { ignoreInitial: false }, buildJS )
	watch(paths.sass.index, { ignoreInitial: false }, buildCSS );
	watch(paths.sass.partials, { ignoreInitial: false }, buildCSS );
	watch(paths.sass.sections, { ignoreInitial: false }, buildSectionsCSS );
	livereload.listen();
}
