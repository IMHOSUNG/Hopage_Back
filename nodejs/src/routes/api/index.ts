import { Router } from 'express'
import {authIndexRouter} from './auth'
import { monitorIndexRouter } from './monitor'

//url http://domain.co.kr/api
const router = Router()

//post (access_url , controller)
router.use('/auth' , authIndexRouter)
router.use('/monitor', monitorIndexRouter)

export { router as apiIndexRouter}