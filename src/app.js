const path = require('path')  // inbuilt
const express = require('express')
const hbs=require('hbs')   // for partials using
const geocode=require('./utils/Geocode')
const forecast=require('./utils/Forecast')


const app= express()
// define path for express config
const publicdirectoryPath= path.join(__dirname,'../public')    // for accessing local html file static stored
const viewsPath =  path.join(__dirname,'../templates/views')  // to access tempaltes 
const partialsPath= path.join(__dirname,'../templates/partials')  // for partials


// setup handlerbar engine and views location
app.set('view engine', 'hbs')  //Handle bars are set up now
app.set('views',viewsPath )
hbs.registerPartials(partialsPath)  // settting partials path


// setup static dir to serve
app.use(express.static(publicdirectoryPath))    // with this line we can access all htmls inside pblic folder easily



// Handlebars are used for dynamic web page loading purpose..
app.get('/index',(req,res)=>{       // handle bar file for abouut page index file
res.render('index',{
    title: 'weather of mauli jagran',
    name: 'sumit maurya '
})

})



app.get('/about',(req,res)=>{    // handle bar file for abouut page hbs file
    res.render('about',{
        title: 'About CHandigarh city',
        name: 'sumit maurya '
    })
    
    })



    app.get('/help',(req,res)=>{    // handle bar file for abouut page hbs file
        res.render('help',{
            title: 'Any Help DESK',
            name: 'sumit maurya '
        })
        
        })




app.get('',(req,res)=>{
res.send('<h1>Hello express!</h1>')
})



 app.get('/weatherr',(req,res)=>{
     
    if(!req.query.address){
        return res.send({
             error: 'Addressa term is missing '
         })
       }
       console.warn(req.query)
       console.warn(req.query.city)

     geocode(req.query.address,(error,{latitude,longitude,location}={}
        )=>{   // empty block will stop from crash it will return default value
      

            var errorm = JSON.stringify(error, null, 2);


        if(errorm.localeCompare("no error")){
            console.log('Error is:'+JSON.stringify(error, null, 2));


            forecast(latitude,longitude,(error,forecastdata)=>{

                if(error){
                    return res.send({error})
                }
    
                res.send({
                    forecast: forecastdata,
                     location,
                     address: req.query.address
                     
                 })
            })



           
        }else{

            console.log(error.errorMessage)

            return res.send({error})
        }

        
    })

})



  app.get('/products',(req,res)=>{   // sample query string
if(!req.query.search){
 return res.send({
      error: 'Search term is missing '
  })
}

console.log(req.query)
console.log(req.query.search)

res.send({
    products:[]
})

  })   

//app.com
//app.com/help
//app.com/about


// Handle errors

app.get('/help/*',(req,res)=>{
   // res.send('<h1>Help article not found</h1>')

   res.render('404',{
    title: '404',
    name: 'sumit maurya',
    errorMessage: 'Help Article Not fOUND !'
})

})

app.get('*',(req,res)=>{
 //   res.send('<h1>404 Page</h1>')
 res.render('404',{
    title: '404',
    name: 'sumit maurya ',
    errorMessage: 'Page Not Found '
})
    })


app.listen(3000,()=>{

   console.log('server is up and running on port 3000');
    
})