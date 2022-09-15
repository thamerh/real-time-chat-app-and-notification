import express from "express";
import {RegisterUser,LoginUser,upload} from "../controllers/user.js"
const router=express.Router()

router.post('/Login',LoginUser)
router.post('/Register',upload,RegisterUser)
export default router;