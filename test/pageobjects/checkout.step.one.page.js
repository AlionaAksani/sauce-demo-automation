const BasePage = require('./page.base');

class CheckoutStepOnePage extends BasePage {
    path = "checkout-step-one.html";

    
    get title (){
        return $('[data-test="title"]')
    }

    get formCheckout(){
        return $('[data-test="checkout-info-container"] form')
    }

    get inputFirstName () {
        return $('[data-test="firstName"]')
    }

    get inputLastName () {
        return $('[data-test="lastName"]')
    }

    get inputPostalCode () {
        return $('[data-test="postalCode"]')
    }

    get btnContinue () {
        return $('input[data-test="continue"]')
    }

    get btnCancel () {
        return $('button[data-test="cancel"]')
    }    
}

module.exports = new CheckoutStepOnePage();