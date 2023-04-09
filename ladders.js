const { Browser, Page } = require("puppeteer");
const createBrowser = require("./common");
const { getData } = require("./utils");

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

        await page.goto("https://www.littlegiantladders.com/account/register");

        await page.type(selectors.email, data.email);
        await page.type(selectors.password, data.password);
        await page.type(selectors.firstName, data.firstName);
        await page.type(selectors.lastName, data.lastName);

        await page.click(selectors.submitBtn);
        await page.waitForTimeout(1100);

        if (page.url().indexOf("/challenge") !== -1) {
            const result = await page.solveRecaptchas();
            console.info(result);
        }

        return "success";

    } catch (error) {
        console.error(error);
        return String(error);
    }
}

module.exports = async () => {
    const b = await createBrowser();
    if (!b) { console.error("Error while launching puppeteer browser!") };
    const { browser, page } = b;

    return await laddersBot(browser, page);
}
