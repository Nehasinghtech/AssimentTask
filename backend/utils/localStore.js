const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "..", "data", "localdb.json");

function readDb() {
  const raw = fs.readFileSync(DB_PATH, "utf8");
  return JSON.parse(raw);
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

function randomId() {
  return crypto.randomUUID();
}

function findUserByEmail(email) {
  const db = readDb();
  return db.users.find((u) => u.email === email) || null;
}

function findUserById(userId) {
  const db = readDb();
  return db.users.find((u) => u._id === userId) || null;
}

function createUser({ email, password }) {
  const db = readDb();
  const user = { _id: randomId(), email, password };
  db.users.push(user);
  writeDb(db);
  return user;
}

function getProblemsByUser(userId) {
  const db = readDb();
  return db.problems.filter((p) => p.userId === userId);
}

function insertProblems(problems) {
  const db = readDb();
  const docs = problems.map((p) => ({ _id: randomId(), ...p }));
  db.problems.push(...docs);
  writeDb(db);
  return docs;
}

function createProblem(problem) {
  const db = readDb();
  const doc = { _id: randomId(), ...problem };
  db.problems.push(doc);
  writeDb(db);
  return doc;
}

function updateProblemById(userId, id, updates) {
  const db = readDb();
  const idx = db.problems.findIndex((p) => p._id === id && p.userId === userId);
  if (idx === -1) return null;
  db.problems[idx] = { ...db.problems[idx], ...updates };
  writeDb(db);
  return db.problems[idx];
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  getProblemsByUser,
  insertProblems,
  createProblem,
  updateProblemById,
};
