const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cocktailSchema = new Schema({
    strDrink: {
        type: String

    },
    strCategory: {
        type: String

    },
    strAlcoholic: {
        type: String

    },
    strGlass: {
        type: String

    },
    strDrinkThumb: {
        type: String

    },
    strInstructions: {
        type: String

    },
    strIngredients: {
        type: [String]
    },
    strOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    strTags: {
        type: [String]
    }
},
    {
        timestamp: true
    }
)

const Cocktail = mongoose.model('Cocktail', cocktailSchema)

module.exports = Cocktail