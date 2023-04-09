const { Browser, Page } = require("puppeteer");
const createBrowser = require("./common");
const { getData } = require("./utils");

/**
 * @param {Browser} browser
 * @param {Page} page
 */
const gozAroundBot = async (browser, page) => {
    try {
        const data = await getData();

        const selectors = {
            "email": 'input[name="data[User][email]"]',
            "password": 'input[name="data[User][pass]"]',
            "firstName": 'input[name="data[User][first_name]"]',
            "lastName": 'input[name="data[User][last_name]"]',
            "agreeTerms": '#terms_check',
            "submitBtn": "#userregistration1",
            "confirmationText": "#log_id",
        }

        await page.goto("https://www.gozaround.com/users/register");

        await page.type(selectors.email, data.email);
        await page.type(selectors.password, data.password);
        await page.type(selectors.firstName, data.firstName);
        await page.type(selectors.lastName, data.lastName);

        await page.click(selectors.agreeTerms);

        await page.click(selectors.submitBtn);
        await page.waitForTimeout(1100);
        
        await page.waitForSelector(selectors.confirmationText, { timeout: 60000 });

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

    return await gozAroundBot(browser, page);
}
