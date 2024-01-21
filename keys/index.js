if(process.env.NODE_ENV === "production"){
    console.log("prod");
    module.exports = require("./prod");
}else{
    console.log("dev");
    module.exports = require("./dev");
}
