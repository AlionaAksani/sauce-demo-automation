const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get iconErrorUsername () {
        return $('input#user-name + svg.error_icon')
    }

    get iconErrorPassword () {
        return $('input#password + svg.error_icon')
    }

    get textError () {
        return $('.error-message-container h3')
    }

    get btnSubmit () {
        return $('input[type="submit"]');
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('');
    }

    async openAndLogin(username, password){
        await this.open();
        await this.login(username, password);
    }
}

module.exports = new LoginPage();
