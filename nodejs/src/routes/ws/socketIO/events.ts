export const events = {

    //if use sockets >> broadcast
    //if use socket >> peer to peer 
    

    serverReceiver(socket:SocketIO.Socket,sockets:SocketIO.Server,id:number){
        socket.on('serverReceiver', (data)=>{
            //클라이언트 이벤트 호출
            console.log('ServerReceiver ' +data.message)     
            sockets.emit('clientReceiver', {clientID: id, message: data.message});  
        });
    },

    setClientID(socket:SocketIO.Socket,sockets:SocketIO.Server,id:number){
        socket.on('setClientID' ,(data) => {
          console.log('setClientID ' + id + 'pid ' + process.pid)
          sockets.emit('getClientID',{clientID : id, prossid : process.pid})
        })      
    },

    disconnect(socket:SocketIO.Socket,sockets:SocketIO.Server){
        socket.on('disconnect', (data)=>{
            console.log(socket.id+'  disconnect');
            socket.emit('clientRecevier', {clientID : data.clientID , message : 'disconnect'})
            console.log('attempt reconnect')
            
        })
    },
    
    reconnet(socket:SocketIO.Socket,io:SocketIO.Server){
        socket.on('reconnect', (data) => {
            console.log('reconnect');
        })
    },

    getServerTimeInterval(socket:SocketIO.Socket, io:SocketIO.Server, interval:number){
        console.log("getCurrentTime")
        setInterval( function() {
            //전송 되지 않아도 상관 없는 값
            socket.volatile.emit('time', {time : new Date().getTime()})
        }, interval);
    }
}
