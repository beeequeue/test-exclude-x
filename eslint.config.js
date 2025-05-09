import antfu from "@antfu/eslint-config"

const sortImports = {
  "perfectionist/sort-imports": [
    "error",
    {
      type: "natural",
      internalPattern: ["^@/", "^~/", "^#[a-zA-Z0-9-]+/"],
      newlinesBetween: "always",
      groups: [
        ["builtin", "builtin-type"],
        ["external", "external-type"],
        ["internal", "internal-type"],
        ["parent", "parent-type"],
        ["sibling", "sibling-type"],
        ["index", "index-type"],
        "object",
        "unknown",
      ],
    },
  ],
}

export default antfu({
  ignores: ["**/*.json"],
  markdown: false,
  stylistic: false,
  jsonc: false,
  jsx: false,
  toml: false,
  test: { overrides: { "test/no-import-node-test": "off" } },
  javascript: {
    overrides: sortImports,
  },
  typescript: {
    tsconfigPath: "tsconfig.json",
    ignoresTypeAware: ["copy.ts"],
    overrides: {
      "no-console": "off",
      "ts/no-use-before-define": "off",
      "ts/consistent-type-definitions": "off",
      "ts/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "ts/no-unsafe-argument": "off",
      "ts/no-unsafe-assignment": "off",
      "node/prefer-global/process": "off",
      "antfu/no-top-level-await": "off",
      "import/consistent-type-specifier-style": "off",

      "import/extensions": [
        "error",
        {
          js: "never",
          ts: "always",
          cts: "always",
          mts: "always",
          json: "always",
        },
      ],

      ...sortImports,
    },
  },
})
