const { $ } = require('@wdio/globals')
const Page = require('./page');

module.exports = class BasePage extends Page {
    
    // header
    get linkCart (){
        return $('[data-test="shopping-cart-link"]')
    }

    get cartBadge(){
        return $('[data-test="shopping-cart-badge"]')
    }

    get btnBurger () {
        return $('.bm-burger-button')
    }

    // menu
    get navMenu () {
        return $('nav.bm-item-list')
    }

    get btnLogout() {
        return $('a[data-test="logout-sidebar-link"]')
    }

    // footer
    get linkTwitter() {
        return $('a[data-test="social-twitter"]')
    }

    get linkFacebook() {
        return $('a[data-test="social-facebook"]')
    }

    get linkLinkedin() {
        return $('a[data-test="social-linkedin"]')
    }
  }