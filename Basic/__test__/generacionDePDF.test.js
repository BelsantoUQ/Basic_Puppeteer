const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')
expect.extend({toMatchImageSnapshot})

xdescribe('Test Visual',()=>{

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

    test('PDF pantalla completa', async () =>{
        
        let pdfCSS = []
        pdfCSS.push('<style>')
        pdfCSS.push('h1{font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = pdfCSS.join('')

        await page.pdf({
            path:'./google.pdf',
            format:"A4",
            printBackground:true,
            displayHeaderFooter:true,
            headerTemplate: css + '<h1> Mi primer pdf con puppeteer </h1>',
            footerTemplate: css + '<h1> Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
            margin:{
                top: '100px',
                botton:'200px',
                right: '30px',
                left: '30px'
            },
            landscape:true
        })

    }, 350000)

})