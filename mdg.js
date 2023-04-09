const { Browser, Page } = require("puppeteer");
const createBrowser = require("./common");
const { getData } = require("./utils");

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

        /**
        Alabama	AL	
        Kentucky	KY	
        Ohio	OH
        Alaska	AK	
        Louisiana	LA	
        Oklahoma	OK
        Arizona	AZ	
        Maine	ME	
        Oregon	OR
        Arkansas	AR	
        Maryland	MD	
        Pennsylvania	PA
        American Samoa	AS	
        Massachusetts	MA	
        Puerto Rico	PR
        California	CA	
        Michigan	MI	
        Rhode Island	RI
        Colorado	CO	
        Minnesota	MN	
        South Carolina	SC
        Connecticut	CT	
        Mississippi	MS	
        South Dakota	SD
        Delaware	DE	
        Missouri	MO	
        Tennessee	TN
        District of Columbia	DC	
        Montana	MT	Texas	TX
        Florida	FL	
        Nebraska	NE	
        Trust Territories	TT
        Georgia	GA	
        Nevada	NV	
        Utah	UT
        Guam	GU	
        New Hampshire	NH	
        Vermont	VT
        Hawaii	HI	
        New Jersey	NJ	
        Virginia	VA
        Idaho	ID	
        New Mexico	NM	
        Virgin Islands	VI
        Illinois	IL	
        New York	NY	
        Washington	WA
        Indiana	IN	
        North Carolina	NC	
        West Virginia	WV
        Iowa	IA	
        North Dakota	ND	
        Wisconsin	WI
        Kansas	KS	
        Northern Mariana Islands	MP	
        Wyoming	WY
        */

        const states = {
            "NY": "51",
        }

        await page.goto("https://secure.mdg.com/Membership.aspx?t=0");

        await page.type(selectors.email, data.email);
        await page.type(selectors.password, data.password);
        await page.type(selectors.firstName, data.firstName);
        await page.type(selectors.lastName, data.lastName);

        await page.select(selectors.dobYear, data.dob.year);
        await page.select(selectors.dobMonth, parseInt(data.dob.month).toString());
        await page.select(selectors.dobDay, parseInt(data.dob.day).toString());

        await page.type(selectors.address, data.address.street);
        await page.type(selectors.city, data.address.city);
        await page.select(selectors.state, states[data.address.state]);
        await page.type(selectors.zipCode, data.address.zip);

        await page.type(selectors.homePhone, data.phone);
        await page.type(selectors.cellPhone, data.phone);

        await page.click(selectors.agreeTerms);

        const result = await page.solveRecaptchas();
        console.info(result);

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

    return await mdgBot(browser, page);
}
