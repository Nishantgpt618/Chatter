console.log("process.env",JSON.stringify(process))
if(process.env.NODE_ENV === "production"){
    module.exports = require("./prod");
}else{
    module.exports = require("./dev");
}
