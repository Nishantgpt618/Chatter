const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema([{
  messages: [
    {
      from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now },
      message: String,
    },
  ],
  userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userTwo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chatId: {type: mongoose.Schema.Types.ObjectId}
}]);

module.exports = mongoose.model("Chats", chatSchema);