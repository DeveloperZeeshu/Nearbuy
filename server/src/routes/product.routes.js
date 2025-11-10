import { Router } from "express";
import verifyAccessToken from "../middlewares/verify.middleware.js";
import { addProduct, deactivateProduct, getAllProducts, reactivateProduct, searchProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router()

router.route('/add')
    .post(verifyAccessToken, addProduct)

router.route('/:id')
    .put(verifyAccessToken, updateProduct)

router.route('/products')
    .get(verifyAccessToken, getAllProducts)

router.route('/deactivateProd')
    .post(verifyAccessToken, deactivateProduct)

router.route('/reactivateProd')
    .post(verifyAccessToken, reactivateProduct)

router.route('/search')
    .get(searchProducts)

export const productRoute = router

