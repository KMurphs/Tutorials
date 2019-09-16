const express = require("express");
const app = express();
const http = require("http").Server(app);
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");

const io = require("socket.io");
const socket = io(http);

const config = require("./config/config");
const loginRouter = require("./routes/login.router");
const chatRouter = require("./routes/chat.router");
const chatConnection = require("./models/connect");
const chat = require("./models/chat");



app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"))
app.use("/login", loginRouter)
app.use("/chats", chatRouter)






socket.on("connection", socket => {
	console.log("user connected")
	socket.on("disconnect", () => {
		console.log("user disconnected")
	});
	//Someone is typing
	socket.on("typing", data => {
		socket.broadcast.emit("notifyTyping", {
			user: data.user,
			message: data.message
		});
	});
	//when soemone stops typing
	socket.on("stopTyping", () => {
		socket.broadcast.emit("notifyStopTyping");
	});
	//Message was received
	socket.on("chat message", function(msg) {
		console.log("message: " + msg);
		//broadcast message to everyone in port:5000 except yourself.
		socket.broadcast.emit("received", { message: msg });
		//save chat to the database
		chatConnection.then(db => {
			console.log("connected correctly to the server");
			let chatMessage = new chat({ message: msg, sender: "Anonymous" });
			chatMessage.save();
		});
	});
});




http.listen(config.port, () => {
	console.log(`Server Running on Port: ${config.port}`)
})