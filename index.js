const express = require("express");
require("./model/User");
require("./model/Chats");
require("./database");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000",
};
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Chats = mongoose.model("Chats");

const http = require("http");
const server = http.createServer(app);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.json({ type: "application/json" }));

require("./routes/auth.routes")(app);
require("./routes/data.routes")(app);
let origin;

if (process.env.NODE_ENV === "production") {
  origin = "https://polar-bayou-51020.herokuapp.com";
} else {
  origin = "http://localhost:3000";
}

const io = new Server(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});

//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("loginUser", (data) => {
    socket.join(data._id.toString());
    console.log("user logged in with ID : " + data._id);
    socket.emit("loggedIn", {
      firstName: data.firstName,
      lastName: data.lastName,
    });
  });

  socket.on("send_message", async (data) => {
    const { from, to, message, commonChatId } = data;
    console.log(from, to, message, commonChatId);
    if (!from || !message) {
      io.to(from).emit("error_occured", {
        message: "please provide some text",
      });
      // return res.status(203).send({ message: "please provide some text" });
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

      createChat.messages.push({
        from: userSender,
        message,
      });
      newId = createChat._id;
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

      newId = createChat._id;
    }
    try {
      userSender.save();
      userReceiver.save();
      createChat.save().then(async () => {
        var populatedChat = await Chats.findById({
          _id: newId,
        }).populate([
          {
            path: "messages.from",
            model: "User",
          },
          {
            path: "userOne",
            model: "User",
          },
          {
            path: "userTwo",
            model: "User",
          },
        ]);
        io.to(from).emit("receive_message", {
          message: "Your message was posted on the chatID",
          chatData: populatedChat,
          userSender: userSender,
        });
        io.to(to).emit("receive_message", {
          message: "Your message was posted on the chatID",
          chatData: populatedChat,
          userReceiver: userReceiver,
        });
      });
    } catch (err) {
      io.to(from).emit("error_occured", {
        message: `error occured ${err}`,
      });
    }
  });

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("chatter/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "chatter", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT);
