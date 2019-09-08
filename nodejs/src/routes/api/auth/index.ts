import { Router } from 'express'
import * as controller from './authcontroller'
import {authMiddleWare} from '../../../middleware/auth'

const router = Router()

//post (access_url , controller)
router.post('/register' , controller.register)
router.post('/login', controller.login)

router.use('/check',authMiddleWare)
router.get('/check', controller.check)

export {router as authIndexRouter}