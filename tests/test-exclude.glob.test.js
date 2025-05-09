/* eslint-disable antfu/no-import-dist */
import assert from "node:assert"
import path from "node:path"
import { it } from "node:test"

import { createExcluder } from "../dist/index.mjs"

const cwd = path.join(import.meta.dirname, "fixtures/glob")
const extension = [".js"]

const testHelper = async (options, expectedFiles, cwd) => {
  const { glob, globSync } = createExcluder({ ...options, cwd }) // Pass cwd here

  const sync = globSync(cwd)
  const notSync = await glob(cwd)

  // Sort results for consistent comparison
  assert.deepEqual(sync, expectedFiles)
  assert.deepEqual(notSync, expectedFiles)
}

const cases = [
  { label: "js files", options: { cwd, extension } },
  {
    label: "json files",
    options: { cwd, extension: [".json"] },
    expected: ["file1.js", "file2.js"],
  },
  {
    label: "no extension",
    options: { cwd, extension: [] },
    expected: [".nycrc", "file1.js", "file2.js", "package.json"],
  },
  {
    label: "js and json files",
    options: { cwd, extension: [".js", ".json"] },
    expected: ["file1.js", "file2.js", "package.json"],
  },
  {
    label: "absolute constructor cwd",
    options: { cwd: path.join(process.cwd(), "tests") },
    cwd,
    expected: ["file1.js", "file2.js"],
  },
]
for (const { label, options, cwd, expected } of cases) {
  it(label, async () => testHelper(options, expected, cwd))
}

it("applies exclude rule ahead of include rule", async () =>
  testHelper(
    {
      include: ["file1.js", "file2.js"],
      exclude: ["file1.js"],
      extension,
    },
    ["file2.js"],
    cwd,
  ))

it("allows node_modules folder to be included, if !node_modules is explicitly provided", async () =>
  testHelper(
    {
      exclude: ["!node_modules"],
      extension,
    },
    [
      "file1.js",
      "file2.js",
      "node_modules/something/index.js",
      "node_modules/something/other.js",
    ],
    cwd,
  ))

it(
  "allows specific node_modules folder to be included, if !node_modules is explicitly provided",
  { only: true },
  async () =>
    testHelper(
      {
        include: ["node_modules/something/other.js"],
        exclude: [],
        extension,
        excludeNodeModules: false,
      },
      ["file1.js", "file2.js", "node_modules/something/other.js"],
      cwd,
    ),
)

// Will probably not support this
it("allows negated exclude patterns", { skip: true }, async () =>
  testHelper(
    {
      exclude: ["*.js", "!file1.js"],
      extension,
    },
    ["file1.js"],
    cwd,
  ),
)

it("allows negated include patterns", async () =>
  testHelper(
    {
      include: ["*.js", "!file2.js"],
      extension,
    },
    ["file1.js"],
    cwd,
  ))
