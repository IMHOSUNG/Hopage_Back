
let self:any = this

let uniqueID = (function(){
    var id = 0;
    return function(){ return id++; };
})();

export class IOServerConnection {

    constructor(io:SocketIO.Server, sockets:SocketIO.Namespace) {
        self.io = io;
        self.sockets = sockets;
    }
    
    public setConnection = () => {
        self.sockets.on('connect' , (socket:SocketIO.Socket) => {
            this.setClientID(socket);
            this.serverReceiver(socket)
            this.disconnect(socket)
        })
    }

    private setClientID = (socket:SocketIO.Socket) => {
        let clientID = uniqueID();
        
        socket.on('setClientID' ,() => {
          console.log('Connection ' + clientID)
          self.io.sockets.emit('getClientID',{clientID : clientID})
        })
      }
      
    private serverReceiver = (socket:SocketIO.Socket) => {
        socket.on('serverReceiver', (data)=>{
            //클라이언트 이베트 호출     
            self.io.sockets.emit('clientReceiver', {clientID: data.clientID, message: data.message});  
        });
    }
    
    private disconnect = (socket:SocketIO.Socket) => {
        socket.on('disconnect', (data)=>{
            console.log(data.clientID+' disconnect');
            self.io.sockets.emit('clientRecevier', {clientID : data.clientID , message : 'disconnect'})
        })
    }
    
    private  reconnet = (socket:SocketIO.Socket) => {
        socket.on('reconnect', (data) => {
            console.log('reconnect');
        })
    }

}
