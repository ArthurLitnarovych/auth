import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";

dotenv.config();

const port = +process.env.PORT;
const mongodburl = process.env.MONGODBURL;

const app = express();

app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRouter);

const start = async () => {
    try {
        await mongoose.connect(mongodburl);
        console.log(mongoose.connection.readyState === 1);
    } catch(error) {
        console.log(`${error} - no connection`);
    };
    
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
};

start();