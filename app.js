import express from "express";
import mongoose from "mongoose";
import mysql from "mysql";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import patientRoute from "./routes/patientRoute.js";
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

export default app;