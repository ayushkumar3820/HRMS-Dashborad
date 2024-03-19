import express from "express";
import {
  getDailySales,
  getMonthlySales,
  getSales,
} from "../controllers/sales.js";
const router = express.Router();

router.get("/sales", getSales);
router.get("/sales/daily", getDailySales);
router.get("/sales/monthly", getMonthlySales);

export default router;
