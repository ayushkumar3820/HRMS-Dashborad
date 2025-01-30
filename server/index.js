import express from "express";
import cors from "cors";
import connectDB from "./config/data.js";
import dotenv from "dotenv";
import userRoutes from './Router/user.router.js';
// import { authMiddleware, authorizeRoles } from './middleware/authMiddleware.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
connectDB();
app.use(notFound);
app.use(errorHandler);

// Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
