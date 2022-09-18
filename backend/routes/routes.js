import express from "express";
import {Register,Login,upload,SearchUsers} from "../controllers/user.js";
import Protect from "../middleware/Authorization.js";
import { CreateChat,GetChats,createGroupChat} from "../controllers/Chat.js";
const router=express.Router()
// user routes
router.post('/Login',Login)
router.post('/Register',upload,Register)
router.route("/user").get(Protect,SearchUsers);
// chat routes
router.route("/Chat").post(Protect,CreateChat).get(Protect,GetChats);
router.post('/chat/group',Protect,createGroupChat)
export default router;