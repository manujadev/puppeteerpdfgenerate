
let _ = require('lodash');
const puppeteer = require('puppeteer');

let urlListJson = 
  [
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/testformatting.html"}/*,
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"},
  {"url": "file:///home/manuja/DEV/puppeteerdev/samplepages/html/benchmarkMapUpdate.html"}*/
  ]

async function generatePDF(inputPagURL, outputFileName) {
  console.log('Input URL:', inputPagURL);
  console.log('Output File:', outputFileName);

  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  
  await page.goto(inputPagURL, {
    waitUntil: 'networkidle', 
    networkIdleInflight: 7, 
    networkIdleTimeout: 2000
  });

 
  // Loading the page title
  let pageTitle = '';
  
  pageTitle = await page.evaluate(() => {
    return document.title;
  });

  console.log('TITLE:', pageTitle);

  // // Wait till the expected page title is loaded
  // while (pageTitle !== 'Finished'){
  //     await wait(200);  // Wait 200 miliseconds

  //     pageTitle = await page.evaluate(() => {
  //       return document.title;
  //     });
      
  //     console.log('TITLE:', pageTitle);
  // }

  await page.pdf({path: outputFileName, format: 'A4', displayHeaderFooter:true});

  console.log("PDF Generate COMPLETED");
  browser.close();

};

function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const executeCommand =  function (inputPagURL, outputFileName){
  return new Promise ((resolve, reject)=> {
      generatePDF(inputPagURL, outputFileName)
  });
}

async function loadGenerateRequests() {
  let arrPromises = [];

  for(let urlEntity of urlListJson){
    arrPromises.push(executeCommand(urlEntity.url, './temp/' + Math.random(1, 999) + '.pdf'));
    //await generatePDF(urlEntity.url, './temp/' + Math.random(1, 999) + '.pdf');
  }

  Promise.all(arrPromises)
  .then(function(){
    console.log('Completed all PDF Generations');
  })
  .catch(function(){
    console.error('Failed generating PDFs');
  })
}

loadGenerateRequests();