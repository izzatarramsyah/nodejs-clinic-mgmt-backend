import express from "express";
import mongoose from "mongoose";
import mysql from "mysql";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import patientRoute from "./routes/patientRoute.js";
import visitHistoryRoute from "./routes/visitHistoryRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import medicineRoute from "./routes/medicineRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import purchaseRoute from "./routes/purchaseRoute.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();

const dbConnection = process.env.MONGURI;
const app = express();

mongoose.connect(dbConnection, {useNewUrlParser : true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.on('open', ()=> console.log("Database Connected "));

app.use(cors({ credentials:true, origin:'http://localhost:3000', exposedHeaders: ["set-cookie"] }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.text());
app.use('/users', userRoute);
app.use('/patient', patientRoute);
app.use('/visitHistory', visitHistoryRoute);
app.use('/doctor', doctorRoute);
app.use('/inventory', inventoryRoute);
app.use('/medicine', medicineRoute);
app.use('/dashboard', dashboardRoute);
app.use('/purchase', purchaseRoute);

export default app;