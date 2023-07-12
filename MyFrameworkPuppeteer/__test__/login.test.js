import LoginPage  from "../pages/LoginPage";

let loginPage

xdescribe('Iniciar sesion en la pagina', ()=>{
    beforeAll(async()=>{

        loginPage = new LoginPage()

    })

    afterAll(async()=>{
        browser.close() //cerramos el navegador al finalizar las pruebas   
    })

    it('deberá ir a la pagine', async()=>{
        await loginPage.visit()
    })

    it('deberá llenar los campos', async()=>{
        await loginPage.login('user@phptravels.com', 'demouser')
    },55000)

    it('valida que este en el dashboard', async()=>{
        await loginPage.validateLogin()
    },35000)

})