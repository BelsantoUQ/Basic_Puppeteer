const puppeteer = require('puppeteer')
const {AxePuppeteer} = require('@axe-core/puppeteer')

xdescribe('Accesibilidad',()=>{

    let browser
    let page

    //beforeEach para que sea en cada "it"
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: true,
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

    test('Ver accesibilidad', async () =>{
        
        await page.waitForSelector('img')
        const snapshot = await page.accessibility.snapshot()
        console.log(snapshot)
        
    }, 350000)

    test('Probar la accesibilidad con axe', async () =>{
        
        await page.setBypassCSP(true)
        await page.goto('https://platzi.com')
        await page.waitForSelector('img')
        
        const result = await new AxePuppeteer(page).analyze()
        console.log(result.violations[0].nodes[0])

    }, 350000)

})