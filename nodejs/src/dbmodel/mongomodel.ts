import {Document, Schema, Model, model} from 'mongoose'
let self:any = this;
const User = new Schema({
    username: String,
    password: String,
    admin: { type: Boolean, default: false }
})

// create new User document
User.statics.create = function(username:string, password:string) {
    const user = new self({
        username,
        password
    })

    // return the Promise
    return user.save()
}

// find one user by using username
User.statics.findOneByUsername = function(username:string) {
    console.log("attemp find One")
    return self.findOne({
        username
    }).exec()
}


// verify the password of the User documment
User.methods.verify = function(password:string) {
    return self.password === password
}

User.methods.assignAdmin = function() {
    self.admin = true
    return self.save()
}
const Users = model('User', User)
export default Users
