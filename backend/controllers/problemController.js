const Problem = require("../models/Problem");
const dsaSheet = require("../data/dsaSheet");
const mongoose = require("mongoose");
const localStore = require("../utils/localStore");

const isMongoConnected = () => mongoose.connection.readyState === 1;

exports.addProblem = async (req, res) => {
  try {
    const data = isMongoConnected()
      ? await Problem.create({ ...req.body, userId: req.user.id })
      : localStore.createProblem({ ...req.body, userId: req.user.id, isCompleted: false });
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Failed to add problem", error: error.message });
  }
};

exports.getProblems = async (req, res) => {
  try {
    let data = isMongoConnected()
      ? await Problem.find({ userId: req.user.id }).sort({ createdAt: -1 })
      : localStore.getProblemsByUser(req.user.id);

    if (data.length === 0) {
      const seededProblems = dsaSheet.map((item) => ({
        ...item,
        userId: req.user.id,
      }));
      if (isMongoConnected()) {
        await Problem.insertMany(seededProblems);
        data = await Problem.find({ userId: req.user.id }).sort({ createdAt: -1 });
      } else {
        data = localStore.insertProblems(seededProblems);
      }
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Failed to fetch problems", error: error.message });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const data = isMongoConnected()
      ? await Problem.findOneAndUpdate(
          { _id: req.params.id, userId: req.user.id },
          req.body,
          { new: true }
        )
      : localStore.updateProblemById(req.user.id, req.params.id, req.body);
    if (!data) return res.status(404).json({ msg: "Problem not found" });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Failed to update problem", error: error.message });
  }
};
