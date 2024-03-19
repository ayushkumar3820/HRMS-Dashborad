// ---- Import Packages ---- //
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// ---- Import Routes ---- //
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";

// ---- Configuration ---- //
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ---- Routes Middleware ---- //
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// ---- Database Connect ---- //
const mongoURL = process.env.MONGO_URL;
const Port = process.env.PORT || 9000;

mongoose
  .connect(mongoURL)
  .then(() => {
    app.listen(Port, () => console.log(`Server listening on port: ${Port}`));

    // insert auto user data in dbs
    // User.insertMany(dataUser);

    // insert auto product data in dbs
    // Product.insertMany(dataProduct);

    // insert auto productStat data in dbs
    // ProductStat.insertMany(dataProductStat);

    // insert auto transaction data in dbs
    // Transaction.insertMany(dataTransaction);

    // insert auto overallStat data in dbs
    //OverallStat.insertMany(dataOverallStat);

    // insert auto AffiliateStat data in dbs
    //AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => console.log(`${error} did not connect`));
