const request = require("request")



// lets use callback functions for simplicity

//1. function for geocode



debugger

const geocode = (address, callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VtaXQwNzAiLCJhIjoiY2s2NHNhbWtyMGpuYTNsbnIxN3Z5Z3YxMCJ9.ycdJUI2d47RQb9_3baMKtg&limit=1'; 
   

console.log(url)

request({url,json:true},(error,{body})=>{
   
    if(error){
     callback('Unable to connect to location services',undefined)
    
    }
    else if(body.features.length === 0){

        callback('unable to find location',undefined)
    }
    else{

        console.log("location is :"+ body.features[0].center[1])
       
       callback('no error',{
        latitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        location:body.features[0].place_name
       })

    }

})
   
   }


   // NOW export this callback code as module to use in everywhere

   module.exports=geocode

