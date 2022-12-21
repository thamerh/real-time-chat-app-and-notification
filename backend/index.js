import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBconnect from "./config/db.js"
import router from "./routes/routes.js";

const app=express();
dotenv.config();
DBconnect();
app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: true }));
//static Images Folder
app.use('/Images', express.static('./Images'));

app.use(cors({ credentials:true, origin:'http://localhost:3000'}));
const port=process.env.PORT || 5000
app.listen(port,console.log(`server started in port ${port}`));