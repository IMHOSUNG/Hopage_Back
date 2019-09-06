import { Router } from 'express'
import {authIndexRouter} from './auth'

const router = Router()

//post (access_url , controller)
router.use('/auth' , authIndexRouter)

export { router as apiIndexRouter}