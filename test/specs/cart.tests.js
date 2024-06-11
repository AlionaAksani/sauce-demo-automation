const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page')

describe('Cart', () => {

    beforeEach(async () => {
        await LoginPage.openAndLogin('standard_user', 'secret_sauce')
        await InventoryPage.open()
    })

    // it('should increase cart counter number when new item added', async () => {
    //     let initialCartCount = 0;
    //     const badge = await InventoryPage.cartBadge;

    //     if (await badge.isExisting())
    //     {  
    //         const cartCountText = await badge.getText();
    //         initialCartCount = Number.parseInt(cartCountText);
    //     }
        
    //     await InventoryPage.btnsAddToCart[0].click()
        
    //     const actualCountText = await badge.getText();
    //     const actualCount = Number.parseInt(actualCountText);

    //     await expect(initialCartCount + 1).toBe(actualCount)
    // })

    it('should decrease cart counter number when item deleted', async () => {
         const badge = InventoryPage.cartBadge;
         await expect(badge).not.toExist();

         const firstBtn = InventoryPage.btnsAddToCart[0];   
         await firstBtn.click()              
         const secondBtn = InventoryPage.btnsAddToCart[1];
         await secondBtn.click()
        
         const actualCountText = await badge.getText();
         const initialCartCount = Number.parseInt(actualCountText);
         await expect(initialCartCount).toBe(2);
         
         const firstRemoveButton = InventoryPage.btnsRemoveFromCart[0];
         await firstRemoveButton.click()

         const finalCountText = await badge.getText();
         const finalCartCount = Number.parseInt(finalCountText);
         await expect(finalCartCount).toBe(initialCartCount - 1);
     })
})
