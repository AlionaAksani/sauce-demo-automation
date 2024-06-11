const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
let cartItemsCount = 0;
let addedItemName;


describe('Cart', () => {
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
        addedItemName = await fistItem.$('[data-test="inventory-item-name"]').getText();
        await fistItem.$('button[data-test^="add-to-cart"]').click()

        
        const actualCountText = await badge.getText();
        const actualCount = Number.parseInt(actualCountText);

        await expect(initialCartCount + 1).toBe(actualCount)
        await expect(addedItemName).not.toBeUndefined();
        cartItemsCount = actualCount;
    })

    it('burger menu shoud have 4 children', async () => {
        await InventoryPage.btnBurger.click()

        await expect(InventoryPage.navMenu).toBeDisplayed()
        await expect(InventoryPage.navMenu).toHaveChildren(4)
    })

    it('should redirect to login page and check empty fields', async () => {
        await InventoryPage.btnLogout.click()
        await expect(await LoginPage.inputUsername.getValue()).toBeFalsy()
        await expect(await LoginPage.inputPassword.getValue()).toBeFalsy()
    })

    it('should keep cart items after login', async () => {
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.open()

        await expect(InventoryPage.cartBadge).toBeDisplayed()
        const actualCountText = await InventoryPage.cartBadge.getText();
        const actualCount = Number.parseInt(actualCountText);        
        await expect(actualCount).toBe(cartItemsCount)
    })

    it('should contain added product', async () => {
        
        await InventoryPage.linkCart.click();
        await expect(browser).toHaveUrl(expect.stringContaining(CartPage.path))
        await expect(CartPage.title).toHaveText('Your Cart')

        const item = await CartPage.cartList.$(`[data-test="inventory-item-name"]=${addedItemName}`)
        await expect(item).toBeDisplayed();        
    })


    // it('should decrease cart counter number when item deleted', async () => {
    //      const badge = InventoryPage.cartBadge;
    //      await expect(badge).not.toExist();

    //      const firstBtn = InventoryPage.btnsAddToCart[0];   
    //      await firstBtn.click()              
    //      const secondBtn = InventoryPage.btnsAddToCart[1];
    //      await secondBtn.click()
        
    //      const actualCountText = await badge.getText();
    //      const initialCartCount = Number.parseInt(actualCountText);
    //      await expect(initialCartCount).toBe(2);
         
    //      const firstRemoveButton = InventoryPage.btnsRemoveFromCart[0];
    //      await firstRemoveButton.click()

    //      const finalCountText = await badge.getText();
    //      const finalCartCount = Number.parseInt(finalCountText);
    //      await expect(finalCartCount).toBe(initialCartCount - 1);
    //  })     
})
