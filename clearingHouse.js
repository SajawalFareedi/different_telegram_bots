const { Browser, Page } = require("puppeteer");
const createBrowser = require("./common");
const { getData } = require("./utils");

/**
 * @param {Browser} browser
 * @param {Page} page
 */
// TODO: Stopping development because required email verification
const clearingHouseBot = async (browser, page) => {
    try {
        const data = await getData();
        const selectors = {
            "email_input": '#user_email',
            "accept_terms": "#user_terms_accepted",
            "form_submit_btn": 'button[type="submit"]',

            "name_input": 'input[data-qa="name"]',
            "password_input": 'input[data-qa="password"]',
        }

        await page.goto("https://secure.login.gov/sign_up/enter_email");

        await page.type(selectors.email_input, data.email);
        await page.click(selectors.accept_terms);

        await page.click(selectors.form_submit_btn);
        await page.waitForTimeout(1100);

    } catch (error) {
        console.error(error);
    }
}

module.exports = async () => {
    const b = await createBrowser();
    if (!b) { console.error("Error while launching puppeteer browser!") };
    const { browser, page } = b;

    await clearingHouseBot(browser, page);
}