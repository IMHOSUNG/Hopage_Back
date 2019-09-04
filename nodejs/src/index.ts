"use strict";
import http from 'http'
import express = require("express");
//import socketIo = require('socket.io')
//import bodyParser from 'body-parser';
//import path from 'path';
//import api from './routes'
//import console = require('console');
import * as CustomSocket from './routes/sockets'

const app = express();

/*app.use(express.static(path.resolve(__dirname,'..','build')));

app.get('/api',(req,res)=>{
  res.send('json');
});

app.get('/login',(req,res)=>{
  res.send('access login');
})

app.get('*',(req,res) => {
  res.sendFile(path.resolve(__dirname,'..','build','index.html'));
})*/

var server = http.createServer(app).listen(app.get('port'),
()=> {
  console.log(
    "start Server"
  )
})

require ('./routes/sockets.ts').initialize(server)

