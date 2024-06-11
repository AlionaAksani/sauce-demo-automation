const { expect, browser } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page')
const sortBy = {
    name: {
        asc: 'az',
        desc: 'za'
    },
    price: {
        asc: 'lohi',        
        desc: 'hilo'
    }
}

describe('Sorting items', () => {
    beforeEach(async () => {
        await LoginPage.openAndLogin('standard_user', 'secret_sauce')
        await InventoryPage.open()
    })

    it('should sorted by name from Z to A', async () => {
        await InventoryPage.selectSort.selectByAttribute('value', sortBy.name.desc);

        const actualNameTexts = await InventoryPage.inventoryNames.map(i => i.getText());
        const sortedNameTexts = [...actualNameTexts].sort().reverse();

        await expect(actualNameTexts).toEqual(sortedNameTexts);
    })
    
    it('should sorted by name from A to Z', async () => {
        await InventoryPage.selectSort.selectByAttribute('value', sortBy.name.asc);

        const actualNameTexts = await InventoryPage.inventoryNames.map(i => i.getText());
        const sortedNameTexts = [...actualNameTexts].sort();

        await expect(actualNameTexts).toEqual(sortedNameTexts);
    })
       
    it('should sorted by price from low to high', async () => {
        await InventoryPage.selectSort.selectByAttribute('value', sortBy.price.asc);

        const actualPriceTexts = await InventoryPage.inventoryPrices.map(i => i.getText());
        const actualPrices = actualPriceTexts.map(p => parseFloat(p.replace('$', '')))       
        const sortedPrices = [...actualPrices].sort((a,b) => a - b);

        expect(actualPrices).toEqual(sortedPrices);             
    })

    it('should sorted by price from high to low', async () => {
        await InventoryPage.selectSort.selectByAttribute('value', sortBy.price.desc);

        const actualPriceTexts = await InventoryPage.inventoryPrices.map(p => p.getText());
        const actualPrices = actualPriceTexts.map(p => parseFloat(p.replace('$', '')))
        const sortedPrices = [...actualPrices].sort((a,b) => b - a);

        expect(actualPrices).toEqual(sortedPrices);
    })
})
