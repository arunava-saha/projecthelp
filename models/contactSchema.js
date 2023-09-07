const mongoose = require('mongoose');

const schema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Id add to the Contact Database"],
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add the Contact Name"]
    },
    email: {
        type: String,
        required: [true, "Please add the Email ID"]
    },
    phone: {
        type: Number,
        required: [true, "Please add the Phone No."]
    }
},
    {
        timestamps: true
    })
module.exports = mongoose.model("Contact", schema);