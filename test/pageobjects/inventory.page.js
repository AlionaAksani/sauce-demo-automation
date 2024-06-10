const PageWithHeader = require('./page.with.header');

class InventoryPage extends PageWithHeader {
    path = "inventory.html";

    open(){
        return super.open(this.path);
    }

    get firstBtnAddToCart() {
        return $('button[data-test^="add-to-cart"]:first-of-type')
    }
}

module.exports = new InventoryPage();