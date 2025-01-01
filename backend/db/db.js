const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

function connectToDb(){
	
	console.log(`Connecting to MongoDB at ${URI}`);
	mongoose.connect(URI)

	.then(()=>{
		console.log("Connected to DB");
	})
	.catch(err => console.log(err));
}

module.exports = connectToDb;