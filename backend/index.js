import express from "express";
import dotenv from "dotenv";

const app=express();
dotenv.config();

app.get("/",(req,res)=>{
res.send("API IS RUNNING")
});
const port=process.env.PORT || 5000
app.listen(port,console.log(`server started in port ${port}`));