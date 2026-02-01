import express from "express";
import {config} from "dotenv";
import cors from "cors";
import dbConnect from "./dbConnection/dbConnect.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.routes.js";


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


// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing",listingRouter);
app.use("/api/message",messageRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statuscode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
});


// Database Connection
dbConnect();

export default app;