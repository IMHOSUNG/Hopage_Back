let uniqueID = (function(){
    var id = 0;
    return function(){ return id++; };
})();

export const con_func = {

    setClientID(socket:SocketIO.Socket,io:SocketIO.Server){
        let clientID = uniqueID();
        
        socket.on('setClientID' ,() => {
          console.log('Connection ' + clientID)
          io.sockets.emit('getClientID',{clientID : clientID})
        })
    },
      
    serverReceiver(socket:SocketIO.Socket,io:SocketIO.Server){
        socket.on('serverReceiver', (data)=>{
            //클라이언트 이베트 호출     
            io.sockets.emit('clientReceiver', {clientID: data.clientID, message: data.message});  
        });
    },
    
    disconnect(socket:SocketIO.Socket,io:SocketIO.Server){
        socket.on('disconnect', (data)=>{
            console.log(data.clientID+' disconnect');
            io.sockets.emit('clientRecevier', {clientID : data.clientID , message : 'disconnect'})
        })
    },
    
    reconnet(socket:SocketIO.Socket,io:SocketIO.Server){
        socket.on('reconnect', (data) => {
            console.log('reconnect');
        })
    },
}
