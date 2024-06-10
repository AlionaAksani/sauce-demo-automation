const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page')

describe('Login page', () => {

    beforeEach(async () => {
        await LoginPage.open();
    })

    it('should login with valid credentials', async () => {
        // arrange
        //await LoginPage.open()
        
        // act
        await LoginPage.login('standard_user', 'secret_sauce')

        // assert
        await expect(browser).toHaveUrl(expect.stringContaining(InventoryPage.path))
        await expect(InventoryPage.linkCart).toBeDisplayed();
    })

    it('should display error message with invalid password', async () => {
        // arrange
        //await LoginPage.open()
        // User is on the login page


        // act
        await LoginPage.login('standard_user', '12345')
        // Enter valid login into "Login" field
        // Enter invalid password into "Password" field
        // Click "Login" button

        // assert
        await expect(LoginPage.iconErrorUsername).toBeDisplayed()
        await expect(LoginPage.iconErrorPassword).toBeDisplayed()
        await expect(LoginPage.inputUsername).toHaveElementClass(expect.stringContaining('error'))
        await expect(LoginPage.inputPassword).toHaveElementClass(expect.stringContaining('error'))
        await expect(LoginPage.textError).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    it('should display error message with invalid login field', async() => {
        //arrange
        //await LoginPage.open()

        //act
        await LoginPage.login('standarD_us', 'secret_sauce')

        //Enter invalid login into "Login" field
        //Enter valid password into "Password" field
        //Click "Login" button

        //assert
        await expect(LoginPage.iconErrorUsername).toBeDisplayed();
        await expect(LoginPage.iconErrorPassword).toBeDisplayed();
        await expect(LoginPage.inputUsername).toHaveElementClass(expect.stringContaining('error'));
        await expect(LoginPage.inputPassword).toHaveElementClass(expect.stringContaining('error'));
        await expect(LoginPage.textError).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })
})

