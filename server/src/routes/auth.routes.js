import { Router } from 'express'
import { getRefreshPage, logoutUserPage, postLoginPage, postRegisterPage } from '../controllers/auth.controller.js'

const router = Router()

router.route('/login').post(postLoginPage)
router.route('/register').post(postRegisterPage)
router.route('/refresh').get(getRefreshPage)
router.route('/logout').post(logoutUserPage)

export const authRoutes = router


