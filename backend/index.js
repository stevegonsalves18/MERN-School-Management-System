// ===============================
// ✅ Import Dependencies
// ===============================
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

// ===============================
// ✅ App Configuration
// ===============================
dotenv.config(); // Load environment variables from .env
const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// ===============================
// ✅ MongoDB Connection
// ===============================
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ===============================
// ✅ Routes
// ===============================
app.use("/", Routes);

// ===============================
// ✅ Root Route (for testing)
// ===============================
app.get("/", (req, res) => {
    res.send("🚀 Server is running successfully!");
});

// ===============================
// ✅ Start Server
// ===============================
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});
