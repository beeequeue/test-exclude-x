# test-exclude-x

<!--
[![npm](https://img.shields.io/npm/v/test-exclude-x)](https://www.npmjs.com/package/test-exclude-x)
![npm bundle size](https://img.shields.io/bundlejs/size/test-exclude-x)
![node-current](https://img.shields.io/node/v/test-exclude-x)
-->

## Goal

- Re-implement `test-exclude` using tinyglobby and picomatch.
- Do not support silly ideas like exclusion negation becomes inclusion.
- Pass relevant tests from
  - test-exclude
  - c8

## Differences to `test-exclude`

- Exclude negation is not supported
  ```ts
  // Matches file1.js, file2.json
  new TextExcluder({
    exclude: ["*.js", "!file1.js", "!file2.json"],
  })
  ```
