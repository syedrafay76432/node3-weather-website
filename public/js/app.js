// const { response } = require("express")

console.log('server side javascript')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //prevent  default refresh
    message1.textContent = 'Loading...'
    message2.textContent = ' '
    const location = search.value
    console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
                console.log(data.error)
            }
            else {
                message1.textContent = data.location
                message2.textContent = data.forecastdata
                console.log(data.location)
                console.log(data.forecastdata)
            }
        })
    })

})
