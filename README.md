# local-storage-poorlyfill

[![Build Status](https://travis-ci.org/patkub/local-storage-poorlyfill.svg?branch=master)](https://travis-ci.org/patkub/local-storage-poorlyfill)
[![Greenkeeper badge](https://badges.greenkeeper.io/patkub/local-storage-poorlyfill.svg)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/patkub/local-storage-poorlyfill/status.svg)](https://david-dm.org/patkub/local-storage-poorlyfill)
[![devDependencies Status](https://david-dm.org/patkub/local-storage-poorlyfill/dev-status.svg)](https://david-dm.org/patkub/local-storage-poorlyfill?type=dev)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

In-memory polyfill for local storage

Add to your project:

`npm i local-storage-poorlyfill`

```html
<script type="text/javascript" src="node_modules/local-storage-poorlyfill/dist/local-storage-poorlyfill.js"></script>
<script>
// use _localStorage
</script>
```

### Why?

- For local files, IE and Edge do not have support for local storage

- local storage can be disabled

### Tested browsers

- Chrome, Firefox, Internet Explorer, Edge, Safari and Opera

### Implementation details

- Use browser's native implementation if supported

- Mirror native functionality with an object

### Implementation flaws

- Not persistent

- Need to use `_localStorage` instead of `localStorage`

### Scripts

Lint with standard:
```
yarn lint
```

Transpile with babel:
```
yarn build
```

Run unit tests:
```
yarn test
```

Use `_localStorage` or `window._localStorage` instead of `localStorage` or `window.localStorage` because the browser prevents using `localStorage` or `window.localStorage` if access is denied for this document.

W3 Spec:
- https://www.w3.org/TR/webstorage/#storage

MSDN:
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Local_storage
