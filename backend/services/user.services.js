const userModel = require("../models/user.model")
const crypto = require("crypto")

module.exports.createUser = async ({
	name, email, password
}) => {
	if ( !email || !password) {
		throw new Error("All fields are required");
	}
	
	const hash = crypto.createHash("sha256").update(email).digest("hex")
	let username = email.split("@")[0]+"_"+ hash.substring(0, 5);

	const user = await userModel.create({
		name, email, password,username
	});

	return user;
};
