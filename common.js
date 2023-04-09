const puppeteer = require("puppeteer-extra").default;
const proxyChain = require("proxy-chain");
const { readFileSync } = require("fs");

const stealthPlugin = require("puppeteer-extra-plugin-stealth");
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');

const config = JSON.parse(readFileSync(`${__dirname}/config.json`, { encoding: "utf8" }));

puppeteer.use(stealthPlugin());
puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: config["2captchaApi"]
        },
        visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
)


const main = async () => {
    try {
        const proxy = config.proxy;
        const anonymizedProxy = await proxyChain.anonymizeProxy(proxy);

        const browser = await puppeteer.launch({
            timeout: 0,
            slowMo: 200,
            ignoreHTTPSErrors: false,
            headless: false,
            args: [
                "--start-maximized",
                "--no-sandbox",
                `--proxy-server=${anonymizedProxy}`,
                "--disable-setuid-sandbox",
            ],
            ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
        });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
        );

        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, "webdriver", {
                get: () => false,
            });
            window.navigator.chrome = {
                runtime: {},
            };
            Object.defineProperty(navigator, "plugins", {
                get: () => [1, 2, 3, 4, 5],
            });
            Object.defineProperty(navigator, "languages", {
                get: () => ["en-US", "en"],
            });
            const originalQuery = window.navigator.permissions.query;
            return (window.navigator.permissions.query = (parameters) =>
                parameters.name === "notifications"
                    ? Promise.resolve({ state: Notification.permission })
                    : originalQuery(parameters));
        });

        return { browser, page };

    } catch (error) {
        console.error(error);
    }

    return null;
};


module.exports = main;
