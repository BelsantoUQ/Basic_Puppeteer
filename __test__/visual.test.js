const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')
expect.extend({toMatchImageSnapshot})

xdescribe('Test Visual',()=>{

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

    test('Snapshot de toda pagina', async () =>{
        await page.waitForSelector('img');
        const screenshot = await page.screenshot()
        expect(screenshot).toMatchImageSnapshot()

    }, 350000)

    test('Snapshot de un elemento', async () =>{
        const image = await page.waitForSelector('img');
        const screenshot = await image.screenshot()
        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: 'percent'
        })

    }, 350000)

    test('Remover imagen antes de crear snapshot', async () =>{
        
        await page.waitForSelector('img');

        
        await page.evaluate(()=>(document.querySelectorAll('img') || []).forEach(img => img.remove))
        
        const screenshot = await page.screenshot()
        
        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: 'percent'
        })

    }, 350000)

})