import jwt from 'jsonwebtoken'
import express from 'express'

export const authMiddleWare = (req:any, res:express.Response, next:express.NextFunction) => {
    
    const token:string = <string>req.headers['x-access-token']

    if(!token) {
        return res.status(403).json({
            success  : false,
            message : 'not logged in'
        })
    }

    const p = new Promise ((resolve,reject)=>{
        jwt.verify(token,req.app.get('jwt-secret'),
            (err:Error,decoded:any)=>{
                if(err) reject(err)
                resolve(decoded)
            }
        )
    })

    const onError = (error:Error) => {
        res.status(403).json({
            success : false,
            message : error.message
        })
    }
    
    p.then((decoded)=> {
        req.decoded = decoded
        next()
    }).catch(onError)
}

