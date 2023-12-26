const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [
    () => 'tsc --incremental false --noEmit',
    buildEslintCommand,
    'prettier --write',
  ],
  '*.js': (files) => {
    const cwd = process.cwd()
    const relativePaths = files.map((file) => path.relative(cwd, file))

    return `eslint --fix ${relativePaths.join(' ')}`
  },
}
