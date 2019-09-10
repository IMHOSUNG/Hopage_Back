import http from 'http'
import {IOserver} from './routes/ws/socketIO'
import cluster from 'cluster'
import os from 'os'
import express from 'express'
import mongoose from 'mongoose'
import dbconfig from './config/dbconfig'
import {apiIndexRouter} from './routes/api'
import bodyParser from 'body-parser'

const clusterModule = false

if(clusterModule && cluster.isMaster ){
    var cpus = os.cpus().length;
    for (var i = 0; i < cpus/2; i++) {
      cluster.fork()
    }
    cluster.on('exit', function(worker:any, code:any, signal:any) {
        console.log('worker ' + worker.process.pid + ' died')
    })
}else {

    const app = express()
    const port = 3000;
    const port2 = 3001;

    //bodyparser post send 함수 >> json 파일 형식 처리
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    //jwt 생성 시크릿 키 지정
    app.set('jwt-secret',dbconfig.secret)
    
    //http 서버 생성 및 포트 지정
    const server = http.createServer(app);
    server.listen(port); 

    const server2 = http.createServer(app);
    server2.listen(port2)
    //get,post 등은 router가 받는 형식에 따른 처리
    //use는 그 경로에 따라 보내 주는 형식

    //url에 따른 라우터 처리

    app.get('/', ()=>{
        console.log('access / ')
    })
    app.use('/api', apiIndexRouter)

    IOserver('/ws',server,true)
    IOserver('/time',server2,true)
    //IOserver('/time',server2,true)
 
    //서버 연결 확인 및 pid 확인
    console.log(`listening at http://127.0.0.1:${port}...`);
    console.log('pid ' + process.pid)

    mongoose.connect(dbconfig.mongodbUri,{useNewUrlParser: true, useCreateIndex: true})
    const db = mongoose.connection
    db.on('error', console.error)
    db.once('open', ()=>{
    console.log('connected to mongodb server')
})
}