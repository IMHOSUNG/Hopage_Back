/*
    POST /api/auth
    {
        username,
        password
    }
*/
/*
{
	"username" : "hosung7",
	"password" : "1234tttt"
}
postman 하면서 마지막 끝에 , 있어서 오류... 잘 찾아가면서 하자
*/
'use strict'
import jwt from 'jsonwebtoken'
import { Express, Request, Response } from 'express'
import { memo } from 'react'
import { events } from '../../ws/socketIO/events'
import SocketIo from 'socket.io'

//url : http://domain.co.kr/api/monitor/state
export const state = (req:Request, res:Response) => {
    const { cpu, memory } = req.body
    console.log(cpu)
    console.log(memory)

    //db저장?? no

    const checkget = (cpu:string, memory:string) => {
        
        if(cpu === '' && memory === ''){
            throw new Error('no data cpu memory state')
        }
        else{
            let socket = req.app.get('/ws');
            socket.emit('serverInfo', {cpu : cpu, memory : memory})
            res.status(200).json({message : 'get cpu memory state', cpu : cpu , memory : memory })
        }
    }

    checkget(cpu,memory)
}




