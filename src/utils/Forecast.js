const request = require("request")



// lets use callback functions for simplicity

//1. function for geocode

const forecast = (latitude,longitude, callback)=>{

console.log('forecast lat and long are'+latitude+' and '+longitude)

    const url= 'https://api.darksky.net/forecast/8340762765e6edbfef0d5f1756c96000/' + latitude + ',' + longitude
   
    request({url:url,json:true},(error,response)=>{
   // get forecast information
   if(error){
    callback('Unable to connect to location services',undefined)

        }else if(response.body.error){

            callback('Unable to find location',undefined)

    
        }
        else{

        callback(undefined,response.body.daily.data[0].summary + 'it is currently: ' + response.body.currently.temperature)
    
        }

    
   
   })

// After using object destructuring

// request({url,json:true},(error,{body})=>{
//     // get forecast information
//     if(error){
//      callback('Unable to connect to location services',undefined)
 
//          }else if(body.error){
 
//              callback('Unable to find location',undefined)
 
     
//          }
//          else{
 
//          callback(undefined,body.daily.data[0].summary + 'it is currently: ' + body.currently.temperature)
     
//          }
 
     
    
//     })
   
   }


   // NOW export this callback code as module to use in everywhere

   module.exports=forecast

