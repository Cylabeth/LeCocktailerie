const express = require('express')
const router = express.Router()

const Picture = require('./../models/picture.model')
const Cocktail = require('../models/cocktail-model')
const User = require('../models/user.model')
const Value = require('../models/value.model')
const Bottle = require('../models/bottle.model')


//Vista index
router.get('/', (req, res) => res.render('index'))

//Random cocktails
router.get('/random', (req, res) => res.render('random-cocktail'))

//Ingredientes
router.get('/ingredients', (req, res) => {

    Bottle
        .find()
        .then(allBottles => res.render('ingredients', { allBottles }))
        .catch(err => console.log('Error', err))
})

module.exports = router
