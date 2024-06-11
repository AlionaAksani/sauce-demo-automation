const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page')

describe('Login page', () => {

    beforeEach(async () => {
        await LoginPage.open();
    })

    it('should login with valid credentials', async () => {
        await LoginPage.login('standard_user', 'secret_sauce')

        await expect(browser).toHaveUrl(expect.stringContaining(InventoryPage.path))
        await expect(InventoryPage.linkCart).toBeDisplayed();
    })

    it('should display error message with invalid password', async () => {
        await LoginPage.login('standard_user', '12345')

        await expect(LoginPage.iconErrorUsername).toBeDisplayed()
        await expect(LoginPage.iconErrorPassword).toBeDisplayed()
        await expect(LoginPage.inputUsername).toHaveElementClass(expect.stringContaining('error'))
        await expect(LoginPage.inputPassword).toHaveElementClass(expect.stringContaining('error'))
        await expect(LoginPage.textError).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    it('should display error message with invalid login field', async() => {
        await LoginPage.login('standarD_us', 'secret_sauce')

        await expect(LoginPage.iconErrorUsername).toBeDisplayed();
        await expect(LoginPage.iconErrorPassword).toBeDisplayed();
        await expect(LoginPage.inputUsername).toHaveElementClass(expect.stringContaining('error'));
        await expect(LoginPage.inputPassword).toHaveElementClass(expect.stringContaining('error'));
        await expect(LoginPage.textError).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })
})

