import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body — like Laravel's request()->json()

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

// Start server
const PORT = process.env.PORT || 5000;
console.log("checking the console output",PORT);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});