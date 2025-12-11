import { Router } from 'express'
import { getMe, getRefreshPage, logoutUserPage, postLoginPage, postRegisterPage } from '../controllers/auth.controller.js'
import verifyAccessToken from '../middlewares/verify.middleware.js'
import { loginLimiter } from '../utils/loginLimiter.js'

const router = Router()

router.route('/login').post(loginLimiter, postLoginPage)
router.route('/register').post(postRegisterPage)
router.route('/refresh').get(getRefreshPage)
router.route('/logout').post(verifyAccessToken, logoutUserPage)
router.route('/getMe').get(getMe)

export const authRoutes = router


