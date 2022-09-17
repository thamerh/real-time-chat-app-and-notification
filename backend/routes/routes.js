import express from "express";
import {Register,Login,upload} from "../controllers/user.js"
const router=express.Router()

router.post('/Login',Login)
router.post('/Register',upload,Register)
export default router;