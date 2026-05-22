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

// Headless-Chrome prerendering can't run on most CI/serverless build images
// (e.g. Vercel) because their containers lack Chromium's shared libraries
// (libnss3 et al.) and can't apt-install them. Skip prerendering there and
// ship the plain CRA SPA. Local builds (and Netlify) still prerender.
const isCI =
  !!process.env.VERCEL ||
  (process.env.CI && process.env.CI !== 'false' && process.env.CI !== '0');
if (isCI) {
  console.log('prerender: CI/serverless detected, skipping react-snap.');
  process.exit(0);
}

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
