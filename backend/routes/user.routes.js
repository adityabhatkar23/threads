const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const userController = require("../controllers/user.controllers");

const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 8 })],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.post("/logout", authMiddleware.authUser, userController.logoutUser);

// Home route (protected)
router.get("/home", authMiddleware.authUser, (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the home page!", user: req.user });
});

router.post(
  "/update-profile",
  authMiddleware.authUser,
  userController.updateProfile
);

module.exports = router;
