const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['Suscriptor', 'Admin'],
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User



/*
,
avatar: {
        type: String
}


*/