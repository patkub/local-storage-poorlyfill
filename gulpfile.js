const path = require('path')
const { src, dest, series } = require('gulp')
const include = require('gulp-include')
const rename = require('gulp-rename')
const Server = require('karma').Server

/**
 * Combine polyfill and tests into ./test/test-all.js
 */
function combine () {
  return src('./test/test.js')
    .pipe(include())
    .on('error', console.log)
    .pipe(rename({
      suffix: '-all'
    }))
    .pipe(dest('./test/'))
}

/**
 * Run karma tests
 */
function test (done) {
  new Server({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true
  }, done()).start()
}

const runTests = series(combine, test)

exports.combine = combine
exports.test = test
exports.runTests = runTests
exports.default = runTests
