// class 를 사용해서 control을 불러서 사용하니
// 당연히 connect를 여러번 호출... 
// 다른 방법 알아보고
// 이 방법은 우선 저장은 해두고 잘못된 예제로 계속 보기

let self:any = this

export class MakeConnection {

    constructor(io:SocketIO.Server, sockets:SocketIO.Namespace) {
        self.io = io;
        self.sockets = sockets;
    }
    public control = (callbackFunc:any) => {
        self.sockets.on('connect' , 
            (socket:SocketIO.Socket) => {
                console.log("connect something "+process.pid)
                callbackFunc(socket,self.io)
        })
    }
}

