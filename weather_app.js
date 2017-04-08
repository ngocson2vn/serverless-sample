'use strict'  
const express = require('express')  
const superagent = require('superagent')  
const app = express()

app.get('/', sendWeatherOfRandomCity)

function sendWeatherOfRandomCity (request, response) {  
  getWeatherOfRandomCity(request, response)
  sayHi()
}

function sleepFor(sleepDuration) {
    var now = new Date().getTime()
    while(new Date().getTime() < now + sleepDuration) { /* do nothing */ } 
}

function getWeatherOfRandomCity(request, response) {  
  const city = request.query.city
  var client = null

  if (city == 'Unknown') {
    client = superagent.get('relax.com:9000')
  } else {
    client = superagent.get(`wttr.in/${city}`)
  }

  client.end((err, res) => {
      const responseText = (res != undefined) ? res.text : 'Something wrong happened!'
      response.send(responseText)
      console.log('Got the weather\n')
  })

  console.log(`Fetching the weather for ${city}, please be patient`)
}

function sayHi () {  
  console.log('Hi')
}

app.listen(3000)
