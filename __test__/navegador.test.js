const puppeteer = require('puppeteer')

describe('Abrir en naveador en puppeteer',()=>{

    it('Debe de abrir y cerrar el navegador', async () =>{
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 0,
            devtools: false,
            // defaultViewport:{
            //     width: 2100,
            //     height: 1080
            // },
            // args: ['--window-size=1920,1080'],
            defaultViewport: null
        })
        const page = await browser.newPage()
        await page.goto('https://www.linkedin.com/in/belsanto/')
        await page.waitForTimeout(4000)
        await page.reload()
        await page.waitForSelector('img')
        
        //Navegar a otro sitio
        await page.goto('https://youtu.be/Flv0l2FGYb0')
        await page.waitForSelector('#title > h1 > yt-formatted-string')
        await page.goBack()
        await page.goForward()
        const page2 = await browser.newPage()
        await page2.goto('https://www.youtube.com/watch?v=4Sc16LHRBKg&list=RDMM&start_radio=1&rv=Flv0l2FGYb0')
        await page.waitForSelector('img')
        await browser.close()
    }, 30000)

})