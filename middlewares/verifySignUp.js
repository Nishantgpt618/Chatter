const mongoose = require("mongoose");
const user = mongoose.model("User");

const checkDuplicateEmailAddress = (req, res, next) => {
    user.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }

        if(user){
            res.status(400).send({message: "Email already registered with us"});
            return;
        }

        next();

    })
}


module.exports = checkDuplicateEmailAddress;