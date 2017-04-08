'use strict'  
const express = require('express')  
const app = express()

app.get('/', relaxTension)

function relaxTension(request, response) {  
    setTimeout(() => response.send("I'm sorry! I cannot identify your city."), 60000)
}

app.listen(9000)
