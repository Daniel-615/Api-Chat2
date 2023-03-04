module.exports=(io) =>{
    let nickNames=[];
    io.on('connection',socket=>{
        //console.log('Nuevo usuario Conectado');
        //when receive the message we recollect the data: username,message
        socket.on('send message',(data)=>{
            //console.log(data);
            io.sockets.emit('new message',{
                msg: data,
                username: socket.nickname   
            });
        });
        
        socket.on('new user',(datos,callback)=>{

            if(nickNames.indexOf(datos) !=-1){ //-1 si existe 
                callback(false);
            }else{                   
                callback(true);
                socket.nickname=datos;
                nickNames.push(socket.nickname);
                io.sockets.emit('new username',nickNames);
            }
        });
        socket.on('disconnect', data=>{
            if(!socket.nickname){
                return;
            }else{
                nickNames.splice(nickNames.indexOf(socket.nickname),1)
                io.sockets.emit('new username',nickNames);
            }
        });
    });   
};
