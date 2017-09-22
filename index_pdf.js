let _ = require('lodash');
const puppeteer = require('puppeteer');

var inputURL = process.argv[2];
if(!inputURL)
  return;
else 
  console.log('inputURL:', inputURL);



function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

(async () => {
  const browser = await puppeteer.launch({'ignoreHTTPSErrors': true, headless: true});
  const page = await browser.newPage();

  let timeStart = new Date();


  //await page.setRequestInterceptionEnabled(true);

  //await page.setExtraHTTPHeaders({'authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERXNNVjFkTEZ0Yk1Dd3dYVjFkIn0sInNrIjoiNjljMDQwNmYtMDJlOS00YTc4LWIwZGItNDNkZDdlY2NhMGVjIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDMiLCJpYXQiOjE1MDU4OTA0MDksImV4cCI6MTUwNTg5MjIwOSwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.nN0oOzWncBXdIxj9JhWBea0a_jCN5eTl_RM1KWRTPqn_pNUMY9vxwZxjJvsDeIqN2oaLyAsYd7fwFkuW1e-MRVHtWdnJ-eM8ksoxN86IkylB6BNAONzp3_Uxl_cnUupCA0JoUmiF-NX-dYATssHhWzZ_et1A9f_wJWutKKaLy0q680DbPRkf7lh3rxW5rwNQ4jlXhUO9ZEeCva-qHAN-FPEaMV63i6UkV-ifp3VsT0-T1nhMMsuQVK5dvmgD8eqJ4OMGOdWisWu3wDP8sMNSbnh8rrrN-_szLD6tPsWx2WS_Ffdsx4Y5Re-K3Gzv1vG7kOkXCs3Uw3DnQPic0rdjEA'});


  // Call the page launch   
  try {  
    await page.goto(inputURL,
    {
      timeout: 40000,
      waitUntil: 'networkidle'
    });
  }
  catch(error){
    console.log('PAGE GOTO ERROR:', error.message);
  }


  // try {  
  //   page.on('request', req => {
  //     let headers = req.headers;
  //     headers['authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzZXR0aW5ncyI6eyJkYXRhUmVnaW9ucyI6WyJRTERfQiIsIk5TV19TIiwiVklDX0IiLCJWSUNfRyIsIlZJQ19NIl0sImhhc0N1c3RvbUxheWVycyI6InRydWUiLCJBdXRoMFByb2ZpbGUiOnRydWUsIkF1dGgwR3JvdXBzIjpbIlRyYWN0X0RldlVzZXJfQW5hbHl0aWNfR3JvdXAiLCJPcmdfQ2hhcnRlcktDX0N1c3RvbV9EYXRhX0FwdCJdLCJBdXRoMElEIjoiYXV0aDB8NTk3ZTg0ZDZhZGUwNTcxMDk1MDA1ODI5Iiwib3JnYW5pc2F0aW9uIjoiVFJBQ1QiLCJkZWZhdWx0Q2l0eSI6IlZJQ19NIiwiZGF0YVJlZ2lvbiI6IlZJQ19NIiwidWFkYXRhaW5hYyI6IlcxdGJNQ3d3TERBc01Dd3dMREFzTUN3d0xERmRYU3hiV3pBc01GMHNXekFzTUN3d0xEQXNNRjBzV3pBc01Dd3dMREJkTEZzeExERmRYU3hiV3pBc01GMWRYUT09In0sInNrIjoiMTNjMDllMzQtMGQ0YS00M2QyLWI0NTEtZmI5ZWM0MGYwN2NhIiwic3ViIjoibWpheWF3YXJkaGFuYUB0cmFjdC5uZXQuYXUiLCJzdSI6Ik1hbnVqYSBKYXlhd2FyZGhhbmEiLCJhbGlhcyI6ImFwcF9rZXlzL29uZW1hcDMiLCJpYXQiOjE1MDU4MDQ4MjAsImV4cCI6MTUwNTgwNjYyMCwiaXNzIjoib25lbWFwLmNvbS5hdSJ9.XrbxuDG0E8P_ImIQojky7uflsXTEOyuC9YAoIQS5CR4JMOIHM3RjbLu5KYXWvt6HlKFpbzikLwMXNkFbm_I8KpwnoFtK8KmQyzX1Ir_DHKP9W_DE-W1yUsl1AZzn8c1iUTnfalOpCk6Pcr9RM1Xf8-yGG30GKsB3R0D4EaKPrOZcyQ92i_0WhagZf6A_CRbVVLgb0-Ruo2vIFP7_Tepz8k81rMAg5-esNqUiPfQcrwriL9vIaMbqROXXR7e_zhfUfqOetVsw3c-bYsnM_Tll_wkkkkdEr7rfbj572o96VkIoWfzSxFWtQaYJrOXVDKzdqZXVhcu6q1epZ36FDLX9yQ';
  //     req.continue({
  //       headers: headers
  //     });
  //     console.log('Headers:', headers);
  //   });
  // }
  // catch(error){
  //   console.log('PAGE ON REQUEST:', error.message);
  // }

  // Loading the page title
  let pageTitle = '';

  pageTitle = await page.evaluate(() => {
    return document.title;
  });

  console.log('PAGE TITLE:', pageTitle);

    let timeConsumed = (new Date() - timeStart) / 1000

  // Wait till the expected page title is loaded
  while (timeConsumed < 60 && (pageTitle.startsWith("LOADING") || pageTitle.startsWith("OneMap") || pageTitle.startsWith("FAILED") || pageTitle.startsWith("WARNING"))){
      await wait(200);  // Waidt 200 miliseconds

      pageTitle = await page.evaluate(() => {
        return document.title;
      });
      
      timeConsumed = (new Date() - timeStart)/ 1000;
      console.log('TIME CONSUMED', timeConsumed);
      console.log('TITLE:', pageTitle);
  }
 

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

  console.log('TIME TAKEN:' + ((timeEnd- timeStart) / 1000)+ ' SECONDS');

  browser.close();
})();