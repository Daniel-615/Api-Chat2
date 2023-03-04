const express=require('express');
const path=require('path');
const app=express();
const server=require('http').Server(app);
const port=3000;
const socketio=require('socket.io')(server);

app.set('port',process.env.PORT || port);

//Function file socket.js
require('./socket')(socketio);
//Static File
app.use(express.static(path.join(__dirname,'public')));

server.listen(app.get('port'), ()=>{
    console.log(`Server on port`,app.get('port'));
});