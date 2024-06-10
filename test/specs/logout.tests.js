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

    it('should increase cart counter number when new item added', async () => {
        let initialCartCount = 0;
        const badge = await InventoryPage.cartBadge;

        if (await badge.isExisting())
        {  
            const cartCountText = await badge.getText();
            initialCartCount = Number.parseInt(cartCountText);
        }

        await InventoryPage.firstBtnAddToCart.click()
        
        const actualCountText = await badge.getText();
        const actualCount = Number.parseInt(actualCountText);

        await expect(initialCartCount + 1).toBe(actualCount)
    })

    // it('should decrease cart counter number when item deleted', async () => {
    //     let initialCartCount = 0;
    //     const badge = await InventoryPage.cartBadge;

    //     if (await badge.isExisting())
    //     {  
    //         const cartCountText = await badge.getText();
    //         initialCartCount = Number.parseInt(cartCountText);
    //     }

    //     const firstBtnToCart = InventoryPage.firstBtnAddToCart;
        
    //     const actualCountText = await badge.getText();
    //     const actualCount = Number.parseInt(actualCountText);

    //     await expect(initialCartCount + 1).toBe(actualCount)
    // })
})