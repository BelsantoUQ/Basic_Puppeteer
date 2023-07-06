const puppeteer = require('puppeteer')

xdescribe('Tipos de espera',()=>{

    jest.setTimeout(35000)
    it('Mostrar todos los tipos de espera', async () =>{
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
            //,slowMo: 300
        })
        const page = await browser.newPage()
        await page.goto('https://www.youtube.com/', {waitUntil : 'networkidle0'})

        //Espera explicita
        await page.waitForTimeout(3000)

        //Espera por un selector
        await page.waitForSelector('#chips > yt-chip-cloud-chip-renderer.style-scope.ytd-feed-filter-chip-bar-renderer.iron-selected')

        //Espera por un xpath
        await page.waitForXPath('//*[@id="text"]')

        page.setDefaultNavigationTimeout(10000)
        await page.goto('https://demoqa.com/modal-dialogs',  {waitUntil : 'networkidle2'})
        const button = await page.waitForXPath('//*[@id="showSmallModal"]', { visible: true})
        await button.click()

        // Espera por funcion
        await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')
        await page.click('#closeSmallModal')
        await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'),{
            timeout: 3000
        })
        
        //Observar el viewport
        const observarResize = page.waitForFunction('window.innerWidth < 100')
        await page.setViewport({width: 50, height: 50})
        await observarResize
        page.setDefaultTimeout(10000)

        
        await browser.close()
    })

})