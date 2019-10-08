/* eslint-env mocha */
/* global chai, sinon, DOMException */

const assert = chai.assert
const expect = chai.expect
const sandbox = sinon.createSandbox({})

// =include ../local-storage-poorlyfill.js

describe('localStorage poorlyfill', function () {
  describe('getting', function () {
    context('item does not exist', function () {
      it('should return null', function () {
        assert.isNull(window.__localStorage.getItem('b'))
      })
    })
  })

  describe('removing', function () {
    context('item does not exist', function () {
      it('should return undefined', function () {
        assert.isUndefined(window.__localStorage.removeItem('c'))
      })
    })

    context('item exists', function () {
      before(function () {
        window.__localStorage.setItem('a', '1')
      })

      it('should return undefined', function () {
        assert.isUndefined(window.__localStorage.removeItem('a'))
      })
    })
  })

  describe('setting and getting', function () {
    after(function () {
      window.__localStorage.removeItem('a')
    })

    it('should set an item', function () {
      window.__localStorage.setItem('a', '1')
    })

    it('should get the item', function () {
      expect(window.__localStorage.getItem('a')).to.equal('1')
    })

    it('should have 1 item', function () {
      expect(Object.keys(window.__localStorage._storage).length).to.equal(1)
    })
  })

  describe('clear', function () {
    context('storage is empty', function () {
      it('should remain empty', function () {
        assert.isUndefined(window.__localStorage.clear())
        assert.isEmpty(window.__localStorage._storage)
      })
    })

    context('storage is not empty', function () {
      before(function () {
        window.__localStorage.setItem('a', '1')
      })

      after(function () {
        sandbox.restore()
      })

      it('should become empty', function () {
        assert.isNotEmpty(window.__localStorage._storage)
        window.__localStorage.clear()
        assert.isEmpty(window.__localStorage._storage)
      })
    })
  })

  describe('_isSupported', function () {
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
        assert.isFalse(window.__localStorage._isSupported(), 'not supported')
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
        assert.isFalse(window.__localStorage._isSupported(), 'not supported')
      })
    })

    context('when _isSupported is true', function () {
      const ls = window.localStorage

      before(function () {
        // localStorage is enabled
        sandbox.replaceGetter(window, 'localStorage', /* istanbul ignore next */ function () {
          return true
        })
      })

      after(function () {
        sandbox.restore()
      })

      it('should use window.localStorage', function () {
        expect(window._localStorage).to.equal(ls)
      })
    })

    context('when _isSupported is false', function () {
      const _ls = window._localStorage

      before(function () {
        // localStorage is disabled
        sandbox.replaceGetter(window, 'localStorage', /* istanbul ignore next */ function () {
          return false
        })
      })

      after(function () {
        sandbox.restore()
      })

      it('should use window._localStorage', function () {
        expect(window._localStorage).to.equal(_ls)
      })
    })
  })
})
