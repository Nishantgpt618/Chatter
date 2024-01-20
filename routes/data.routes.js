const dataController = require("../controllers/data.controller");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "X-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.post("/api/createChat",
    dataController.createChat);

    app.post("/api/searchChat",
    dataController.searchChat);

    app.get("/api/readUsers",
    dataController.readUsers);

    app.post("/api/updateUser",
    dataController.updateUser)

    app.get("/api/readChatData",
    dataController.readChatData);

    app.post("/api/update",
    dataController.update);

    app.post("/api/delete",
    dataController.delete);
}