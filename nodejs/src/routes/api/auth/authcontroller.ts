/*
    POST /api/auth
    {
        username,
        password
    }
*/
import {User} from './authSchema'

export const register = (req:any, res:any) => {
    User.create(req.body)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
}




