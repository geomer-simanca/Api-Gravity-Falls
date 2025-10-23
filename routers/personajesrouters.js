const express = require('express')
const router = express.Router()
const personajescontroller = require('../controllers/personajesControllers.js')



router.get('/',personajescontroller.consularPersonajes)


router.get('/:id',personajescontroller.consultarPersonaje)


router.post('/',personajescontroller.agregarPersonaje)

module.exports = router