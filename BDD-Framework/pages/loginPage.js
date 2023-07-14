const { I } = inject()


class LoginPage{

    constructor(){
        this.inputEmail = "#login > div:nth-child(1) > input"
        this.inputPassword = "#login > div:nth-child(2) > input"
        this.submitButton = '#app > div > section.Login__login___3HOEm > div > div.flexboxgrid__col-xs-6___1DhV6.Login__card-box___1pKg0 > div > nav > button.theme__button___1iKuo.LoginButton__button___1Sd3Q.theme__raised___ONZv6.LoginButton__raised___1fUxJ.theme__primary___2NhN1.LoginButton__primary___38GOe'
        this.loginPageText = "//span[contains(text(),'Hello,')]"
    }

    visit() {
        I.amOnPage("login")
        I.waitForElement(this.inputEmail)
        I.seeInCurrentUrl('login')
    }

    login(email, password){
        I.waitForElement(this.inputEmail)
        I.fillField(this.inputEmail, email)
        I.fillField(this.inputPassword, password)
        I.click(this.submitButton)
    }
    
    validateLogin(){
        I.waitForElement(this.loginPageText)
    }

}

module.exports = new LoginPage()
module.exports.LoginPage = LoginPage