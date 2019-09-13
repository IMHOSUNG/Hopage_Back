import mongoose from 'mongoose'

export const MongoDBset = (mongodbUri:string) => {

    mongoose.connect(mongodbUri,{useNewUrlParser: true, useCreateIndex: true})
    const db = mongoose.connection
    db.on('error', console.error)
    db.once('open', ()=>{
        console.log('connected to mongodb server')
    })
}