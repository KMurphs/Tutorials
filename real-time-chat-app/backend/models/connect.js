const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

module.exports = mongoose.connect(require("../config/config").DB_URL, { 
	useNewUrlParser: true 
});
