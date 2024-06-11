const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page');
const links = {
    twitter: "https://x.com/saucelabs",
    facebook: "https://www.facebook.com/saucelabs",
    linkedin: "https://www.linkedin.com/company/sauce-labs/"
}
let originalWindow;

describe('Footer links', () => {
    beforeEach(async () => {
        await LoginPage.openAndLogin('standard_user', 'secret_sauce')
        await InventoryPage.open()
        originalWindow = await browser.getWindowHandle();
    })

    afterEach(async () => {
        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);
    })

    it('twitter should open twitter page', async () => {
        await InventoryPage.linkTwitter.click();
        await browser.pause(2000);
        const allWindows = await browser.getWindowHandles();

        const newWindow = allWindows.find(handle => handle !== originalWindow);
        await browser.switchToWindow(newWindow);

        const newUrl = await browser.getUrl();
        await expect(newUrl).toContain(links.twitter);
    })
  
    it('facebook should open facebook page', async () => {

        await InventoryPage.linkFacebook.click();
        await browser.pause(2000);
        const allWindows = await browser.getWindowHandles();

        const newWindow = allWindows.find(handle => handle !== originalWindow);
        await browser.switchToWindow(newWindow);

        const newUrl = await browser.getUrl();
        await expect(newUrl).toContain(links.facebook);
    })
  
    it('linkedin should open linkedin page', async () => {
        await InventoryPage.linkLinkedin.click();
        await browser.pause(2000);
        const allWindows = await browser.getWindowHandles();

        const newWindow = allWindows.find(handle => handle !== originalWindow);
        await browser.switchToWindow(newWindow);

        const newUrl = await browser.getUrl();
        await expect(newUrl).toContain(links.linkedin);
    })
})
