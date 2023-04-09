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
            "email": 'input[name="email"]',
            "password": 'input[name="password"]',
            "firstName": 'input[name="first_name"]',
            "lastName": 'input[name="last_name"]',
            "phoneNumber": 'input[name="mobile"]',
            "dob": "#birthdate",
            "gender": "#gender",
            "submitBtn": "#register-submit",
            "submitBtn2": 'form#profile-subscriptions-form input[type="submit"]'
        }

        const genders = {
            "M": "man",
            "F": "woman"
        }

        await page.goto("https://identity.dosomething.org/register");

        await page.type(selectors.email, data.email);
        await page.type(selectors.password, data.password);
        await page.type(selectors.firstName, data.firstName);
        await page.type(selectors.lastName, data.lastName);

        await page.click(selectors.submitBtn);
        await page.waitForSelector(selectors.dob, { timeout: 60000 });

        await page.type(selectors.dob, data.dob.month);
        await page.type(selectors.dob, data.dob.day);
        await page.type(selectors.dob, data.dob.year);

        await page.select(selectors.gender, genders[data.gender]);

        await page.click(selectors.submitBtn);
        await page.waitForSelector(selectors.phoneNumber, { timeout: 60000 });

        await page.type(selectors.phoneNumber, data.phone);
        await page.click(selectors.submitBtn2);

        await page.waitForTimeout(1100);

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
