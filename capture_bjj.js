const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://lorenzoregazzi2007-bit.github.io/DominvsBjj', { waitUntil: 'networkidle2' });
  
  // Hide cookie banner if it exists
  await page.evaluate(() => {
    const banners = document.querySelectorAll('[class*="cookie"], [id*="cookie"]');
    banners.forEach(b => b.style.display = 'none');
  });

  await page.screenshot({ path: 'assets/dominvs.png' });

  await browser.close();
  console.log('Home BJJ captured');
})();
