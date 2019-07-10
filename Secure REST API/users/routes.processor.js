const usersController = require("./controllers/users.controller.js")
const ValidationMiddleware = require("../common/middleware/auth.validation.middleware")

exports.processRequest = function(app) {
    app.get("/users/modelVersion", [
        usersController.getModelVersion
    ])
    app.post("/users", [
        usersController.insert
    ])
    app.get("/users", [
        ValidationMiddleware.validJWTNeeded,
        usersController.list
    ])
}