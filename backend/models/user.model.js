const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required:true,
    minlength: [3, "name must be at least 3 character "],
  },
  bio: {
    type: String,
    maxlength: 160,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
  },
  avatar: {
    type: String,
  },
  link: String,
  password: {
    type: String,
    required: true,
    select: false,
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

userSchema.pre('save', async function (next) {
  this.avatar = `https://api.dicebear.com/9.x/open-peeps/svg?seed=${this.email}`
  next(); 
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
