import pico from "picomatch"
import { glob as tinyGlob, globSync as tinyGlobSync } from "tinyglobby"

import { defaultExclusions, defaultExtensions } from "./istanbul-defaults.ts"

type ExcluderOptions = {
  /** The base directory in which all matches are performed */
  cwd?: string
  /** Array of path globs to be ignored. Note this list does not include node_modules which is added separately. */
  exclude?: string[]
  include?: string[]
  extension?: string[]
  relativePath?: boolean
  excludeNodeModules?: boolean
}

export const createExcluder = ({
  include = ["**/*"],
  exclude = defaultExclusions,
  extension = defaultExtensions,
  relativePath = true,
  excludeNodeModules = true,
}: ExcluderOptions = {}) => {
  let realInclude: string[] = []
  const realExclude = [...exclude]

  if (excludeNodeModules) {
    realExclude.push("**/node_modules/**")
  }

  const negatedIncludes = realInclude.filter((pattern) => pattern[0] === "!")
  if (negatedIncludes.length !== 0) {
    realExclude.push(...negatedIncludes.map((pattern) => pattern.slice(1)))
    realInclude = realInclude.filter((pattern) => pattern[0] !== "!")
  }

  const matchInclude = pico(realInclude, {
    ignore: exclude,
    nonegate: true,
  })

  const matchExtensions = pico(`*.{${extension.join(",")}}`, {
    basename: true,
    noext: true,
    nonegate: true,
    noquantifiers: true,
  })

  const shouldInstrument = (filename: string): boolean =>
    matchInclude(filename) && matchExtensions(filename)

  const glob = async (cwd?: string): Promise<string[]> =>
    tinyGlob({
      patterns: realInclude,
      cwd,
      dot: true,
      onlyFiles: true,
      ignore: realExclude,
    })

  const globSync = (cwd?: string): string[] =>
    tinyGlobSync({
      patterns: realInclude,
      cwd,
      dot: true,
      onlyFiles: true,
      ignore: realExclude,
    })

  return {
    extension: extension as readonly string[],
    shouldInstrument: shouldInstrument as (filename: string) => boolean,
    glob: glob as (cwd?: string) => Promise<string[]>,
    globSync: globSync as (cwd?: string) => string[],
  }
}
