import socketIo from 'socket.io'
import { events } from './events'
import console = require('console');
let redis = require('socket.io-redis')

let uniqueID = (function () {
    let id = 0;
    return function(){return ++id}
})();

export const IOserver = (server:any,Auth:boolean,userInfo?:string) => {
    
    if(Auth === true){
        let io = socketIo.listen(server)
        io.adapter(redis({host: 'localhost', port : 6379}))
        let sockets = io.sockets
        
        sockets.on('connect' , (socket)=> {
            let clientID= uniqueID()

            console.log("connect something to "+process.pid)
            console.log("socket id is " + socket.id)
            events.setClientID(socket,io,clientID)
            events.serverReceiver(socket,io,clientID);
            events.disconnect(socket,io)
        })

    }else{
        console.log("Not Auth")
    }
} 