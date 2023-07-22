import express from "express";
import {createOrder,getOrdersFromStripe,getUserOrders} from "../controllers/order.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router=express.Router();


router.post("/",verifyToken,createOrder);
router.get('/success',verifyToken,getOrdersFromStripe);
router.get('/find/:userId',verifyToken,getUserOrders)


export default router;