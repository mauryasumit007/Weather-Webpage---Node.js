console.log("javascript")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messsgeOne= document.querySelector('#message-1')
const messsgeTwo= document.querySelector('#message-2')


messsgeOne.textContent= 'From Javascript'



weatherForm.addEventListener('submit',(e) => {

e.preventDefault()   
const location= search.value

messsgeOne.textContent= 'Loading Data...'
messsgeTwo.textContent=''


fetch('weatherr?address='+location).then((response)=>{

response.json().then((data)=>{

    if(data.error){

        messsgeTwo.textContent= 'Unable to find location, try another search'


    }else{
        messsgeOne.textContent= data.location
        messsgeTwo.textContent=data.forecast

    

    }


})


})


})