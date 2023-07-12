const puppeteer = require('puppeteer')

xdescribe('Emulando dispositivos',()=>{

    let browser
    let page

    //beforeEach para que sea en cada "it"
    beforeAll(async()=>{
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 0,
            devtools: false,
            defaultViewport: null
        })
        //Para correr en modo incognito
        // const contextIncognito = await browser.createIncognitoBrowserContext()
        // page = await contextIncognito.newPage()
        page = await browser.newPage()
        await page.goto('https://www.youtube.com/', {waitUntil : 'networkidle0'})
        

    }, 10000)

    //tambien puede ser afterEach para que sea en cada "it"
    afterAll(async()=>{
        await browser.close()
    })

    it('Emulando dispositivos de forma manual', async () =>{
        
        await page.emulate({
            name:'Mi dispositivo',
            viewport:{
                width: 375,
                height: 667,
                deviceScaleFactor:2,
                isMobile: true,
                hasTouch: true,
                isLandscape: false
            },
            userAgent:'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36'
        })

        await page.waitForTimeout(3000)

    }, 350000)

    it('Emulando sitio de escritorio', async () =>{
        
        await page.setViewport({
            width:1500,
            height:800,
        })

        await page.waitForTimeout(3000)

    }, 350000)

    it('Emulando sitio web en una tablet', async () =>{
        
        const tablet = puppeteer.KnownDevices['iPad Pro']
        await page.emulate(tablet)
        
        await page.waitForTimeout(3000)

    }, 350000)

    it('Emulando sitio web en una tablet modo landscape', async () =>{
        
        const tablet = puppeteer.KnownDevices['iPad landscape']
        await page.emulate(tablet)
        
        await page.waitForTimeout(3000)

    }, 350000)
})