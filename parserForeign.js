console.log("hello rates");
const puppeteer = require('puppeteer');



async function getForeign (){
    let foreign={
       rates:'',
       daily:'',
       weekly:''
    }

    try{
       
    const browser = await puppeteer.launch({"headless": 'new',"args": ["--fast-start", "--disable-extensions", "--no-sandbox"], 'ignoreDefaultArgs': [ '--enable-automation'] })
    const newPage = await browser.newPage();
    await newPage.goto('https://tradingeconomics.com/currencies')

   
        let allNums = await newPage.evaluate( ()=>{
            const nums = Array.from(document.querySelectorAll(' #p '), e => e.innerText)
            return nums
        })
        foreign.rates=allNums.slice(27,40)

        

        let allday = await newPage.evaluate( ()=>{
            const nums = Array.from(document.querySelectorAll('#pch'), e => e.innerText)
            return nums
        })
        console.log(allday)

        foreign.daily = allday.slice(27,40)



        let allweek = await newPage.evaluate( ()=>{
            const nums = Array.from(document.querySelectorAll('.datatable-item.datatable-heatmap '), e => e.innerText)
           
            return nums
        })
        foreign.weekly = allweek.slice(81,120)
    
        // console.log(foreign)

    await browser.close()

}catch(e){
    console.log(e)
}

    return foreign
    
}


// getForeign()

module.exports = {getForeign}