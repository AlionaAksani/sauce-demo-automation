const { $ } = require('@wdio/globals')
const Page = require('./page');

module.exports = class PageWithHeader extends Page {
    get linkCart (){
        return $('[data-test="shopping-cart-link"]')
    }

    get btnBurger () {
        return $('.bm-burger-button')
    }

    get navMenu () {
        return $('nav.bm-item-list')
    }

    get btnLogout() {
        return $('a[data-test="logout-sidebar-link"]')
    }

    get cartBadge(){
        return $('[data-test="shopping-cart-badge"]')
    }
  
  }