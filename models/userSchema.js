const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the User Name"]
    },
    email: {
        type: String,
        required: [true, "Please add the User Email ID"],
        unique: [true, "The User Email ID is already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the User password"]
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model("User", schema);