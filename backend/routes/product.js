import express from "express";
import {createProduct,getAllProducts,getProduct,getPopularProducts} from "../controllers/product.js";


const router=express.Router();


router.post("/",createProduct);
router.get("/",getAllProducts);
router.get("/find/:id",getProduct);
router.get("/popularProducts",getPopularProducts);


export default router;