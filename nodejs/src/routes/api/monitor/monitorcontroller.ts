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
import {  Request, Response } from 'express'

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




