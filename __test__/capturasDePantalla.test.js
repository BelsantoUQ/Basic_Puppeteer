const puppeteer = require('puppeteer')

xdescribe('Capturas de pantalla',()=>{

    let browser
    let page

    //beforeEach para que sea en cada "it"
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        //Para correr en modo incognito
        // const contextIncognito = await browser.createIncognitoBrowserContext()
        // page = await contextIncognito.newPage()
        page = await browser.newPage()
        await page.goto('https://www.google.com/', {waitUntil : 'networkidle2'})
        

    }, 10000)

    //tambien puede ser afterEach para que sea en cada "it"
    afterAll(async()=>{
        await browser.close()
    })

    test('Captura de pantalla completa', async () =>{
        
        await page.screenshot({
            path:'./capturaDePantalla.png',
            fullPage:true
        })

    }, 350000)

    test('Captura de pantalla seleccionando un area', async () =>{
        
        await page.screenshot({
            path:'./capturaDeUnAreaDePantalla.png',
            clip:{
                x: 0,
                y: 0,
                width: 500,
                height: 500
            }
        })

    }, 350000)

    test('Captura de pantalla con fondo transparente', async () =>{
        await page.evaluate(()=>(document.body.style.background = 'transparent'))
        await page.screenshot({
            path:'./capturaDePantallaFondoTransparente.png',
            omitBackground: true
            
        })

    }, 350000)

    test('Captura de pantalla seleccionando un elemento', async () =>{
        const elemento = await page.waitForSelector('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b');
        await elemento.screenshot({
            path:'./capturaDeUnElementoDePantalla.png',
            
        })

    }, 350000)

})