const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  if (!fs.existsSync('assets')) {
    fs.mkdirSync('assets');
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Dominvs BJJ
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://lorenzoregazzi2007-bit.github.io/DominvsBjj', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'assets/dominvs.png' });

  // WRF
  // Set mobile viewport for WRF App
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('https://lorenzoregazzi2007-bit.github.io/WRF', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'assets/wrf.png' });

  // Simulator
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://lorenzoregazzi2007-bit.github.io/simulator-tempi-macchina', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'assets/simulator.png' });

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
