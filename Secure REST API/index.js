const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require("./common/config/env.config")

const logger = function(req, res) {
    console.log(req.body)
    res.status(201).json({ test: "test" });
}

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    return next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/users", [
    logger
])

app.listen(config.PORT, function() {
    console.log("API Server Listening at Port: " + config.PORT)
})