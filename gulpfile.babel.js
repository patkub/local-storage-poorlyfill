import { src, dest, series } from 'gulp'
import rollup from 'gulp-rollup'
import babel from 'gulp-babel'
import header from 'gulp-header'
import path from 'path'
import { Server } from 'karma'

const headerTxt =
`/**
 *
 * Partial local storage polyfill
 *
 * @author Patrick Kubiak <pk9948@rit.edu>
 *
 * Why?
 * - For local files, IE and Edge do not have support for local storage
 * - local storage can be disabled
 *
 * Implementation details:
 * - Use browser's native implementation if supported
 * - Mirror native functionality with an object
 *
 * Implementation flaws:
 * - Not persistent
 * - Need to use _localStorage instead of localStorage
 *
 * Use _localStorage or window._localStorage instead of localStorage or window.localStorage
 * because the browser prevents using localStorage or window.localStorage if access is denied for this document
 *
 */

`

/**
 * Babel transpile for dist
 */
function transpile () {
  return src('./src/**/*.js')
    .pipe(rollup({
      input: './src/local-storage-poorlyfill.js',
      output: {
        format: 'iife'
      },
      plugins: [
        babel({
          presets: ['@babel/env']
        })
      ]
    }))
    .pipe(header(headerTxt))
    .pipe(dest('./dist/'))
}

/**
 * Babel transpile for tests
 */
function transpileTests () {
  return src(['./src/**/*.js', './test/**/*.js'])
    .pipe(rollup({
      input: './test/test.js',
      output: {
        format: 'iife'
      },
      plugins: [
        babel({
          presets: ['@babel/env']
        })
      ]
    }))
    .pipe(dest('./dist/'))
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

/**
 * Transpile and run tests
 */
const runTests = series(transpileTests, test)

// export
exports.transpile = transpile
exports.transpileTests = transpileTests
exports.test = test
exports.runTests = runTests
exports.default = runTests
