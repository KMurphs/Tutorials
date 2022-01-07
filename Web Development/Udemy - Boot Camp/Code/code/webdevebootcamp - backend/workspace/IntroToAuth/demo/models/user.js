var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
    name:       String,
    password:   String
})
UserSchema.plugin(passportLocalMongoose); //add methods and properties of passportLocalMongoose to schema


module.exports = mongoose.model('User', UserSchema);