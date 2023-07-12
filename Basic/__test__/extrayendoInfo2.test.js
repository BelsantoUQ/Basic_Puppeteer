const puppeteer = require('puppeteer')
const {getText,getCount,type,doubleClick,click} = require('../lib/helpers')

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
        const nombre = await getText(page, '#video-title')
        //expect(nombre).toBe('')
        expect(nombre).not.toBe('')
        console.log('Nombre del item seleccionado: ', nombre)
        

    }, 35000)

    it('Extraer la información de un elemento', async () =>{

        
        const itemsImg = await getCount(page,'img')
        expect(itemsImg).toBeGreaterThan(0)
        expect(itemsImg).toBeLessThan(500)
        console.log('Numero de items img: ', itemsImg)
        

    }, 35000)

})