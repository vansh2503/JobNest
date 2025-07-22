import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// ✅ Load .env
dotenv.config();

// ✅ Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Import all route files (ES modules)
import authRoutes from "./routes/auth.js";
import applicationRoutes from "./routes/applications.js";
import jobRoutes from "./routes/jobs.js";
import userRoutes from "./routes/userRoutes.js";
import embeddingRoutes from "./routes/embedding.js";
import recommendationRoutes from "./routes/recommendations.js";

const app = express();

// ✅ CORS configuration for deployment
app.use(cors({
  origin: [
    "https://your-frontend-url.com", // <-- Replace with your deployed frontend URL
    "http://localhost:5173", // for local dev
  ],
  credentials: true,
}));
app.use(express.json());

// ✅ API routes
app.use('/api/applications', applicationRoutes);
app.use('/api/auth/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/embedding', embeddingRoutes);
app.use('/api/recommendations', recommendationRoutes);

// ✅ Serve uploads folder as static
const uploadsPath = path.join(__dirname, 'uploads');
console.log('Serving static files from:', uploadsPath);
app.use('/uploads', express.static(uploadsPath));

// ✅ Serve public HTML/static files from root
app.use(express.static(__dirname));

// ✅ Route to check uploads folder
app.get('/api/check-uploads', (req, res) => {
  try {
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath, { recursive: true });
      console.log('Created uploads directory');
    }
    const files = fs.readdirSync(uploadsPath);
    res.json({ success: true, files, path: uploadsPath });
  } catch (err) {
    console.error('Error accessing uploads directory:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});
// ✅ Simple test route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// ✅ MongoDB connection and server start
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running at http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
