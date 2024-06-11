const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page')
const CheckoutStepOnePage = require('../pageobjects/checkout.step.one.page')
const CartPage = require('../pageobjects/cart.page');
const CheckoutStepTwoPage = require('../pageobjects/checkout.step.two.page')
const CheckoutCompletePage = require('../pageobjects/checkout.complete.page')
let addedItem = {};

describe('Checkout', () => {
    it('should login', async () => {
        await LoginPage.openAndLogin('standard_user', 'secret_sauce')
        await InventoryPage.open()
    })

    it('should increase cart counter number when new item added', async () => {
        let initialCartCount = 0;
        const badge = await InventoryPage.cartBadge;

        if (await badge.isExisting())
        {  
            const cartCountText = await badge.getText();
            initialCartCount = Number.parseInt(cartCountText);
        }
        
        const fistItem = InventoryPage.inventoryItems[0];
        addedItem.name = await fistItem.$('[data-test="inventory-item-name"]').getText();
        addedItem.price = await fistItem.$('[data-test="inventory-item-price"]').getText();
        await fistItem.$('button[data-test^="add-to-cart"]').click()

        
        const actualCountText = await badge.getText();
        const actualCount = Number.parseInt(actualCountText);

        await expect(initialCartCount + 1).toBe(actualCount)
        await expect(addedItem.name).not.toBeUndefined();
        await expect(addedItem.price).not.toBeUndefined();
        cartItemsCount = actualCount;
    })

    it('should contain added product', async () => {        
        await InventoryPage.linkCart.click();
        await expect(browser).toHaveUrl(expect.stringContaining(CartPage.path))
        await expect(CartPage.title).toHaveText('Your Cart')

        const item = await CartPage.cartList.$(`[data-test="inventory-item-name"]=${addedItem.name}`)
        await expect(item).toBeDisplayed();        
    })

    it('should go to checkout page', async () => {        
        await CartPage.btnCheckout.click();
        await expect(CheckoutStepOnePage.formCheckout).toBeDisplayed();
        })

    it('should have added product and correct price', async () => {        
        await CheckoutStepOnePage.inputFirstName.setValue('John')
        await CheckoutStepOnePage.inputLastName.setValue('Doe')                     
        await CheckoutStepOnePage.inputPostalCode.setValue('12345')
        await CheckoutStepOnePage.btnContinue.click()

        await expect(browser).toHaveUrl(expect.stringContaining(CheckoutStepTwoPage.path))
        const item = await CheckoutStepTwoPage.cartList.$(`[data-test="inventory-item-name"]=${addedItem.name}`)
        await expect(item).toBeDisplayed();
        const totalItemPrice = await CheckoutStepTwoPage.labelTotalItemPrice.getText()
        await expect(totalItemPrice.endsWith(addedItem.price)).toBe(true);
    })

    it('should redirect to checkout complete page', async () => {        
        await CheckoutStepTwoPage.btnFinish.click()

        await expect(browser).toHaveUrl(expect.stringContaining(CheckoutCompletePage.path));
        await expect(CheckoutCompletePage.headerComplete).toBeDisplayed()
        await expect(CheckoutCompletePage.headerComplete).toHaveText('Thank you for your order!')
    })

    it('should return to inventory page', async () => { 
        await CheckoutCompletePage.btnBackHome.click()

        await expect(browser).toHaveUrl(expect.stringContaining(InventoryPage.path));
        await expect(InventoryPage.inventoryItems[0]).toBeDisplayed()
        await expect(InventoryPage.cartBadge).not.toExist()
    })
})
