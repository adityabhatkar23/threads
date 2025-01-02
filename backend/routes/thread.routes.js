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

// Add this route to fetch all threads
router.get("/", authMiddleware.authUser, threadController.getAllThreads);


module.exports = router; 