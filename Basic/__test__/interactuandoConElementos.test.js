const puppeteer = require('puppeteer')

xdescribe('Abrir en naveador en puppeteer',()=>{

    it('Debe de abrir, interactuar y cerrar el navegador', async () =>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        const page = await browser.newPage()
        await page.goto('https://www.linkedin.com/in/belsanto/')
        await page.waitForTimeout(2000)
        await page.click('#join-form-submit')
        await page.waitForTimeout(2000)
        await page.waitForXPath('/html/body/div/main/div/form/div[2]/div/p')
        await page.type('#email-or-phone', '3184811237', { delay: 100})
        await page.goto('http://demo.guru99.com/test/simple_context_menu.html')
        //aceptar alertas del navegador
        page.on('dialog', async (dialog) => {
            await dialog.accept()
        })
        //Click derecho
        await page.click('#authentication > span', { button: 'right', delay: 500})
        await page.waitForTimeout(1000)
        
        //Click doble
        await page.click('#authentication > button', { clickCount : 2 , delay:500})
        await page.waitForTimeout(1000)

        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.type('#developer-name', 'Belsanto',{delay: 100})

        await page.click('#remote-testing')
        await page.click('#tried-test-cafe')

        await page.select('#preferred-interface','Both')

        await page.type('#comments','Esta es una prueba')
        await page.click('#submit-button')

        await page.waitForTimeout(3000)
        await browser.close()
    }, 30000)

})