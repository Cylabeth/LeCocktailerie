const express = require('express')
const router = express.Router()
const passport = require("passport")

const cdnUploader = require('./../configs/cloudinary.config')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const Picture = require('./../models/picture.model')
const Cocktail = require('../models/cocktail-model')
const User = require('../models/user.model')
const Value = require('../models/value.model')
const Bottle = require('../models/bottle.model')
const Glass = require('../models/glass-model')

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

// Zona de Admin
router.get('/', checkLoggedIn, checkRole(['Admin']), (req, res, next) => {

    const userAdmin = req.user

    const cocktailPromise = Cocktail.find()
    const valuePromise = Value.find()
    const userPromise = User.find()
    const glassesPromise = Glass.find()

    Promise
        .all([cocktailPromise, valuePromise, userPromise, glassesPromise])
        .then(allData => res.render('cocktails/admin', {
            cocktail: allData[0],
            value: allData[1],
            users: allData[2],
            glasses: allData[3],
            userAdmin
        }))
        .catch(err => next(new Error(err)))
})

router.post('/', (req, res, next) => {

    const {
        username,
        password,
        role
    } = req.body

    if (!username || !password) {
        res.render("cocktails/admin", {
            errorMsg: "Rellena el usuario, la contraseÃ±a y el rol"
        })
        return
    }

    User
        .findOne({
            username
        })
        .then(user => {
            if (user) {
                res.render("cocktails/admin", {
                    errorMsg: "El usuario ya existe en la BBDD"
                })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({
                    username,
                    password: hashPass,
                    role
                })
                .then(() => res.redirect("/cocktails/admin"))
                .catch(() => res.render("cocktails/admin", {
                    errorMsg: "No se pudo crear el usuario"
                }))
        })
        .catch(error => next(error))
})

router.post('/userdel/:id', (req, res) => {

    const id = req.params.id

    User
        .findByIdAndRemove(id)
        .then(() => res.redirect('/cocktails/admin'))
        .catch(err => console.log('ERROR', err))
})

router.post('/recipedel/:id_cocktail', (req, res) => {

    const id = req.params.id_cocktail

    Cocktail
        .findByIdAndRemove(id)
        .then(() => res.redirect('/cocktails/admin'))
        .catch(err => console.log('ERROR', err))
})

module.exports = router