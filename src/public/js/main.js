$(function(){
    const socket=io();
    var nick='';
    //Access to Dom Elements
    const messageForm=$('#message-form');
    const messageBox=$('#message');
    const chat=$('#chat');
    const nickForm=$('#nick-form');
    const nickError=$('#nick-error');
    const nickName=$('#nick-name');
    const userNames=$('#usernames');
    //Events
    //Send a message to the server
    messageForm.submit(e=>{
        e.preventDefault();
        socket.emit('send message',messageBox.val());
        messageBox.val('');
    });
    //Get the answer from the server
    socket.on('new message', function(data){
        let color='#f4f4f4';
        if(nick==data.username){
            color='#9ff4c5';
        }
        chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><b>${data.username}:</b><p class="msg">${data.msg}</p></div>`);
    });
    
    //New User
    nickForm.submit(e=>{
        e.preventDefault();

        socket.emit('new user',nickName.val(), datos=>{
            
            if(datos){
                nick= nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();    
            }else{
                nickError.html('<div class="alert alert-danger">User already exist</div>');
            }
            nickName.val('');
        });
    });
    //Get the array with users connected
    socket.on('new username', data=>{
        let html='';
        let color='';
        let salir='';
        for(let i=0; i<data.length;i++){
            if(nick == data[i]){
                color='#027f43';
                salir='<a class="enlace-salir" href="/">Leave</a>';
            }else{
                color='#000';
                salir='';
            }
            html+= `<p style="color: ${color}">${data[i]} ${salir}</p>`;
        }
        userNames.html(html);
    });
});