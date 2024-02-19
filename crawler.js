const fs = require('fs');
const puppeteer = require('puppeteer');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

async function crawlURL() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        logger.info('Navigating to the URL...');
        await page.goto('https://www.idealo.de/preisvergleich/OffersOfProduct/201846460_-aspirin-plus-c-forte-800-mg-480-mgbrausetabletten-bayer.html');
        await page.waitForSelector('.productOffers-listItemOfferPrice');

        logger.info('Extracting data from the page...');
        const products = await page.evaluate(() => {
            const productList = {};
            const productElements = document.querySelectorAll('a[data-gtm-event="transaction.leadout"]');

            productElements.forEach((productElement, index) => {
                const href = productElement.getAttribute('href');
                const payload = JSON.parse(productElement.getAttribute('data-gtm-payload'));

                const price = !isNaN(parseFloat(payload.product_price)) ? parseFloat(payload.product_price) : 0;
                const shopName = payload.shop_name.trim() !== '' ? payload.shop_name : 'Unknown';

                productList[index + 1] = {
                    price,
                    shop_name: shopName,
                    position: index + 1
                };
            });

            return productList;
        });

        logger.info('Writing data to a JSON file...');
        const jsonData = JSON.stringify(products, null, 2);
        fs.writeFileSync('products.json', jsonData);
        logger.info('Data has been stored in products.json');
    } catch (error) {
        logger.error('An error occurred:', error);
    } finally {
        logger.info('Closing the browser...');
        await browser.close();
    }
}

crawlURL();
