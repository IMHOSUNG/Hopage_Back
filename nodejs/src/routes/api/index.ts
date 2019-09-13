import http from 'http'
import { Router , Express} from 'express'
import {authIndexRouter} from './auth'
import { monitorIndexRouter } from './monitor'

export const REST_API_server = (access_url:string,secure:boolean, app:Express, port:number) => {
    const server = http.createServer(app);
    server.listen(port); 
    const router = Router()
    router.use('/auth' , authIndexRouter)
    router.use('/monitor', monitorIndexRouter)
    app.use(access_url,router); 
}