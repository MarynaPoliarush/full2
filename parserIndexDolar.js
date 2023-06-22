console.log("helloIndex");
const puppeteer = require('puppeteer');

async function getIndexDolar (){
    let stock={
        price:[],
        daily:[],
        weekly:[]
    }
  
    try{
  
        const browser = await puppeteer.launch({headless:'new', 'ignoreDefaultArgs': [ '--enable-automation'] })
        const newPage = await browser.newPage();
        await newPage.goto('https://ru.tradingview.com/symbols/TVC-DXY/',{timeout: 0})


        // await newPage.click('didomi-notice-agree-button')

            let allStock = await newPage.evaluate( ()=>{
                const stockArray = Array.from(document.querySelectorAll('.last-JWoJqCpY.js-symbol-last'), e => e.innerText)
                
                return stockArray
            })
            stock.price.push(...allStock)

        
            let allday = await newPage.evaluate( ()=>{
                const nums = Array.from(document.querySelectorAll('.change-tEo1hPMj'), e => e.innerText)
                return nums
            })
            

            stock.daily.push(allday[0])
            stock.weekly.push(allday[1])

            // console.log(stock)

        await browser.close()
    
   


}catch(e){
    console.log(e)
}

    // console.log(stock)
    return stock
    
}



module.exports = {getIndexDolar}