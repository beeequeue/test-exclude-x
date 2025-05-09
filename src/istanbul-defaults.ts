/** https://github.com/istanbuljs/schema/blob/master/default-exclude.js */
export const defaultExclusions: string[] = [
  "coverage/**",
  "packages/*/test{,s}/**",
  "**/*.d.ts",
  "test{,s}/**",
  "test{,-*}.*",
  "**/*{.,-}test.*",
  "**/__tests__/**",

  /* Exclude common development tool configuration files */
  "**/{ava,babel,nyc}.config.{js,cjs,mjs}",
  "**/jest.config.{js,cjs,mjs,ts}",
  "**/{karma,rollup,webpack}.config.js",
  "**/.{eslint,mocha}rc.{js,cjs}",
]

/** https://github.com/istanbuljs/test-exclude#optionsextension */
export const defaultExtensions: string[] = [".js", ".cjs", ".mjs", ".ts", ".tsx", ".jsx"]
