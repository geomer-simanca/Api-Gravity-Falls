const express = require('express')
const path = require("path");

const app = express()
const personajesRouter = require('./routers/personajesrouters.js')

app.use(express.json())






app.use('/personajes',personajesRouter)


app.use(express.static(path.join(__dirname, "public")));



app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'inicio', 'index.html'));
})


PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`el servidor esta funcionando por el puerso ${PORT}`)
})