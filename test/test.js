/* eslint-env mocha */
/* global chai, sinon, DOMException */

// internal implementation
import { _localStorage, _isSupported, _storage } from '../src/local-storage.js'

// local storage methods
const { setItem, getItem, removeItem, clear } = _localStorage

const assert = chai.assert
const expect = chai.expect
const sandbox = sinon.createSandbox({})

describe('localStorage poorlyfill', function () {
  describe('getting', function () {
    context('item does not exist', function () {
      it('should return null', function () {
        assert.isNull(getItem('b'))
      })
    })
  })

  describe('removing', function () {
    context('item does not exist', function () {
      it('should return undefined', function () {
        assert.isUndefined(removeItem('c'))
      })
    })

    context('item exists', function () {
      before(function () {
        setItem('a', '1')
      })

      it('should return undefined', function () {
        assert.isUndefined(removeItem('a'))
      })
    })
  })

  describe('setting and getting', function () {
    after(function () {
      removeItem('a')
    })

    it('should set an item', function () {
      setItem('a', '1')
    })

    it('should get the item', function () {
      expect(getItem('a')).to.equal('1')
    })

    it('should have 1 item', function () {
      expect(Object.keys(_storage).length).to.equal(1)
    })
  })

  describe('clear', function () {
    context('storage is empty', function () {
      it('should remain empty', function () {
        assert.isUndefined(clear())
        assert.isEmpty(_storage)
      })
    })

    context('storage is not empty', function () {
      before(function () {
        setItem('a', '1')
      })

      after(function () {
        sandbox.restore()
      })

      it('should become empty', function () {
        assert.isNotEmpty(_storage)
        clear()
        assert.isEmpty(_storage)
      })
    })
  })

  describe('_isSupported', function () {
    context('when window.localStorage is an object', function () {
      before(function () {
        // localStorage is enabled
        sandbox.replaceGetter(window, 'localStorage', function () {
          return Object()
        })
      })

      after(function () {
        sandbox.restore()
      })

      it('should return true', function () {
        assert.isTrue(_isSupported(), 'is supported')
      })
    })

    context('when window.localStorage is not an object', function () {
      before(function () {
        // localStorage is disabled
        sandbox.replaceGetter(window, 'localStorage', function () {
          // anything that's not of type object, ie boolean
          return false
        })
      })

      after(function () {
        sandbox.restore()
      })

      it('should return false', function () {
        assert.isFalse(_isSupported(), 'not supported')
      })
    })

    context('when using window.localStorage throws a DOMException', function () {
      before(function () {
        // localStorage is disabled
        sandbox.replaceGetter(window, 'localStorage', function () {
          throw new DOMException()
        })
      })

      after(function () {
        sandbox.restore()
      })

      it('should return false', function () {
        assert.isFalse(_isSupported(), 'not supported')
      })
    })

    context('when using window.localStorage throws Unspecified error', function () {
      before(function () {
        // localStorage is disabled
        sandbox.replaceGetter(window, 'localStorage', function () {
          throw new Error()
        })
      })

      after(function () {
        sandbox.restore()
      })

      it('should return false', function () {
        assert.isFalse(_isSupported(), 'not supported')
      })
    })
  })
})
