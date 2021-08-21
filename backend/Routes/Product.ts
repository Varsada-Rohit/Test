import express from "express"
import ProductsController from "../Controllers/Product"

const router = express.Router()


    
router.get("/products",ProductsController.getAllProducts)
router.post("/addproduct",ProductsController.addProduct)



export = router