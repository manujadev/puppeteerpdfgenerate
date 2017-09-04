let _ = require('lodash');
const puppeteer = require('puppeteer');

function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

(async () => {
  const browser = await puppeteer.launch({'ignoreHTTPSErrors': true});
  const page = await browser.newPage();

  let timeStart = new Date();

  // Call the page launch   
  await page.goto('https://beach-melb:9000/signin?genreport=yes&targetProp=50073484&dataRegion=VIC_M&reportType=site&authToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiMWM1MmUzZGQtNTcxNi00NmY1LTg5NmEtODcxM2VlNTIzYjBkIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJzdSI6Ik1hbnVqYSBKYXlhd2FyZGhhbmEiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDIiLCJpYXQiOjE1MDQ0ODU1MzAsImV4cCI6MTUwNDQ4NzMzMCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.Qf6ZOMQXLoOpWxyKEpvIi5hTc10eosMpajmRHdfZN1MyKhxpdf-3Da64a1cN4SPukyQLvdPJGD_SuCe1XCCndYgJSanOwiBCtHSMmfCcKmJQohUlxzCVsaE_3oZq_AiOYAPa1GSC4XR-Ho5gaB9bCzpiz2U4JTZOBb9d7SzPJzvHVo21P5zSCbLwq8SpHFU6jB_gjTijP-EpS6CynL_MlezZ-ZYNX5gteMz60hFREkBEwOMZvlJxg2kYqI9BRtC6e9cgq7BTDETOpZcGg-04HYig2f1ZBmnlXirJBWrP4UuTu7OiOyPfrYDqaGa-JNbMq3btWTL1fyk3qOghKAQ7bA',
  {
    waitUntil: 'networkidle'
  });

  // Loading the page title
  let pageTitle = '';

  pageTitle = await page.evaluate(() => {
    return document.title;
  });

  console.log('PAGE TITLE:', pageTitle);

  // Wait till the expected page title is loaded
  while (pageTitle.startsWith("LOADING") || pageTitle.startsWith("OneMap") || pageTitle.startsWith("FAILED") || pageTitle.startsWith("WARNING")){
      await wait(200);  // Wait 200 miliseconds

      pageTitle = await page.evaluate(() => {
        return document.title;
      });
      
      console.log('TITLE:', pageTitle);
  }

  //await page.setExtraHTTPHeaders([{'authToken':'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiZTlhM2VkYTYtYzQ5Yi00NGFhLTllZTQtNWE1ZTIwOGJjNDRlIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJzdSI6Ik1hbnVqYSBKYXlhd2FyZGhhbmEiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDQiLCJpYXQiOjE1MDQyMjM3OTIsImV4cCI6MTUwNDIyNTU5MiwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.F80Ct3NjNg8vhjSXWpGMheqfV5KkfwA9WpmLZJcE7ybBDJs95ARiS4dh3gm9g555Dpa-ekxonejcm0t93GCGWHRqSu_mDOAXvELO2_Vi4QpX5QQcmm4fhbAJU4OM9V6majrUtgJpFYMDk00-j6D4Rpy8G19NN8N4vptykjVxnFiD3lJG6PiaurHqCrVWekzVQghG-NRZTgc9Rpv8FDXRSennue7Bx7fiSwoyoc71j723bAribKMc3sE29vNe8UXiShWjYKDRXc203uf5KG1p1hvLrfqF1AcC2gPoyaOxF6AJ04WDOC45l8fLEO_squjCEPd4CKfMvk54pEs4sfk05w'}]);

  // Call PDF generation
  await page.pdf(
    {
      path: './temp/' + (Math.random(1, 999) * Math.pow(10, 16)) + '.pdf',
      format: 'A4',
      displayHeaderFooter:true,
      margin: { top: '10mm',
                bottom:'10mm'}
    });

  let timeEnd = new Date();

  console.log('TIME TAKEN:' + ((timeEnd- timeStart) / 1000)+ ' MILISECONDS');

  browser.close();
})();

