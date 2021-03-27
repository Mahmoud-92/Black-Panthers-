const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{

		email: { type: String, required: true },
		avatar: { type: String },
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		password: { type: String, required: true },
		emiratesId: { type: String, required: true },
		dob: { type: String, required: true },
		phonenum: { type: String, required: true },
		adress: { type: String, required: true },
		vehicleType: { type: String, required: true },
	}

),

UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
