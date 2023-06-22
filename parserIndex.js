console.log("helloIndex");
const puppeteer = require('puppeteer');

async function getIndex (){
    let stock={
        price:'0',
        daily:'0',
        weekly:'0'
    }
  
    try{
  
    async function indexes(){
        const browser = await puppeteer.launch({headless:'new', 'ignoreDefaultArgs': [ '--enable-automation'] })
        const newPage = await browser.newPage();
        await newPage.goto('https://tradingeconomics.com/stocks',{timeout: 0})


        // await newPage.click('didomi-notice-agree-button')

            let allStock = await newPage.evaluate( ()=>{
                const stockArray = Array.from(document.querySelectorAll('#p'), e => e.innerText)
                
                return stockArray
            })
            stock.price = allStock.slice(0,3)

        
            let allday = await newPage.evaluate( ()=>{
                const nums = Array.from(document.querySelectorAll('#pch'), e => e.innerText)
                return nums
            })
          

            stock.daily = allday.slice(0,3)



            let allweek = await newPage.evaluate( ()=>{
                const nums = Array.from(document.querySelectorAll('.datatable-item.datatable-heatmap '), e => e.innerText)
            
                return nums
            })
            stock.weekly = allweek.slice(0,9)

            // console.log(stock)

        await browser.close()
        
    }
    await indexes()

    async function dollar(){
        const browser = await puppeteer.launch({headless:'new', 'ignoreDefaultArgs': [ '--enable-automation'] })
        const newPage = await browser.newPage();
        await newPage.goto('https://ru.tradingview.com/symbols/TVC-DXY/')


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
        
    }
    await dollar()


}catch(e){
    console.log(e)
}

    // console.log(stock)
    return stock
    
}



module.exports = {getIndex}
