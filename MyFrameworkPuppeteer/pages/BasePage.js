export default class BasePage{

    async getTitle(){
        return await page.title()
    }

    async getUrl(){
        return await page.url()
    }
    
    async getText(selector){
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector,(el)=>el.textContent)
        } catch (error) {
            throw new Error(`Error al obtener el texto del selector ${selector}`)
        }
    }
    
    async getAttribute(selector, attribute){
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector,(el)=>el.getAttribute(attribute))
        } catch (error) {
            throw new Error(`Error al obtener el atributo del selector ${selector}`)
        }
    }
    
    async getValue(selector){
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector,(el)=>el.value)
        } catch (error) {
            throw new Error(`Error al obtener el valor del selector ${selector}`)
        }
    }
    
    async getCount(selector){
        try {
            await page.waitForSelector(selector)
            return await page.$$eval(selector,(el)=>el.length)
        } catch (error) {
            throw new Error(`Error al obtener la cantidad de elementos ${selector}`)
        }
    }
    
    async click(selector){
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {
            throw new Error(`Error al dar click en el selector ${selector}`)
        }
    }
    
    async rightClick(selector){
        try {
            await page.waitForSelector(selector)
            await page.click(selector, { button: 'right'})
        } catch (error) {
            throw new Error(`Error al dar click en el selector ${selector}`)
        }
    }
    
    async doubleClick(selector){
        try {
            await page.waitForSelector(selector)
            await page.click(selector, { clickCount: 2})
        } catch (error) {
            throw new Error(`Error al dar doble click en selector ${selector}`)
        }
    }
    
    async type(selector, text, opts={}){
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text, opts)
        } catch (error) {
            throw new Error(`Error al escribir el texto en el selector ${selector}`)
        }
    }
    
    async wait(time){
        await new Promise(r => setTimeout(r, time))
    }
}