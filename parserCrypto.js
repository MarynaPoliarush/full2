console.log("helloCommod");
const puppeteer = require('puppeteer');

async function getCrypto (){
    let crypto={
        price:'',
        changes:''
    }
  
  
    const browser = await puppeteer.launch({headless:'new', 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://tradingeconomics.com/crypto')


    // await newPage.click('didomi-notice-agree-button')

        let allCrypto = await newPage.evaluate( ()=>{
            const stockArray = Array.from(document.querySelectorAll('#p.datatable-item'), e => e.innerText)
            
            return stockArray
        })
        crypto.price = allCrypto.slice(0,2)
    
       

        let allChanges = await newPage.evaluate( ()=>{
            const cryptoArray = Array.from(document.querySelectorAll('.datatable-item.datatable-heatmap'), e => e.innerText)
            
            return cryptoArray
        })
        crypto.changes = allChanges.slice(0,5)

  
    await browser.close()

    console.log(crypto)

    return crypto
    
}




module.exports = {getCrypto}