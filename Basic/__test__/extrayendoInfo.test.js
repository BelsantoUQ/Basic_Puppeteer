const puppeteer = require('puppeteer')

xdescribe('Extrayendo información',()=>{

    let browser
    let page
    //beforeEach
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })
        page = await browser.newPage()
        await page.goto('https://www.youtube.com/', {waitUntil : 'networkidle0'})

    }, 10000)
    //afterEach
    afterAll(async()=>{
        await browser.close()
    })

    it('Extraer el titulo de la pagina y la url', async () =>{

        
        const titulo = await page.title()
        const url = await page.url()

        console.log(`Título: ${titulo}`)
        console.log( `Url: ${url}` )
    }, 35000)

    it('Extraer la información de un elemento', async () =>{

        await page.waitForSelector('#video-title')
        const nombre = await page.$eval('#video-title', (data)=>data.textContent)
        
        //expect(nombre).toBe('')
        expect(nombre).not.toBe('')
        
        const[button] = await page.$x('//*[@id="button"]')
        const propiedad = await button.getProperty('textContent')
        const texto = await propiedad.jsonValue()
        console.log(texto)
        expect(texto).not.toBe('');
        
        const texto2 = await page.evaluate((name)=>name.textContent , button)
        console.log(texto2)
        expect(texto2).not.toBe('');
        
        const boton = await page.waitForXPath('//*[@id="button"]')
        const texto3 = await page.evaluate((name)=> name.textContent, boton)
        console.log(texto3)
        expect(texto3).not.toBe('');

    }, 35000)

    it('Extraer la información de un elemento', async () =>{

        
        const itemsImg = await page.$$eval('img',(imagenes)=>imagenes.length)
        expect(itemsImg).toBeGreaterThan(0)
        expect(itemsImg).toBeLessThan(500)

    }, 35000)

})