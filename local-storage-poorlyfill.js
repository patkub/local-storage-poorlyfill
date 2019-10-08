/**
 *
 * Partial local storage polyfill
 *
 * @author Patrick Kubiak <pk9948@rit.edu>
 *
 * Why?
 * - IE does not have support for local storage
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

// strict mode
'use strict';

(function () {
  /* eslint-disable no-new-object */

  // object for internal methods
  var __localStorage = new Object()

  // internal object to hold data
  __localStorage._storage = new Object()

  /* eslint-enable no-new-object */

  /**
   * @param key key to item
   * @param {String} value key's value
   */
  __localStorage.setItem = function (key, value) {
    __localStorage._storage[key] = String(value)
  }

  /**
   * @return item or null if it does not exist
   */
  __localStorage.getItem = function (key) {
    if (Object.prototype.hasOwnProperty.call(__localStorage._storage, key)) {
      return __localStorage._storage[key]
    }
    return null
  }

  /**
   * @return undefined
   */
  __localStorage.removeItem = function (key) {
    if (Object.prototype.hasOwnProperty.call(__localStorage._storage, key)) {
      delete __localStorage._storage[key]
    }
    return undefined
  }

  /**
   * @return undefined
   */
  __localStorage.clear = function () {
    // eslint-disable-next-line no-new-object
    __localStorage._storage = new Object()
  }

  /* istanbul ignore next */
  if (_isSupported()) {
    // use browser's implementation
    // cannot overwrite window.localStorage
    window._localStorage = window.localStorage
  } else {
    // mirror functionality with an object
    // cannot overwrite window.localStorage
    window._localStorage = __localStorage
  }

  /**
   * Check if localStorage is supported by the browser
   * @return {Boolean} true if supported, false otherwise
   */
  function _isSupported () {
    // assume it's supported
    var supported = true

    try {
      // check if the browser allows access to local storage
      // it should be truthy, and it should be an object
      if (!window.localStorage || !(typeof window.localStorage === 'object')) {
        supported = false
      }
    } catch (e) {
      // chrome throws DOMException
      // edge throws Unspecified error
      supported = false
    }

    return supported
  }

  // export
  __localStorage._isSupported = _isSupported
  window.__localStorage = __localStorage
})()

// cannot overwrite window.localStorage
// eslint-disable-next-line no-unused-vars
var _localStorage = window._localStorage
