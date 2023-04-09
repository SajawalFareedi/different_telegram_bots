const { Browser, Page } = require("puppeteer");
const createBrowser = require("./common");
const { getData } = require("./utils");

/**
 * @param {Browser} browser
 * @param {Page} page
 */
// TODO: Stopping the development of this bot because Bob said. The website need job title and location which isn't available at the moment...
const fairyGodBossBot = async (browser, page) => {
    try {
        const data = await getData();
        const selectors = {
            "signup_btn": 'button[data-qa="main-value-props-get-started"]',
            "email_signup_option": ".component-Input-ButtonWithChildren.email-button",
            "email_input": 'input[data-qa="email"]',
            "name_input": 'input[data-qa="name"]',
            "password_input": 'input[data-qa="password"]',
            "form_submit_btn": 'input[data-qa="Submit"]',
            "job_title_input": 'input[id="#modal-input-title"]',
            "company_input": 'input[data-qa="company"]',
        }

        await page.goto("https://fairygodboss.com/");

        await page.click(selectors.signup_btn);
        await page.click(selectors.email_signup_option);

        await page.type(selectors.email_input, data.email);
        await page.type(selectors.name_input, `${data.firstName} ${data.lastName}`);
        await page.type(selectors.password_input, data.password);

        await page.click(selectors.form_submit_btn);
        await page.waitForSelector(selectors.job_title_input, { timeout: 60000 });

        await page.type(selectors.job_title_input,);
        await page.type(selectors.company_input, data.employer);
        // await page.type(selectors)

    } catch (error) {
        console.error(error);
    }
}

module.exports = async () => {
    const b = await createBrowser();
    if (!b) { console.error("Error while launching puppeteer browser!") };
    const { browser, page } = b;

    await fairyGodBossBot(browser, page);
}