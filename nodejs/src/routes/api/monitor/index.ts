import { Router } from 'express'
import * as controller from './monitorcontroller'

const router = Router()

//post (access_url , controller)
router.post('/state' , controller.state)

export {router as monitorIndexRouter}