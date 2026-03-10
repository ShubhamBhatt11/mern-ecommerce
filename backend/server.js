import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body — like Laravel's request()->json()


// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});


// Error handling — must be last
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8000;
console.log("checking the console output - updating",PORT);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});