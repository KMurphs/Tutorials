const usersModel = require("../models/users.model.js")
const crypto = require('crypto');

exports.getModelVersion = function(req, res) {
    const data = {
        modelVersion: usersModel.getVersion()
    }

    res.status(200).json(data);
}

exports.insert = function(req, res) {
    const data = {
        modelVersion: usersModel.getVersion()
    }
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    console.log(salt)
    console.log(hash)
    console.log(req.body)
    usersModel.createUser(req.body).then((result) => {
        console.log(result)
        res.status(200).json({ id: result._id });
    })


}

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    usersModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};