
import {Socket_IO_server} from './routes/ws/socketIO'
import {REST_API_server} from './routes/api/index'
import cluster from 'cluster'
import os from 'os'
import express from 'express'
import dbconfig from './config/dbconfig'
import {MongoDBset} from './dbmodel/index'
import helmet from 'helmet'

const rPort = 3000;
const sPort1 = 3010;
const sPort2 = 3020;
const clusterModule = false

// 클러스터의 worker는 해당 포트 번호를 공유한다.
// 하지만 fork 의 특성상 새로운 프로세스 생성 메모리를 공유하지 않는다.

// 쓰레드도 있던 데 어떠한 차이점이 있을까??
if(clusterModule && cluster.isMaster ){
    var cpus = os.cpus().length;
    for (var i = 0; i < cpus; i++) {
      cluster.fork()
    }
    cluster.on('exit', function(worker:any, code:any, signal:any) {
        console.log('worker ' + worker.process.pid + ' died')
        console.log("worker를 재 생성 합니다. ")
        cluster.fork()
    })
}else {

    const app = express()
    //xss 공격 방지 
    app.use(helmet.xssFilter())
    //json 파일 형식 처리
    app.use(express.json())
    //jwt 생성 시크릿 키 지정    
    app.set('jwt-secret',dbconfig.secret)
    
    MongoDBset(dbconfig.mongodbUri)
    REST_API_server('/api',true,app,rPort)
    Socket_IO_server('/ws',true, app, sPort1)
    Socket_IO_server('/time',true, app, sPort2)
 
    //서버 연결 확인 및 pid 확인
    console.log(`Listening at http://127.0.0.1:${rPort}...`);
    console.log('pid ' + process.pid)

}