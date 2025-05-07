const { expect, browser } = require('@wdio/globals')

describe('Login page', () => {

    it('should login with valid credentials', async () => {   
        // arrange     
        await browser.url('https://ultimateqa.com/simple-html-elements-for-automation/')
        const form = $('#et_pb_contact_form_0')
        const emailMe = form.$('[type="submit"]')
        await form.scrollIntoView()

        //act
        await emailMe.click()

        const nameInput = $('#et_pb_contact_name_0');
        await expect(nameInput).toBeDisplayed()
        await expect(nameInput).toBeEnabled()

        const emailInput = $('#et_pb_contact_email_0');
        await expect(emailInput).toBeDisplayed()
        await expect(emailInput).toBeEnabled()

        const email = 'olena@gmail.com';
        await emailInput.setValue(email);
        await expect(emailInput).toHaveValue(email);

        //await expect(CheckoutCompletePage.headerComplete).toHaveText('Thank you for your order!')
        //await expect(name).toHaveAttribute('class', expect.stringContaining('et_contact_error'))
        //await expect(browser).toHaveUrl(expect.stringContaining(InventoryPage.path))
        //await expect(InventoryPage.linkCart).toBeDisplayed();
    })

})