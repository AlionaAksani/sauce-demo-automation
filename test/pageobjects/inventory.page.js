const PageWithHeader = require('./page.with.header');

class InventoryPage extends PageWithHeader {
    path = "inventory.html";

    open(){
        return super.open(path);
    }
}

module.exports = new InventoryPage();