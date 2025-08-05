
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();
import userRouter from "./routes/user.route.js";


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);

connectDB();


app.get("/", (req, res) => {
    res.send("Hello From Server");
});



app.listen(port, () => {
    console.log(`Hello From Server`);
});


app.listen(port, () => {
    console.log(`Server is running on port:  ${port}`);
    
});