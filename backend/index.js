import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBconnect from "./config/db.js"
import router from "./routes/routes.js";

const app=express();
dotenv.config();
DBconnect();
app.get("/",(req,res)=>{
res.send("API IS RUNNING")
});
app.use(express.json());
app.use(router);
app.use(cors({ credentials:true, origin:process.env.URL}));
const port=process.env.PORT || 5000
app.listen(port,console.log(`server started in port ${port}`));