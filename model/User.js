const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    contactNumber: Number,
    password: String,
    AllchatID: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chats'}]
})

module.exports = mongoose.model("User", userSchema);