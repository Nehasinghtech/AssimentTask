const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addProblem,
  getProblems,
  updateProblem,
} = require("../controllers/problemController");

router.post("/", authMiddleware, addProblem);
router.get("/", authMiddleware, getProblems);
router.put("/:id", authMiddleware, updateProblem);

module.exports = router;
