import express from "express";
import {register,login,logOut} from "../controllers/auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router=express.Router();


router.post("/register",register);
router.post("/login",login);
router.post("/logOut",verifyToken ,logOut);


export default router;