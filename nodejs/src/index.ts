import http from 'http'
import {IOserver} from './socketIO'
import cluster from 'cluster'
import os from 'os'

const clusterModule = true

if(clusterModule && cluster.isMaster ){
    var cpus = os.cpus().length;
    for (var i = 0; i < cpus/2; i++) {
      cluster.fork()
    }

    cluster.on('exit', function(worker:any, code:any, signal:any) {
        console.log('worker ' + worker.process.pid + ' died');
    });


}else {
    
    let app = require('express')

    const port = 3000;


    const server = http.createServer(app);
    server.listen(port);
    console.log(`listening at http://127.0.0.1:${port}...`);
    console.log('pid ' + process.pid)

    IOserver(server,true)
}