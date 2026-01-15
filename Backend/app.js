import express from "express";
import {config} from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import dbConnect from "./dbConnection/dbConnect.js";


const app = express();
config({path:"./config/.env"});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 


// Database Connection
dbConnect();

export default app;