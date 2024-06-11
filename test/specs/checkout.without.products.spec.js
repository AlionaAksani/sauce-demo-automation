const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page')
const CartPage = require('../pageobjects/cart.page');

describe('Checkout', () => {
    it('should login', async () => {
        await LoginPage.openAndLogin('standard_user', 'secret_sauce')
        await InventoryPage.open()
    })

    it('should go to the cart page when click on cart icon', async () => {
        await InventoryPage.linkCart.click();

        await expect(browser).toHaveUrl(expect.stringContaining(CartPage.path))
        await expect(CartPage.title).toHaveText('Your Cart')
    })

    it('should stay on the cart page', async () => {
        await CartPage.btnCheckout.click();
        
        await expect(browser).toHaveUrl(expect.stringContaining(CartPage.path))
        // TODO: add check for error message when the bug is fixed
    })
})