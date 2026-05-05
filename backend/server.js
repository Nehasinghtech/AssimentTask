// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const connectDB = require("./config/db");

// const app = express();
// app.use(cors());
// app.use(express.json());

// connectDB();

// app.get("/api/health", (_req, res) => {
//   res.json({ status: "ok" });
// });

// // routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/problem", require("./routes/problemRoutes"));

// app.listen(5000, () => console.log("Server running on port 5000"));
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// root route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/problem", require("./routes/problemRoutes"));

// ✅ FIXED PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
