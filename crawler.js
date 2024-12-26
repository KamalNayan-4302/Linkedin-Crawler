const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    
    await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2' });
    await page.type('#username', '');
    await page.type('#password', '');
    await Promise.all([
        page.click('[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }), 
    ]);

    console.log('Logged in successfully!');


    const profileURL = 'https://www.linkedin.com/in/kamalnayan-ya51/'; 
    await page.goto(profileURL, { waitUntil: 'networkidle2' });

    
    const profileData = await page.evaluate(() => {
        const name = document.querySelector('.text-heading-xlarge')?.innerText || null;
        const jobTitle = document.querySelector('.text-body-medium.break-words')?.innerText || null;
        const location = document.querySelector('.text-body-small.inline.t-black--light.break-words')?.innerText || null;
        const about = document.querySelector('.pv-about__summary-text')?.innerText || null;

        return { name, jobTitle, location, about };
    });

    console.log('Profile Data:', profileData);

    
    await browser.close();
})();
