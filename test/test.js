let assert = chai.assert;
let sandbox = sinon.createSandbox({});

//=include ../local-storage-poorlyfill.js

describe('localStorage poorlyfill', function() {
  describe('_isSupported', function() {
    describe('when using window.localStorage throws a DOMException', function() {
      before(function() {
        // localStorage is disabled
        sandbox.replaceGetter(window, 'localStorage', function () {
          throw new DOMException();
        });
      });
      
      after(function() {
        sandbox.restore();
      });
      
      it('should return false', function() {
        assert.equal(window.__localStorage._isSupported(), false);
      });
    });
    
    describe('when window.localStorage is not an object', function() {
      before(function() {
        // localStorage is disabled
        sandbox.replaceGetter(window, 'localStorage', function () {
          // anything that's not of type object, ie boolean
          return false;
        });
      });
      
      after(function() {
        sandbox.restore();
      });
      
      it('should return false', function() {
        assert.equal(window.__localStorage._isSupported(), false);
      });
    });
  });
});
