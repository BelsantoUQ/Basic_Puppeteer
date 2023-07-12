import BasePage from "./basePage";

export default class LoginPage extends BasePage {

  constructor() {
    super()
    this.navBar = "/html/body/div[1]/div/section[3]/div/div[2]/div/h2"
    this.inputEmail = "#login > div:nth-child(1) > input"
    this.inputPassword = "#login > div:nth-child(2) > input"
    this.submitButton = '#app > div > section.Login__login___3HOEm > div > div.flexboxgrid__col-xs-6___1DhV6.Login__card-box___1pKg0 > div > nav > button.theme__button___1iKuo.LoginButton__button___1Sd3Q.theme__raised___ONZv6.LoginButton__raised___1fUxJ.theme__primary___2NhN1.LoginButton__primary___38GOe'
    this.loginPageText = "//span[contains(text(),'Hello,')]"
  }

  async visit() {
    await page.goto('https://demo.testim.io/login')
    await page.waitForXPath(this.navBar)
    const url = this.getUrl()

    await console.log('Visitando URL ', url)
  }

  async login(email, password) {
    await page.waitForSelector(this.inputEmail)
    await this.type(this.inputEmail, email)
    await this.type(this.inputPassword, password)
    await this.click(this.submitButton)
  }

  async validateLogin() {
    await page.waitForXPath(this.loginPageText)
  }



}