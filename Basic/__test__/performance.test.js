const puppeteer = require('puppeteer')
const {AxePuppeteer} = require('@axe-core/puppeteer')
const fs = require('fs')

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

    test('Medir el performance de la automatizacion', async () =>{
        await page.waitForSelector('img')
        const metrics = await page.metrics()
        console.log(metrics)
        
    }, 350000)

    test('Medir el performance de la pagina', async () =>{
        
        await page.waitForSelector('img')
        const metrics2 = await page.evaluate(()=>JSON.stringify(window.performance))
        console.log(metrics2)
        
    }, 350000)

    test('Medir el performance del page load con screenshots y extrayendolos', async () =>{
       
        await page.tracing.start({ path:'profile.json', screenshots: true })
        await page.goto('https://platzi.com')
        await page.tracing.stop()
        const tracing = JSON.parse(fs.readFileSync('./profile.json', 'utf8'))
        
        //Filtrar el JSON
        const traceScreenShots = tracing.traceEvents.filter(
            (x)=>
            x.cat === 'disabled-by-default-devtools.screenshot' &&
            x.name === 'Screenshot' &&
            typeof x.args !== 'undefined' &&
            typeof x.args.snapshot !== 'undefined'
        )

        //Iterar el arreglo para crear las imagenes
        traceScreenShots.forEach(function(snap,index){
            fs.writeFile(`trace-screenshot-${index}.png`, snap.args.snapshot, 'base64', function(error){
                if(error){
                    console.log('No pudo crear el archivo', error)
                }
            })
        })

    }, 15000)

    test('Deberá medir el performance del first paint y el first contentful paint', async () =>{
        const navigationPromise = page .waitForNavigation()
        await page.goto('https://platzi.com')
        await navigationPromise

        const firstPaint = JSON.parse(
            await page.evaluate(
                () => JSON.stringify(
                        performance.getEntriesByName('first-paint')
                    ))
        )

        const firstContentfulPaint = JSON.parse(
            await page.evaluate(
                () => JSON.stringify(
                        performance.getEntriesByName('first-contentful-paint')
                    ))
        )
        
        console.log('firstPaint', firstPaint)
        console.log('firstContentfulPaint', firstContentfulPaint)

    }, 350000)

    test('Deberá medir el performance de los frames por segundo', async () =>{
        
        const devtoolsProtocolClient = await page.target().createCDPSession()
        await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true })
        await page.goto('https://platzi.com')

        await page.screenshot({ path : 'framesPorSegundo.jpg', type: 'jpeg' })

        
    }, 350000)


})