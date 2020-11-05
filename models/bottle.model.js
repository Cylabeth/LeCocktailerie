const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bottlesSchema = new Schema({
    name: {
        type: String
    },
    image: {
        type: String
    }
},
    {
        timestamp: true
    }
)

const Bottle = mongoose.model('Bottle', bottlesSchema)

module.exports = Bottle