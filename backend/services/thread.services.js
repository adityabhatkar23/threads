const threadModel = require("../models/thread.model")

module.exports.createThread = async ({
	text, author,
}) => {
	if ( !text || !author) {
		throw new Error("Text and author are required");
	}

	const thread = await threadModel.create({
		text, author
	});

	return thread;
}
