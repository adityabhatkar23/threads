const mongoose = require("mongoose");
const threadModel = require("../models/thread.model");
const userModel = require("../models/user.model");
const threadServices = require("../services/thread.services");

module.exports.createThread = async (req, res, next) => {
  try {
    const { text } = req.body;
    const author = req.user._id;

    if (!text || !author) {
      throw new Error("Text and author are required");
    }

    const thread = await threadServices.createThread({
      text,
      author,
    });

    await userModel.findByIdAndUpdate(author, {
      $push: { threads: thread._id },
    });

    res.status(201).json({ thread });
  } catch (error) {
    console.error("Thread creation error:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.getThread = async (req, res, next) => {
  try {
    const threadId = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(threadId)) {
      return res.status(400).json({ message: "Invalid thread ID" });
    }

    const thread = await threadModel.findById(threadId)
      .populate("author")
      .populate({
        path: "children",
        populate: { path: "author" }
      });

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.status(200).json({ thread });
  } catch (error) {
    console.error("Get thread error:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllThreads = async (req, res, next) => {
  try {
    const threads = await threadModel.find().populate("author");
    res.status(200).json({ threads });
  } catch (error) {
    console.error("Error fetching threads:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.addComment = async (req, res, next) => {
	try {
	  const { text } = req.body;
	  const author = req.user._id;
	  const parentId = req.params.id

	  if (!text || !author) {
		throw new Error("Text and author are required");
	  }
  
	  const parentThread = await threadModel.findById(parentId);
	  if (!parentThread) {
		return res.status(404).json({ message: "Parent thread not found" });
	  }
  
	  
	  const comment = await threadModel.create({
		text,
		author,
		parentId,
	  });
  
	  parentThread.children.push(comment._id);
	  await parentThread.save();
  
	  res.status(201).json({ message: "Comment added successfully", comment });
	} catch (error) {
	  console.error("Error adding comment:", error);
	  res.status(500).json({ message: error.message });
	}
  };
  