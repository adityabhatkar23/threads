const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const threadController = require("../controllers/thread.controllers");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/create",
  authMiddleware.authUser,
  [body("text").notEmpty()],
  threadController.createThread
);

router.get("/:id", authMiddleware.authUser, threadController.getThread);

router.get("/", authMiddleware.authUser, threadController.getAllThreads);

router.post("/:id/comments",authMiddleware.authUser,threadController.addComment);

module.exports = router; 