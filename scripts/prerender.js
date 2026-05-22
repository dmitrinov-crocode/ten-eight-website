// Runs react-snap with an environment-aware Chrome path.
//
// Why a script instead of package.json -> reactSnap.puppeteerExecutablePath:
// that field is a single hardcoded path, which can't be valid both locally
// (macOS Chrome) and on CI/Vercel (Linux). Here we resolve it at runtime.
//
// Resolution order:
//   1. PUPPETEER_EXECUTABLE_PATH env var (explicit override),
//   2. the local macOS Google Chrome, if installed,
//   3. otherwise undefined -> puppeteer's bundled Chromium (downloaded on
//      `npm install`, which is what CI/Vercel uses).
const fs = require('fs');
const path = require('path');
const { run } = require('react-snap');

const pkg = require(path.resolve(__dirname, '..', 'package.json'));

function resolveChromePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (fs.existsSync(macChrome)) {
    return macChrome;
  }
  return undefined;
}

const options = { ...pkg.reactSnap };
const chromePath = resolveChromePath();
if (chromePath) {
  options.puppeteerExecutablePath = chromePath;
} else {
  delete options.puppeteerExecutablePath;
}

run(options).catch((err) => {
  console.error(err);
  process.exit(1);
});
