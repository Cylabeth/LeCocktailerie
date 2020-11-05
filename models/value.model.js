const mongoose = require('mongoose')
const Schema = mongoose.Schema

const valueSchema = new Schema({
    category: {
        type: [String]
    },

    alcohol: {
        type: [String]
    },

    glass: {
        type: [String]
    }
},
    {
        timestamps: true
    }
)

const Value = mongoose.model("Value", valueSchema)

module.exports = Value