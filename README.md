# local-storage-poorlyfill

[![Build Status](https://travis-ci.org/patkub/local-storage-poorlyfill.svg?branch=master)](https://travis-ci.org/patkub/local-storage-poorlyfill)

in-memory polyfill for local storage

### Why?

- IE does not have support for local storage

### Implementation details

- Use browser's native implementation if supported

- Mirror native functionality with an object

### Implementation flaws

- Not persistent

- Need to use `_localStorage` instead of `localStorage`

Use `_localStorage` or `window._localStorage` instead of `localStorage` or `window.localStorage` because the browser prevents using `localStorage` or `window.localStorage` if access is denied for this document.

W3 Spec:
- https://www.w3.org/TR/webstorage/#storage

MSDN:
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Local_storage
