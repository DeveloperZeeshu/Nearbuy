import { Router } from 'express'
import { getRefreshPage, logoutUserPage, postLoginPage, postRegisterPage } from '../controllers/auth.controller.js'
import verifyAccessToken from '../middlewares/verify.middleware.js'
import { loginLimiter } from '../utils/loginLimiter.js'

const router = Router()

router.route('/login').post(loginLimiter, postLoginPage)
router.route('/register').post(postRegisterPage)
router.route('/refresh').get(getRefreshPage)
router.route('/logout').post(verifyAccessToken, logoutUserPage)

export const authRoutes = router


