const BasePage = require('./page.base');

class CheckoutStepTwoPage extends BasePage {
    path = "checkout-step-two.html";

    
    get title (){
        return $('[data-test="title"]')
    }

    get labelTotalItemPrice () {
        return $('[data-test="subtotal-label"]')
    }

    get cartList () {
        return $('[data-test="cart-list"]')
    }

    get btnFinish () {
        return $('button[data-test="finish"]')
    }

    get btnCancel () {
        return $('button[data-test="cancel"]')
    }    
}

module.exports = new CheckoutStepTwoPage();