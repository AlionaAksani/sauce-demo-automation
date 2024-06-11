const BasePage = require('./page.base');

class CheckoutCompletePage extends BasePage {
    path = "checkout-complete.html";
    
    get title (){
        return $('[data-test="title"]')
    }

    get headerComplete () {
        return $('h2[data-test="complete-header"]')
    }  

    get btnBackHome(){
        return $('button[data-test="back-to-products"]');
    }
}

module.exports = new CheckoutCompletePage();