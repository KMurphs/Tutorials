const express = require("express");
const bodyParser = require("body-parser");

const Chats = require("./../models/chat");
const chatConnection = require("./../models/connect");

const router = express.Router();



router.route("/").get((req, res, next) => {
	res.setHeader("Content-Type", "application/json");
	res.statusCode = 200;


	chatConnection.then(db => {
		let data = Chats.find({ message: "Anonymous" });
		Chats.find({}).then(chat => {
			res.json(chat);
		});
	});
});



module.exports = router;