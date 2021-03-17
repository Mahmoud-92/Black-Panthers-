const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
	
	email: {type:String, required:true},
	username: {type:String, required:true},
	password: {type:String, required:true},
	passwordConf: {type:String, required:true}


    }

),

UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
