const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    const {firstName, lastName, email, contactNumber } = req.body;

    if(!firstName || !lastName || !email || !contactNumber){
       return res.status(400).send({message: "partial information provided for signup process to proceed provide all details"})
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        email,
        contactNumber,
        password: bcrypt.hashSync(req.body.password,8)
    })

    try{
        user.save()
        .then(
            res.status(200).send({message: "user Registered"})
        )
        console.log(user)
    }catch(err){
        res.status(422).send(err)
    }
}

exports.login = (req, res) => {
    const {email, password } = req.body;
    console.log(email,password);

    User.findOne({
        email: email
    })
    .populate({
        path: 'AllchatID',
        model: 'Chats',
        populate: [{
            path: "userOne",
            model: "User"
          },{
            path: "userTwo",
            model: "User"
          }]
    })
    .exec((err, user) => {
        if(err){
            return res.status(500).send({message: `Error occured at ${err}`})
            
        }
        if(!user){
            return res.status(400).send({message: "User not found in database"})
            
        }
        var passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        )
        if(!passwordIsValid){
            return res.status(401).send({message: "Please enter the correct password"})
            
        }
        res.status(200).send(user);
    })
}