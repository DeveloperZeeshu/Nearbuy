import { Router } from "express";
import { getShopMePage, putUpdateShop } from "../controllers/shop.controller.js";
import verifyAccessToken from "../middlewares/verify.middleware.js";

const router = Router()

router.route('/shop/me')
    .get(verifyAccessToken, getShopMePage)

router.route('/shop/updateShop')
    .put(verifyAccessToken, putUpdateShop)

export const shopRoutes = router
