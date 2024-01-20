const authController = require("../controllers/auth.controller");
const checkDuplicateEmailAddress = require("../middlewares/verifySignUp");


module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "X-access-token, Origin, Content-Type, Accept"
        );
        next();
    })


    app.post(
        "/api/signup",
        checkDuplicateEmailAddress,
        authController.signup
    )

    app.post(
        "/api/login",
        authController.login
    )
}