const BasePage = require('./page.base');

class CartPage extends BasePage {
    path = "cart.html";

    open(){
        return super.open(this.path);
    }

    get title (){
        return $('[data-test="title"]')
    }

    get cartList () {
        return $('[data-test="cart-list"]')
    }

    get btnCheckout () {
        return $('[data-test="checkout"]')
    }

    
}

module.exports = new CartPage();