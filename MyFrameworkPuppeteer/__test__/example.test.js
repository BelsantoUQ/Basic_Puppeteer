describe('ir a google',()=>{

    it("should go to the Google search page", async () => {
        
        await page.goto('https://www.google.com/')
        await page.waitForTimeout(5000)
        await browser.close()
    },8000)

})