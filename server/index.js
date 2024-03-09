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
import salesRoutes from "./routes/client.js";

import { dataUser } from "./data/index.js";
import User from "./models/User.js";

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

    // insert auto data in dbs
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
