"use strict";
import express = require("express");
import bodyParser from 'body-parser';
import path from 'path';
import api from './routes'

const app = express();

app.use(express.static(path.resolve(__dirname,'..','build')));

app.get('/api',(req,res)=>{
  res.send('json');
});

app.get('/apiabout',(req,res)=>{
  res.send('about');
})

app.get('*',(req,res) => {
  res.sendFile(path.resolve(__dirname,'..','build','index.html'));
})

app.listen(4000,()=>console.log("start Server"));