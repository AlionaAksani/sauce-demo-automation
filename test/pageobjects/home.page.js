class HomePage {
    open(){
        console.log('Home page, open')
    }

    close(number){
        console.log('Home page close ' + number)
    }
}

module.exports = new HomePage();