// strict mode
'use strict'

// internal object to hold data
let _storage = {}

/**
 * @param key key to item
 * @param {String} value key's value
 */
const setItem = function (key, value) {
  _storage[key] = String(value)
}

/**
 * @return item or null if it does not exist
 */
const getItem = function (key) {
  if (Object.prototype.hasOwnProperty.call(_storage, key)) {
    return _storage[key]
  }
  return null
}

/**
 * @return undefined
 */
const removeItem = function (key) {
  if (Object.prototype.hasOwnProperty.call(_storage, key)) {
    delete _storage[key]
  }
  return undefined
}

/**
 * @return undefined
 */
const clear = function () {
  _storage = {}
}

/**
 * Check if localStorage is supported by the browser
 * @return {Boolean} true if supported, false otherwise
 */
const _isSupported = function () {
  // assume it's supported
  var supported = true

  try {
    // check if the browser allows access to local storage
    // it should be truthy, and it should be an object
    // ie window.localStorage is undefined
    if (!window.localStorage || !(typeof window.localStorage === 'object')) {
      supported = false
    }
  } catch (e) {
    // chrome and opera throw DOMException
    // safari throws SecurityError
    // edge throws Unspecified error
    supported = false
  }

  return supported
}

// local storage methods
const _localStorage = {
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem,
  clear: clear
}

// export
export {
  _localStorage,
  _isSupported,
  _storage
}
