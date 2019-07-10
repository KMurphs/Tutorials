//https://www.restapitutorial.com/lessons/httpmethods.html

TestController = require("./controllers/tests.controller")

exports.routesConfig = function(app) {
    app.get("/test", [
        TestController.getReply
    ]);
    // app.get("/*", [
    //     TestController.getDefaultReply
    // ]);
    app.post("/tests", [
        TestController.postReply
    ]);
    // app.post("/*", [
    //     TestController.postDefaultReply
    // ]);
    app.put("/tests", [
        TestController.putReply
    ]);
    // app.put("/*", [
    //     TestController.putDefaultReply
    // ]);
    app.delete("/tests/someTest", [
        TestController.deleteReply
    ]);
    // app.delete("/*", [
    //     TestController.deleteDefaultReply
    // ]);
}