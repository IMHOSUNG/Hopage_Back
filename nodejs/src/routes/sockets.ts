import http from 'http'
import express from 'express' // 1
import socketIo from 'socket.io'
//import socketAuth from 'socket.io-auth'
import * as killPort from 'cluster'
//import adapter from 'socket.io-redis'

let self:any = this

export class IOServerConnection {

    constructor(io:SocketIO.Server, sockets:SocketIO.Namespace) {
        self.io = io;
        self.sockets = sockets;
    }
    
    public setConnection = (callbackFunc:any) => {
        self.sockets.on('connect' , 
            (socket:SocketIO.Socket) => {
                callbackFunc(socket,self.io)
        })
    }
}

