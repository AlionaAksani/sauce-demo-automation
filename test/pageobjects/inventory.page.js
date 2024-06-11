const BasePage = require('./page.base');

class InventoryPage extends BasePage {
    path = "inventory.html";

    open(){
        return super.open(this.path);
    }

    get btnsAddToCart() {
        return $$('button[data-test^="add-to-cart"]')
    }

    get btnsRemoveFromCart() {
        return $$('button[data-test^="remove"]')
    }

    get inventoryItems() {
        return $$('[data-test="inventory-item"]');
    }

    get selectSort() {
        return $('[data-test="product-sort-container"]')
    }

    get inventoryPrices() {
        return $$('[data-test="inventory-item-price"]')
    }

    get inventoryNames() {
        return $$('[data-test="inventory-item-name"]')
    }
}

module.exports = new InventoryPage();