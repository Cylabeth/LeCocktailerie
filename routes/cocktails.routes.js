const express = require('express')
const router = express.Router()

const cdnUploader = require('./../configs/cloudinary.config')

const Picture = require('./../models/picture.model')
const Cocktail = require('../models/cocktail-model')
const User = require('../models/user.model')
const Value = require('../models/value.model')
const Bottle = require('../models/bottle.model')


const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { message: 'you have to login to continue' })

const checkRole = rolesToCheck => {
    return (req, res, next) => {
        if (req.isAuthenticated() && rolesToCheck.includes(req.user.role)) {
            next()
        }
        else {
            res.render('auth/login', { message: 'You are not allowed to see this part' })
        }
    }
}

//Listar todos los cocktails
router.get('/', (req, res) => {

    Cocktail
        .find()
        .then(allcocktails => res.render('cocktails/search', { allcocktails }))
        .catch(err => console.log('ERROR', err))
})

//Busqueda avanzada
router.get('/advanced-search', (req, res) => {

    const findCocktails = Cocktail.find()
    const findValue = Value.find()

    Promise
        .all([findCocktails, findValue])
        .then(results => res.render('cocktails/advanced-search', { cocktails: results[0], values: results[1] }))
})

//Listar la busqueda avanzada
router.get('/list', (req, res) => {
    console.log(req.query.strAlcoholic, req.query.strCategory)

    Cocktail
        .find({ $or: [{ strAlcoholic: req.query.strAlcoholic }, { strCategory: req.query.strCategory }, { strDrink: req.query.strDrink }, { strTags: req.query.strTags }, { strGlass: req.query.strGlass }] })
        .then(myCocktails => res.render('cocktails/list-search', { cocktails: myCocktails }))
        .catch(err => console.log('ERROR', err))
})

//Perfil de usuario
router.get('/profile', checkLoggedIn, (req, res, next) => {

    const userData = req.user

    Cocktail
        .find({ strOwner: req.user._id })
        .populate('strOwner')
        .then(myCocktails => res.render('cocktails/user-profile', { cocktails: myCocktails, userData }))
        .catch(err => next(err))
})

//Crear cocktails
router.get('/profile/new-cocktail', checkLoggedIn, (req, res) => {

    Value
        .find()
        .then(allValues => res.render('cocktails/new-cocktail', { values: allValues }))
        .catch(err => console.log('Error', err))
})

//Crear cocktail post
router.post('/profile/new-cocktail', cdnUploader.single('imageInput'), checkLoggedIn, (req, res, next) => {

    const { nameInput } = req.body
    const createPicture = Picture.create({ name: nameInput, path: req.file.path, originalName: req.file.originalname })

    const { strDrink, strCategory, strAlcoholic, strGlass, strDrinkThumb, strInstructions, strIngredients, strOwner, strTags } = req.body
    const createCocktail = Cocktail.create({ strDrink, strCategory, strAlcoholic, strGlass, strDrinkThumb: req.file.path, strInstructions, strIngredients, strOwner: req.user._id, strTags })

    Promise
        .all([createPicture, createCocktail])
        .then(() => res.redirect('/cocktails/profile'))
        .catch(err => next(err))
})

//Busqueda por ID (detalles)
router.get('/:id', checkLoggedIn, (req, res, next) => {

    const id = req.params.id

    Cocktail
        .findById(id)
        .populate('strOwner')
        .then(cocktailDetails => res.render('cocktails/details', { cocktailDetails }))
        .catch(err => next(err))
})

// Editar cocktail
router.get('/profile/edit-cocktail/:id', checkLoggedIn, (req, res, next) => {

    const id = req.params.id
    const { nameInput } = req.body

    const cocktailPromise = Cocktail.findById(id)
    const valuePromise = Value.find()

    Promise
        .all([cocktailPromise, valuePromise])
        .then(results => res.render('cocktails/edit-cocktail', { cocktail: results[0], value: results[1] }))
        .catch(err => next(new Error(err)))

})

//Editar cocktail(post)
router.post('/profile/edit-cocktail', cdnUploader.single('imageInput'), checkLoggedIn, (req, res) => {

    const id = req.query.id
    const theOwner = req.user._id
    const thePicture = req.file.path

    const { nameInput } = req.body
    const { strDrink, strCategory, strAlcoholic, strGlass, strDrinkThumb, strInstructions, strIngredients, strTags } = req.body

    Cocktail
        .findByIdAndUpdate(id, { strDrink, strCategory, strAlcoholic, strGlass, strDrinkThumb: thePicture, strInstructions, strIngredients, strOwner: theOwner, strTags })
        .then(() => res.redirect('/cocktails/profile'))
        .catch(err => console.log('ERROR', err))

})

// Eliminar cocktail
router.post('/profile/:cocktail_id/delete', checkLoggedIn, (req, res, next) => {

    const id = req.params.cocktail_id

    Cocktail
        .findByIdAndRemove(id)
        .then(() => res.redirect('/cocktails/profile'))
        .catch(err => next(err))
})

module.exports = router