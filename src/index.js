const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path')

const currentWorkDir = __dirname
const htmlDir = path.join(currentWorkDir, 'template', 'sample.html')
const pdfOutDir = path.join(currentWorkDir, 'out', 'result.pdf')

async function main(){
  console.log('Lunch Start', { currentWorkDir, htmlDir })

  const browser = await puppeteer.launch(
    {
        executablePath: '/usr/bin/chromium',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

  console.log('Lunch Success')
 
  const page = await browser.newPage();

  //Get HTML content from HTML file
  const html = fs.readFileSync(htmlDir, 'utf-8');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  console.log('Capture Screen')

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: pdfOutDir,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  console.log('Generated pdf')

  // Close the browser instance
  await browser.close();

  console.log('Closed browser')
}

main()