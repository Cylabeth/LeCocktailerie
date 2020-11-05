const mongoose = require('mongoose')
const Schema = mongoose.Schema

const glassesSchema = new Schema({
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

const Glass = mongoose.model('Glass', glassesSchema)

module.exports = Glass
