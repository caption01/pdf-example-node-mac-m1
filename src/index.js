const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {

  try {
    // Create a browser instance
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  // Create a new page
  const page = await browser.newPage();

  //Get HTML content from HTML file
  const html = fs.readFileSync('./src/sample.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();
  } catch (error) {
    console.log('Error To Run!', error)
  }
  
})();