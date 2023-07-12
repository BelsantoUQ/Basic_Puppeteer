const puppeteer = require('puppeteer')

xdescribe('Geolocalizacion',()=>{

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

    test('Cambio de la geolocalizacion', async () =>{

        const context = browser.defaultBrowserContext()

        await context.overridePermissions('https://chercher.tech/practice/geo-location.html',
        [
            'geolocation'
        ])

        await page.setGeolocation({latitude:90, longitude:20})
        
        await page.goto('https://chercher.tech/practice/geo-location.html')
        await page.waitForTimeout(3000)

    }, 350000)

})