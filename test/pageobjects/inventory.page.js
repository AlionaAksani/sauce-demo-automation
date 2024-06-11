const PageWithHeader = require('./page.with.header');

class InventoryPage extends PageWithHeader {
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
}

module.exports = new InventoryPage();