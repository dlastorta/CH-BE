let socket = io.connect();

let render = (data) =>{
    var html = data.map((elem,index)=>{
            return (`<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em>
            </div>`)
        }).join(" ");
        document.getElementById('messages').innerHTML = html;    
};

let addMessages = (e) => {
    var mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('username').value
    }
    socket.emit('new-message',mensaje);
    return false;
};

socket.on ('messages', (data)=>{
    render(data);
});

