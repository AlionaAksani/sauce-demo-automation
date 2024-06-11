const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page')

describe('Logout', () => {

    beforeEach(async () => {
        await LoginPage.openAndLogin('standard_user', 'secret_sauce')
        await InventoryPage.open()
    })

    it('burger menu shoud have 4 children', async () => {
        await InventoryPage.btnBurger.click()

        await expect(InventoryPage.navMenu).toBeDisplayed()
        await expect(InventoryPage.navMenu).toHaveChildren(4)
    })

    it('should redirect to login page and check empty fields', async () => {
        await InventoryPage.btnBurger.click()
        await expect(InventoryPage.navMenu).toBeDisplayed()

        await InventoryPage.btnLogout.click()
        await expect(await LoginPage.inputUsername.getValue()).toBeFalsy()
        await expect(await LoginPage.inputPassword.getValue()).toBeFalsy()
    })

  })
