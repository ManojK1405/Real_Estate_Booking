import express from "express";
import {config} from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import dbConnect from "./dbConnection/dbConnect.js";
import authRouter from "./routes/auth.route.js";

const app = express();
config({path:"./config/.env"});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 

import userRouter from "./routes/user.routes.js";

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statuscode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
});

// Database Connection
dbConnect();

export default app;