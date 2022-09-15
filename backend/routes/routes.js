import express from "express";
import {RegisterUser} from "../controllers/user.js"
const router=express.Router()

// router.post('/Login',LoginUser)
router.post('/Register',RegisterUser)
export default router;