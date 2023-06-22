console.log("hello rates");
const puppeteer = require('puppeteer');



async function getIPO (){
    let currencies

    const browser = await puppeteer.launch({"headless": 'new' ,"args": ["--fast-start", "--disable-extensions", "--no-sandbox"], 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://stockanalysis.com/ipos/2023/')

   
        let allNums = await newPage.evaluate( ()=>{
            const nums = document.querySelector('.flex-1 ').innerText
            return nums
        })
        
        // console.log(allNums.slice(0,8))
        
        currencies = allNums
    

    console.log(currencies)

    await browser.close()

    return currencies
    
}



module.exports = {getIPO}