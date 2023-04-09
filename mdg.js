const { Browser, Page } = require("puppeteer");
const createBrowser = require("./common");
const { getData, sleep } = require("./utils");

/**
 * @param {Browser} browser
 * @param {Page} page
 */
const mdgBot = async (browser, page) => {
    try {
        const data = await getData();

        const selectors = {
            "email": 'input[name="ctl00$ContentPlaceHolder1$Register1$tbEmail"]',
            "password": 'input[name="ctl00$ContentPlaceHolder1$Register1$tbPassword"]',
            "firstName": 'input[name="ctl00$ContentPlaceHolder1$Register1$tbFirstName"]',
            "lastName": 'input[name="ctl00$ContentPlaceHolder1$Register1$tbLastName"]',
            "dobYear": 'select[name="ctl00$ContentPlaceHolder1$Register1$comDOBYear"]',
            "dobMonth": 'select[name="ctl00$ContentPlaceHolder1$Register1$comDOBMonth"]',
            "dobDay": 'select[name="ctl00$ContentPlaceHolder1$Register1$comDOBDay"]',
            "address": 'input[name="ctl00$ContentPlaceHolder1$Register1$tbAddress"]',
            "city": 'input[name="ctl00$ContentPlaceHolder1$Register1$tbCity"]',
            "state": 'select[name="ctl00$ContentPlaceHolder1$Register1$comProvince"]',
            "zipCode": 'input[name="ctl00$ContentPlaceHolder1$Register1$tbPostalCode"]',
            "homePhone": 'input[name="ctl00$ContentPlaceHolder1$Register1$tbPhone"]',
            "cellPhone": 'input[name="ctl00$ContentPlaceHolder1$Register1$tbMobile"]',
            "agreeTerms": 'input[name="ctl00$ContentPlaceHolder1$Register1$ChkBigcheck"]',
            "submitBtn": "#ContentPlaceHolder1_Register1_btnSubmit",
            "confirmationText": "#ContentPlaceHolder1_lblName",
        }

        const states = { "AL": "17", "AR": "19", "AZ": "20", "CA": "21", "CO": "22", "CT": "23", "DC": "24", "DE": "25", "FL": "26", "GA": "27", "IA": "29", "ID": "30", "IL": "31", "IN": "32", "KS": "33", "KY": "34", "LA": "35", "MA": "36", "MD": "37", "ME": "38", "MI": "39", "MN": "40", "MO": "41", "MS": "42", "MT": "43", "NC": "44", "ND": "45", "NE": "46", "NH": "47", "NJ": "48", "NM": "49", "NV": "50", "NY": "51", "OH": "52", "OK": "53", "OR": "54", "PA": "55", "RI": "56", "SC": "57", "SD": "58", "TN": "59", "TX": "60", "UT": "61", "VA": "62", "VT": "63", "WA": "64", "WI": "65", "WV": "66", "WY": "67" };

        const month = parseInt(data.dob.month).toString();
        const day = parseInt(data.dob.day).toString();

        await page.goto("https://secure.mdg.com/Membership.aspx?t=0");

        await page.type(selectors.email, data.email);
        await page.type(selectors.password, data.password);
        await page.type(selectors.firstName, data.firstName);
        await page.type(selectors.lastName, data.lastName);

        await page.select(selectors.dobYear, data.dob.year);
        await sleep(0.7)
        await page.select(selectors.dobMonth, month);
        await sleep(0.7)
        await page.select(selectors.dobDay, day);
        await sleep(0.2)

        await page.type(selectors.address, data.address.street);
        await page.type(selectors.city, data.address.city);
        await page.select(selectors.state, states[data.address.state]);
        await page.type(selectors.zipCode, data.address.zip);

        await page.type(selectors.homePhone, data.phone);
        await page.type(selectors.cellPhone, data.phone);

        await page.evaluate(() => {
            document.querySelector('input[name="ctl00$ContentPlaceHolder1$Register1$ChkBigcheck"]').parentElement.click();
        });

        const result = await page.solveRecaptchas();
        console.info(result);

        await page.click(selectors.submitBtn);
        await sleep(1.1);
        
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

    return await mdgBot(browser, page);
}
