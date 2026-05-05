const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { signup, login, getUser } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", auth, getUser);

module.exports = router;
