const { $ } = require('@wdio/globals')
const Page = require('./page');

module.exports = class PageWithHeader extends Page {
    get linkCart (){
        return $('a[data-test="shopping-cart-link"]')
    }
}