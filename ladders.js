const { Browser, Page } = require("puppeteer");
const createBrowser = require("./common");
const { getData, sleep } = require("./utils");

/**
 * @param {Browser} browser
 * @param {Page} page
 */
const laddersBot = async (browser, page) => {
    try {
        const data = await getData();

        const selectors = {
            "email": 'input[name="customer[email]"]',
            "password": 'input[name="customer[password]"]',
            "firstName": 'input[name="customer[first_name]"]',
            "lastName": 'input[name="customer[last_name]"]',
            "submitBtn": "form#create_customer button",
        }

        await page.goto("https://www.littlegiantladders.com/account/register", { waitUntil: "networkidle0" });
        await sleep(0.6);

        await page.type(selectors.firstName, data.firstName);
        await page.type(selectors.lastName, data.lastName);
        await page.type(selectors.email, data.email);
        await page.type(selectors.password, data.password);

        const result = await page.solveRecaptchas();
        console.info(result);

        await page.$eval('#create_customer', form => form.submit());
        await sleep(1.5);

        if (page.url().indexOf("/challenge") !== -1) {
            const result = await page.solveRecaptchas();
            console.info(result);
            await page.$eval('input[type="submit"]', btn => btn.click());
        }

        return "success";

    } catch (error) {
        console.error(error);
        return String(error);
    }
}

// module.exports = async () => {
//     const b = await createBrowser();
//     if (!b) { console.error("Error while launching puppeteer browser!") };
//     const { browser, page } = b;

//     return await laddersBot(browser, page);
// }

(async () => {
    const b = await createBrowser();
    if (!b) { console.error("Error while launching puppeteer browser!") };
    const { browser, page } = b;

    const result = await laddersBot(browser, page);
    console.log(result);
})()