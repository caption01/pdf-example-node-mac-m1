const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Lunch Start')

  const browser = await puppeteer.launch(
    {
        executablePath: '/usr/bin/chromium',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

  console.log('Lunch Success')
 
  const page = await browser.newPage();

  //Get HTML content from HTML file
  const html = fs.readFileSync('./src/sample.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  console.log('Setup Screen', { html })

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  console.log('Capture Screen')

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: './src/result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  console.log({ pdf })

  // Close the browser instance
  await browser.close();

  console.log('Close')
})();