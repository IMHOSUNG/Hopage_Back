import console = require("console");

export const events = {

    serverReceiver(socket:SocketIO.Socket,io:SocketIO.Server,id:number){
        socket.on('serverReceiver', (data)=>{
            //클라이언트 이벤트 호출
            console.log('ServerReceiver ' +data.message)     
            io.sockets.emit('clientReceiver', {clientID: id, message: data.message});  
        });
    },

    setClientID(socket:SocketIO.Socket,io:SocketIO.Server,id:number){
        socket.on('setClientID' ,(data) => {
          console.log('setClientID ' + id + 'pid ' + process.pid)
          io.sockets.emit('getClientID',{clientID : id, prossid : process.pid})
        })      
    },

    disconnect(socket:SocketIO.Socket,io:SocketIO.Server){
        socket.on('disconnect', (data)=>{
            console.log(socket.id+'  disconnect');
            io.sockets.emit('clientRecevier', {clientID : data.clientID , message : 'disconnect'})
        })
    },
    
    reconnet(socket:SocketIO.Socket,io:SocketIO.Server){
        socket.on('reconnect', (data) => {
            console.log('reconnect');
        })
    },
}
