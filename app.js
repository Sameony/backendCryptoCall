const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const axios = require('axios');

// .env
require('dotenv').config()
const API_KEY=process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

var usdDatata=[]

const usdData = async () => await axios.get(BASE_URL+"/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY="+API_KEY+"&limit="+10)
                        .then((res1)=>{ 
                            usdDatata.splice(0,usdDatata.length)
                        (res1.data.data.map(ele=>{
                            const neededObj = {
                                name:"",
                                symbol:"",
                                USDTprice:"",
                                TRXprice:"1234",
                                oneDayChange:"",
                                logo:"https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/128/Bitcoin-BTC-icon.png"
                            }
                            neededObj.symbol=ele.symbol;
                            neededObj.oneDayChange=ele.quote.USD.percent_change_24h;
                            neededObj.USDTprice=ele.quote.USD.price;
                            neededObj.name=ele.name;
                            usdDatata.push(neededObj);
                        }));
                        }).catch(err=>console.log(err))
                            .finally(console.log("ends"))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get("/getAll",async (req, res)=>{
    await usdData();
    res.send(usdDatata);
})
app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on port", port);
});