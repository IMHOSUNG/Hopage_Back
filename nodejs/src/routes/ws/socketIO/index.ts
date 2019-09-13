import http from 'http'
import socketIo from 'socket.io'
import { events } from './events'
import console = require('console');
let redis = require('socket.io-redis')

let uniqueID = (function () {
    let id = 0;
    return function(){return ++id}
})();

export const Socket_IO_server = (accessurl:string,Auth:boolean,FrameWork:any,port:number) => {
    
    if(Auth === true){

        //of와 path의 개념이 다르다...!!
        let httpConnect = http.createServer(FrameWork);
        httpConnect.listen(port)
        let io = socketIo({path:accessurl}).listen(httpConnect)
        io.adapter(redis({host: 'localhost', port : 6379}))
        FrameWork.set(accessurl, io)
        //console.log(server.port)

        io.on('connect' , (socket)=> {
            let clientID= uniqueID()
            console.log("connect something to "+process.pid)
            console.log("socket id is " + socket.id)
            events.setClientID(socket,io,clientID)
            events.serverReceiver(socket,io,clientID);
            
            if(accessurl === '/time'){
                events.getServerTimeInterval(socket,io,10000)
                events.disconnect(socket,io)
            }
        })

    }else{
        console.log("Not Auth")
    }
} 