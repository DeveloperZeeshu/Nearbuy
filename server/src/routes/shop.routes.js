import { Router } from "express";
import { getShopMePage } from "../controllers/shop.controller.js";
import verifyAccessToken from "../middlewares/verify.middleware.js";

const router = Router()

router.route('/shop/me')
    .get(verifyAccessToken, getShopMePage)

export const shopRoutes = router
