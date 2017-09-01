
let _ = require('lodash');
const puppeteer = require('puppeteer');

let urlListJson = 
  [
  {"url": "https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiNmViYTdhNDktMDE5ZS00ZmM5LTk4ZDEtNDhkNTljMTA3MTYzIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDQiLCJpYXQiOjE1MDQxNjM2ODAsImV4cCI6MTUwNDE2NTQ4MCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.3T7x_O0kOtoyQgM8pzMWl9SkxdNj3P_WzRtsURp7XD9GlD-QAAdONJ8LGO046IvJS4Ne6izQB6McaZSu2QUTlJfge2Vyo1MA9NduG7JXSftYi6uzOR2OOGfeLkCCDsqBT01sk0QsAgWj54HCqDzP3dqEa46dDXVG5oNQU4BNfQGsXMu7LupQAzCTtw_x3yVWB_kdfiN_uYJJHwHhj3hSHjzDw1TI5vqq2INKm2j3iUmopc8_gY3MMEYcYwjz82N3XEApxQFfvQJBlbewHeIT6HYVBbuOclR-vniU8WTcpkClHlLgGL-8Lm34YcwvSWH_Vtdo-g0RLv90fy1fi9smBw"},
  {"url": "https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiNmViYTdhNDktMDE5ZS00ZmM5LTk4ZDEtNDhkNTljMTA3MTYzIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDQiLCJpYXQiOjE1MDQxNjM2ODAsImV4cCI6MTUwNDE2NTQ4MCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.3T7x_O0kOtoyQgM8pzMWl9SkxdNj3P_WzRtsURp7XD9GlD-QAAdONJ8LGO046IvJS4Ne6izQB6McaZSu2QUTlJfge2Vyo1MA9NduG7JXSftYi6uzOR2OOGfeLkCCDsqBT01sk0QsAgWj54HCqDzP3dqEa46dDXVG5oNQU4BNfQGsXMu7LupQAzCTtw_x3yVWB_kdfiN_uYJJHwHhj3hSHjzDw1TI5vqq2INKm2j3iUmopc8_gY3MMEYcYwjz82N3XEApxQFfvQJBlbewHeIT6HYVBbuOclR-vniU8WTcpkClHlLgGL-8Lm34YcwvSWH_Vtdo-g0RLv90fy1fi9smBw"},
  {"url": "https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiNmViYTdhNDktMDE5ZS00ZmM5LTk4ZDEtNDhkNTljMTA3MTYzIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDQiLCJpYXQiOjE1MDQxNjM2ODAsImV4cCI6MTUwNDE2NTQ4MCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.3T7x_O0kOtoyQgM8pzMWl9SkxdNj3P_WzRtsURp7XD9GlD-QAAdONJ8LGO046IvJS4Ne6izQB6McaZSu2QUTlJfge2Vyo1MA9NduG7JXSftYi6uzOR2OOGfeLkCCDsqBT01sk0QsAgWj54HCqDzP3dqEa46dDXVG5oNQU4BNfQGsXMu7LupQAzCTtw_x3yVWB_kdfiN_uYJJHwHhj3hSHjzDw1TI5vqq2INKm2j3iUmopc8_gY3MMEYcYwjz82N3XEApxQFfvQJBlbewHeIT6HYVBbuOclR-vniU8WTcpkClHlLgGL-8Lm34YcwvSWH_Vtdo-g0RLv90fy1fi9smBw"},
  {"url": "https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiNmViYTdhNDktMDE5ZS00ZmM5LTk4ZDEtNDhkNTljMTA3MTYzIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDQiLCJpYXQiOjE1MDQxNjM2ODAsImV4cCI6MTUwNDE2NTQ4MCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.3T7x_O0kOtoyQgM8pzMWl9SkxdNj3P_WzRtsURp7XD9GlD-QAAdONJ8LGO046IvJS4Ne6izQB6McaZSu2QUTlJfge2Vyo1MA9NduG7JXSftYi6uzOR2OOGfeLkCCDsqBT01sk0QsAgWj54HCqDzP3dqEa46dDXVG5oNQU4BNfQGsXMu7LupQAzCTtw_x3yVWB_kdfiN_uYJJHwHhj3hSHjzDw1TI5vqq2INKm2j3iUmopc8_gY3MMEYcYwjz82N3XEApxQFfvQJBlbewHeIT6HYVBbuOclR-vniU8WTcpkClHlLgGL-8Lm34YcwvSWH_Vtdo-g0RLv90fy1fi9smBw"}
  ]

async function generatePDF(inputPagURL, outputFileName) {
  console.log('Input URL:', inputPagURL);
  console.log('Output File:', outputFileName);

  let browser = await puppeteer.launch({'ignoreHTTPSErrors': true});
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

  // Wait till the expected page title is loaded
  while (pageTitle.startsWith("LOADING") || pageTitle.startsWith("OneMap") || pageTitle.startsWith("FAILED") || pageTitle.startsWith("WARNING")){
      await wait(200);  // Wait 200 miliseconds

      pageTitle = await page.evaluate(() => {
        return document.title;
      });
      
      console.log('TITLE:', pageTitle);
  }

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
    arrPromises.push(executeCommand(urlEntity.url, './temp/' + (Math.random(1, 999) * Math.pow(10, 16)) + '.pdf'));
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