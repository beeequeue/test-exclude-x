# test-exclude-x

<!--
[![npm](https://img.shields.io/npm/v/test-exclude-x)](https://www.npmjs.com/package/test-exclude-x)
![npm bundle size](https://img.shields.io/bundlejs/size/test-exclude-x)
![node-current](https://img.shields.io/node/v/test-exclude-x)
-->

## Differences to `test-exclude`

- Exclude negation is not supported
  ```ts
  createExcluder({
    exclude: ["*.js", "!file1.js"],
  })
  ```
