import * as socketio from "socket.io"

let io = socketio

exports.initialize = (httpserver:any) => {
    let inout:SocketIO.Server = io.listen(httpserver)
    
    inout.sockets.on("connection" , (socket:SocketIO.Socket)=> {
        socket.send(JSON.stringify(
            {
                type : 'serverMessage',
                message : 'Welcome to the most interesting chat'
            }
        ));

        socket.on('message', (message) => {
            message = JSON.parse(message)
            if(message.type == "userMessage"){
                socket.broadcast.send(JSON.stringify(message))
                message.type = "myMessage"
                socket.send(JSON.stringify(message))
            }
        })
        socket.on("set_name", (data) => {
        })
    })
}