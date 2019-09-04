import http from 'http'
import express from 'express' // 1
import socketIo from 'socket.io'
//import socketAuth from 'socket.io-auth'
import * as killPort from 'cluster'
//import adapter from 'socket.io-redis'
import { IOServerConnection } from '../src/routes/sockets'
import { con_func } from '../src/routes/socketfunc'

const app = express();
//루트에 대한 get 요청에 응답

const server = http.createServer(app);
server.listen(3000);
console.log("listening at http://127.0.0.1:3000...");
let io = socketIo.listen(server);

let sockets = io.sockets
let IOServerCon = new IOServerConnection(io,sockets)
//클로저를 사용해, private한 유니크 id를 만든다


//서버 소켓 생성
//소켓 Connection 이벤트 함수
IOServerCon.setConnection(con_func.setClientID)
IOServerCon.setConnection(con_func.serverReceiver)