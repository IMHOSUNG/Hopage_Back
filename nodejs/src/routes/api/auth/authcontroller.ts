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
import {User} from './authSchema'

export const register = (req:Request, res:Response) => {
    const { username, password } = req.body
    let newUser:any = null

    // create a new user if does not exist
    const create = (user:any) => {
        if(user) {
            throw new Error('username exists')
        } else {
            //몽고 5.x.x 버전이 바뀌면서 요기를 객체로 넘겨야 한다...
            return User.create({username,password}).then((user)=>user.save())
        }
    }

    // count the number of the user
    const count = (user:any) => {
        console.log("COUNT ")
        console.log(user)
        newUser = user
        return User.count({}).exec()
    }

    // assign admin if count is 1
    const assign = (count:any) => {
        if(count === 1) {
            return newUser.assignAdmin()
        } else {
            // if not, return a promise that returns false
            return Promise.resolve(false)
        }
    }

    // respond to the client
    const respond = (admin:any) => {
        res.json({
            message: 'registered successfully',
            admin: admin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error:any) => {
        res.status(409).json({
            message: error.message
        })
    }

    User.findOne(
        {username}
        ).exec()
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}

export const login = (req:Request, res:Response) => {
    const {username, password} = req.body
    const secret = req.app.get('jwt-secret')
    console.log("check "+username);
    //res.send('login api is working')
    const check = (user:any) => {
        
        if(!user) {
            throw new Error('login failed')
        }
        else{
            if(user.password == password){
                const p = new Promise((resolve,reject)=>{
                    jwt.sign(
                        {
                            _id: user._id,
                            username: user.username,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'playinfo.co.kr',
                            subject: 'userInfo'

                        },(err, token) => {
                            if (err) reject(err)
                            resolve(token) 
                        }
                    )
                })
                return p
            }else{
                throw new Error('login Failed')
            }
        }
    }

        // respond the token 
    const respond = (token:any) => {
        console.log(token)
        res.json({
            message: 'logged in successfully',
            token
        })
    }


    const onError = (error:any) => {
        res.status(403).json({
            message: error.message
        })
    }

    User.findOne({
        username
    }).exec()
    .then(check)
    .then(respond)
    .catch(onError)
}

export const check = (req:any, res:Response) => {
    
    res.json({
        success: true,
        info: req.decoded
    })
}




