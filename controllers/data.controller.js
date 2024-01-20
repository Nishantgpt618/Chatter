const mongoose = require("mongoose");
const User = mongoose.model("User");
const Chats = mongoose.model("Chats");

exports.createChat = async (req, res) => {
  const { from, to, message, commonChatId } = req.body;
  var createChat;
  var newId;

  if (!from || !message) {
    return res.status(203).send({ message: "please provide some text" });
  }

  const userSender = await User.findById({
    _id: mongoose.mongo.ObjectId(from),
  });

  const userReceiver = await User.findById({
    _id: mongoose.mongo.ObjectId(to),
  });

  if (commonChatId) {
    console.log(commonChatId);
    createChat = await Chats.findOne({
      _id: mongoose.mongo.ObjectId(commonChatId),
    }).populate({
      path: "messages.from",
      model: "User",
    });

    console.log(createChat);

    createChat.messages.push({
      from: userSender,
      message,
    });
    newId = createChat._id
  } else {
    console.log(commonChatId);
    createChat = new Chats({
      _id: new mongoose.Types.ObjectId(),
      userOne: mongoose.mongo.ObjectId(from),
      userTwo: mongoose.mongo.ObjectId(to),
      messages: [],
    });

    userSender.AllchatID.push(createChat._id);
    userReceiver.AllchatID.push(createChat._id);
    createChat.messages.push({
      from: mongoose.mongo.ObjectId(from),
      message,
    });
    console.log(from, " " , message);
    console.log(userSender);
    console.log(userReceiver);
    console.log(createChat);
    newId = createChat._id;
  }
  try {
    userSender.save();
    userReceiver.save();
    createChat.save()
    .then(
      async () => {
        var populatedChat = await Chats.findById({
          _id: newId,
        }).populate([{
          path: "messages.from",
          model: "User",
        },{
          path: "userOne",
          model: "User"
        },{
          path: "userTwo",
          model: "User"
        }])
        return res.status(200).send({
          message: "Your message was posted on the chatID",
          chatData: populatedChat,
        });
      }
    )
  } catch (err) {
    return res.status(422).send({ message: `error occured ${err}` });
  }
};

exports.searchChat = async (req, res) => {
  let chat = await Chats.findOne({
    _id: mongoose.mongo.ObjectId(req.body.chatId),
  }).populate({
    path: "messages.from",
    model: "User",
  });
  return res.status(200).send(chat);
};

exports.readUsers = async (req, res) => {
  let allUsers = await User.find({});
  return res.status(200).send({ message: "data fetched", payload: allUsers });
};

exports.updateUser = async (req, res) => {
  let user = await User.findById({
    _id: req.body.data,
  }).populate({
    path: "AllchatID",
    model: "Chats",
    populate: [{
      path: "userOne",
      model: "User"
    },{
      path: "userTwo",
      model: "User"
    }]
  });
  return res.status(200).send({ user });
};

exports.readChatData = async (req, res) => {
  let allChats = await Chats.find({});
  return res.status(200).send({ message: "data fetched", payload: allChats });
};

exports.update = async (req, res) => {
  const { _id, paragraph } = req.body;
  let uniquePost = await Post.findById({ _id: _id });
  uniquePost.paragraph = paragraph;
  uniquePost.save();
  return res.status(200).send({ message: "updated", payload: uniquePost });
};

exports.delete = async (req, res) => {
  const { _id } = req.body;
  Post.findByIdAndDelete(_id, function (err, docs) {
    if (err) {
      return res.status(404).send({ message: `error occured ${err}` });
    } else {
      return res
        .status(200)
        .send({ message: "Item deleted successfully", payload: docs });
    }
  });
};
