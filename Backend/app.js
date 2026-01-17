import express from "express";
import {config} from "dotenv";
import cors from "cors";
import dbConnect from "./dbConnection/dbConnect.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";


const app = express();
config({path:"./config/.env"});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.json());

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