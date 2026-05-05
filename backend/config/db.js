const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    if (error?.code === "ETIMEOUT" && error?.syscall === "querySrv") {
      console.error(
        "MongoDB Atlas DNS lookup timed out. Check internet/DNS and Atlas Network Access allowlist."
      );
    }
    console.error("MongoDB connection error:", error.message);
    console.log("Running in local fallback mode (without MongoDB).");
  }
};

module.exports = connectDB;
