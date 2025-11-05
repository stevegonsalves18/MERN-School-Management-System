const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
const app = express()
const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5000

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

// Root route to avoid "Cannot GET /" on service URL
app.get('/', (req, res) => {
    res.send('MERN School Management API is running.');
});

// Simple health check endpoint for uptime monitoring
app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
    console.error("❌ Error: MONGO_URI not defined. Please check your .env or Render environment settings.");
    process.exit(1);
}

console.log("📝 Attempting to connect to MongoDB...");

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ Connected to MongoDB successfully"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        console.log("Connection string format should be: mongodb://... or mongodb+srv://...");
        process.exit(1);
    })

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`)
})