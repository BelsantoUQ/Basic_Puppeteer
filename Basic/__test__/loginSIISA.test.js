const puppeteer = require('puppeteer')
const {getText,getCount,type,doubleClick,click} = require('../lib/helpers')

xdescribe('Probando ingreso erroneo login',()=>{

    let browser
    let page

    //beforeEach
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        page = await browser.newPage()
        await page.goto('https://www.testhtx.siisa.com.co/', {waitUntil : 'networkidle2'})

    }, 10000)
    
    //afterEach
    afterAll(async()=>{
        await browser.close()
    })

    it('Extraer el titulo de la pagina', async () =>{

        
        const titulo = await page.title()
        const url = await page.url()

        console.log(`Título: ${titulo}`)
        console.log( `Url: ${url}` )
        expect(titulo).not.toBe('')
        expect(titulo).toBe('Login - SIISA VERSIÓN 1.48.0.0')
    }, 35000)

    it('Llena el formulario Login', async () =>{

        const textoElemento = await getText(page, '#R94055903168726083 > div.uRegionHeading > h1')
        expect(textoElemento).not.toBe('')
        console.log('Nombre del item seleccionado: ', textoElemento)
        expect(textoElemento).toBe('ACCESO AL SISTEMA  SIISA VERSIÓN 1.48.0.0')
        
        await type(page, '#P101_USERNAME', '1023456789', { delay: 100 })
        await type(page, '#P101_PASSWORD', '0000', { delay: 100 })
        await click(page, '#uOneCol > div > div')
        await page.waitForSelector('#uNotificationMessage')

    }, 35000)


})