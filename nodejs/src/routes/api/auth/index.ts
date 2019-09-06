import { Router } from 'express'
import * as controller from './authcontroller'

const router = Router()

//post (access_url , controller)
router.post('/register' , controller.register)

export {router as authIndexRouter}