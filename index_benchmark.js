
let _ = require('lodash');
const puppeteer = require('puppeteer');

let urlListJson = 
  [
  {"url": "https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiMWM1MmUzZGQtNTcxNi00NmY1LTg5NmEtODcxM2VlNTIzYjBkIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJzdSI6Ik1hbnVqYSBKYXlhd2FyZGhhbmEiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDIiLCJpYXQiOjE1MDQ0ODU1MzAsImV4cCI6MTUwNDQ4NzMzMCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.Qf6ZOMQXLoOpWxyKEpvIi5hTc10eosMpajmRHdfZN1MyKhxpdf-3Da64a1cN4SPukyQLvdPJGD_SuCe1XCCndYgJSanOwiBCtHSMmfCcKmJQohUlxzCVsaE_3oZq_AiOYAPa1GSC4XR-Ho5gaB9bCzpiz2U4JTZOBb9d7SzPJzvHVo21P5zSCbLwq8SpHFU6jB_gjTijP-EpS6CynL_MlezZ-ZYNX5gteMz60hFREkBEwOMZvlJxg2kYqI9BRtC6e9cgq7BTDETOpZcGg-04HYig2f1ZBmnlXirJBWrP4UuTu7OiOyPfrYDqaGa-JNbMq3btWTL1fyk3qOghKAQ7bA"},
  {"url": "https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiMWM1MmUzZGQtNTcxNi00NmY1LTg5NmEtODcxM2VlNTIzYjBkIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJzdSI6Ik1hbnVqYSBKYXlhd2FyZGhhbmEiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDIiLCJpYXQiOjE1MDQ0ODU1MzAsImV4cCI6MTUwNDQ4NzMzMCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.Qf6ZOMQXLoOpWxyKEpvIi5hTc10eosMpajmRHdfZN1MyKhxpdf-3Da64a1cN4SPukyQLvdPJGD_SuCe1XCCndYgJSanOwiBCtHSMmfCcKmJQohUlxzCVsaE_3oZq_AiOYAPa1GSC4XR-Ho5gaB9bCzpiz2U4JTZOBb9d7SzPJzvHVo21P5zSCbLwq8SpHFU6jB_gjTijP-EpS6CynL_MlezZ-ZYNX5gteMz60hFREkBEwOMZvlJxg2kYqI9BRtC6e9cgq7BTDETOpZcGg-04HYig2f1ZBmnlXirJBWrP4UuTu7OiOyPfrYDqaGa-JNbMq3btWTL1fyk3qOghKAQ7bA"},
  {"url": "https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiMWM1MmUzZGQtNTcxNi00NmY1LTg5NmEtODcxM2VlNTIzYjBkIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJzdSI6Ik1hbnVqYSBKYXlhd2FyZGhhbmEiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDIiLCJpYXQiOjE1MDQ0ODU1MzAsImV4cCI6MTUwNDQ4NzMzMCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.Qf6ZOMQXLoOpWxyKEpvIi5hTc10eosMpajmRHdfZN1MyKhxpdf-3Da64a1cN4SPukyQLvdPJGD_SuCe1XCCndYgJSanOwiBCtHSMmfCcKmJQohUlxzCVsaE_3oZq_AiOYAPa1GSC4XR-Ho5gaB9bCzpiz2U4JTZOBb9d7SzPJzvHVo21P5zSCbLwq8SpHFU6jB_gjTijP-EpS6CynL_MlezZ-ZYNX5gteMz60hFREkBEwOMZvlJxg2kYqI9BRtC6e9cgq7BTDETOpZcGg-04HYig2f1ZBmnlXirJBWrP4UuTu7OiOyPfrYDqaGa-JNbMq3btWTL1fyk3qOghKAQ7bA"},
  {"url": "https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiMWM1MmUzZGQtNTcxNi00NmY1LTg5NmEtODcxM2VlNTIzYjBkIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJzdSI6Ik1hbnVqYSBKYXlhd2FyZGhhbmEiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDIiLCJpYXQiOjE1MDQ0ODU1MzAsImV4cCI6MTUwNDQ4NzMzMCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.Qf6ZOMQXLoOpWxyKEpvIi5hTc10eosMpajmRHdfZN1MyKhxpdf-3Da64a1cN4SPukyQLvdPJGD_SuCe1XCCndYgJSanOwiBCtHSMmfCcKmJQohUlxzCVsaE_3oZq_AiOYAPa1GSC4XR-Ho5gaB9bCzpiz2U4JTZOBb9d7SzPJzvHVo21P5zSCbLwq8SpHFU6jB_gjTijP-EpS6CynL_MlezZ-ZYNX5gteMz60hFREkBEwOMZvlJxg2kYqI9BRtC6e9cgq7BTDETOpZcGg-04HYig2f1ZBmnlXirJBWrP4UuTu7OiOyPfrYDqaGa-JNbMq3btWTL1fyk3qOghKAQ7bA"},
  {"url": "https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiMWM1MmUzZGQtNTcxNi00NmY1LTg5NmEtODcxM2VlNTIzYjBkIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJzdSI6Ik1hbnVqYSBKYXlhd2FyZGhhbmEiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDIiLCJpYXQiOjE1MDQ0ODU1MzAsImV4cCI6MTUwNDQ4NzMzMCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.Qf6ZOMQXLoOpWxyKEpvIi5hTc10eosMpajmRHdfZN1MyKhxpdf-3Da64a1cN4SPukyQLvdPJGD_SuCe1XCCndYgJSanOwiBCtHSMmfCcKmJQohUlxzCVsaE_3oZq_AiOYAPa1GSC4XR-Ho5gaB9bCzpiz2U4JTZOBb9d7SzPJzvHVo21P5zSCbLwq8SpHFU6jB_gjTijP-EpS6CynL_MlezZ-ZYNX5gteMz60hFREkBEwOMZvlJxg2kYqI9BRtC6e9cgq7BTDETOpZcGg-04HYig2f1ZBmnlXirJBWrP4UuTu7OiOyPfrYDqaGa-JNbMq3btWTL1fyk3qOghKAQ7bA"}
  ]

async function generatePDF(inputPagURL, outputFileName) {
  console.log('Input URL:', inputPagURL);
  console.log('Output File:', outputFileName);
  
      let browser = await puppeteer.launch({'ignoreHTTPSErrors': true});
      let page = await browser.newPage();
    
      try {
      await page.goto(inputPagURL, {
        waitUntil: 'networkidle'
      });
    }
    catch(error){
      console.log('PAGE GOTO ERROR:', error.message);
    }

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

    try {
      await page.pdf({path: outputFileName, format: 'A4', displayHeaderFooter:true});
    }
    catch(error){
      console.log('PDF GENERATE ERROR:', error.message);
    }
    
    console.log("PDF Generate COMPLETED");

    try {
      await page.close();
      
      browser.close();
    }
    catch(error){
      console.log('PAGE CLOSE ERROR:', error.message);
    }

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