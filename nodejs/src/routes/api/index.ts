import http from 'http'
import { Router , Express} from 'express'
import {authIndexRouter} from './auth'
import { monitorIndexRouter } from './monitor'

export const REST_API_server = (access_url:string,secure:boolean, app:Express, port:number) => {
    const server = http.createServer(app);
    server.listen(port); 
    const router = Router()
    //jwt를 사용한 auth 기능
    router.use('/auth' , authIndexRouter)
    //curl 명령어를 사용하여 rest api에 요청하면 socket.io를 통해
    //실시간 중계
    router.use('/monitor', monitorIndexRouter)
    app.use(access_url,router); 
}