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

    if (_isSupported()) {
        // use browser's implementation
        // cannot overwrite window.localStorage
        window._localStorage = window.localStorage;
    } else {
        // mirror functionality with an object

        // internal object to hold data
        var _storage = new Object();

        // object for internal methods
        var __localStorage = new Object();

        /**
         * @param key key to item
         * @param {String} value key's value
         */
        __localStorage.setItem = function(key, value) {
            _storage[key] = String(value);
        }

        /**
         * @return item or null if it does not exist
         */
        __localStorage.getItem = function(key) {
            if (_storage.hasOwnProperty(key)) {
                return _storage[key];
            }
            return null;
        }

        /**
         * @return undefined
         */
        __localStorage.removeItem = function(key) {
            if (_storage.hasOwnProperty(key)) {
                delete _storage[key];
            }
        }

        /**
         * @return undefined
         */
        __localStorage.clear = function() {
            _storage = new Object();
        }

        // cannot overwrite window.localStorage
        window._localStorage = __localStorage;
    }

    /**
     * Check if localStorage is supported by the browser
     * @return {Boolean} true if supported, false otherwise
     */
    function _isSupported() {
        // assume it's supported
        var supported = true;

        try {
            // check if the browser allows access to local storage
            window.localStorage;

            // it should be an object
            if (!(typeof window.localStorage === "object")) {
                supported = false;
            }
        } catch (e) {
            if (e instanceof DOMException) {
                // access is denied for this document
                supported = false;
            }
        }

        return supported;
    }

})();

// cannot overwrite window.localStorage
var _localStorage = window._localStorage;
