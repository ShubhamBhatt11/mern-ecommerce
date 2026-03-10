import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Product from './models/productModel.js';
import products from './data/products.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();

        // Insert sample products
        await Product.insertMany(products);

        console.log('Data imported successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();