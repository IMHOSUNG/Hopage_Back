import {Server_accept, Server_broadCast, Server_send, Client_Send, Client_accept } from './actions'

export const events = {

    //if use sockets >> broadcast
    //if use socket >> peer to peer 
    

    serverReceiver(socket:SocketIO.Socket,sockets:SocketIO.Namespace,id:number){
        socket.on('serverReceiver', (data)=>{
            //클라이언트 이벤트 호출
            console.log('ServerReceiver ' +data.message)     
            sockets.emit('clientReceiver', {clientID: id, message: data.message});  
        });
    },

    setClientID(socket:SocketIO.Socket,sockets:SocketIO.Namespace,id:number){
        socket.on('setClientID' ,(data) => {
          console.log('setClientID ' + id + 'pid ' + process.pid)
          sockets.emit('getClientID',{clientID : id, prossid : process.pid})
        })      
    },

    disconnect(socket:SocketIO.Socket,sockets:SocketIO.Namespace){
        socket.on('disconnect', (data)=>{
            console.log(socket.id+'  disconnect');
            socket.emit('clientRecevier', {clientID : data.clientID , message : 'disconnect'})
        })
    },
    
    reconnet(socket:SocketIO.Socket,io:SocketIO.Server){
        socket.on('reconnect', (data) => {
            console.log('reconnect');
        })
    },
}
