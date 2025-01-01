const userModel = require("../models/user.model")
const userServices = require("../services/user.services")
const {validationResult} = require ("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports.registerUser = async (req,res,next) => {

	const error = validationResult(req)
	if(!error.isEmpty()){
		return res.status(400).json({errors:error.array()})
	}
	
	const { email,password} = req.body;
	
	

	const hashedPassword = await userModel.hashPassword(password)

	const user = await userServices.createUser({
		email, password:hashedPassword, 
	})

	const token = user.generateAuthToken();

	res.status(201).json ({token, user})

}

module.exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	const error = validationResult(req)
	if(!error.isEmpty()){
		return res.status(400).json({errors:error.array()})
	}
	
	

	const user= await userModel.findOne({email}).select("+password")

	if(!user){
		return res.status(401).json({message:"Invalid email or password"})
	}
	
	const isMatch = await user.comparePassword(password);

	if(!isMatch){
		return res.status(401).json({message:"Invalid email or password"})
	}

	const token = user.generateAuthToken();
	res.cookie("token",token)

	res.status(200).json({token,user})

	res.status(200).json({ token, user });
};


module.exports.getUserProfile = async (req, res, next) => {
	res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ message: "Successfully logged out" });
};

module.exports.updateProfile = async (req,res) => {
	try {
		const { name, bio, link } = req.body;
		
		// Check if user exists
		if (!req.user) {
			return res.status(401).json({ message: "User not found" });
		}

		// Update user fields
		const user = await userModel.findById(req.user._id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Update only if value is provided
		if (name) user.name = name;
		if (bio) user.bio = bio;
		if (link) user.link = link;

		await user.save();

		// Generate new token with updated user info
		const token = user.generateAuthToken();

		res.status(200).json({ 
			message: "Profile updated successfully",
			user,
			token 
		});
	} catch (error) {
		console.error('Profile update error:', error);
		res.status(400).json({ message: error.message });
	}
}