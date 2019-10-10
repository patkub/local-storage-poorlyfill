import { _localStorage, _isSupported } from './local-storage.js'

if (_isSupported()) {
  // use browser's implementation
  // cannot overwrite window.localStorage
  window._localStorage = window.localStorage
} else {
  // mirror functionality with an object
  // cannot overwrite window.localStorage
  window._localStorage = _localStorage
}
