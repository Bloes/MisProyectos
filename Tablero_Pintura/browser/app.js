
import whiteboard from "./whiteboard";
import io from "socket.io-client";
const socket = io(window.location.origin); 

//*este código importa un objeto whiteboard y una biblioteca socket.io-client,
//*y luego crea una instancia de socket para conectarse a un servidor Socket.IO en tiempo real. 
//*Esta configuración sugiere que la aplicación está utilizando whiteboard para compartir y actualizar
//*información en tiempo real con otros usuarios conectados a través del servidor Socket.IO.

socket.on('connect', function(){
    console.log('connected')
})  

socket.on('load', function (strokes){
    strokes.forEach(function(stroke){
        const start = stroke.start;
        const end = stroke.end;
        const color = stroke.color;
        whiteboard.draw(stroke, start, end, color, false);
});      
});

socket.on('draw', function (start, end, color){
    whiteboard.draw(start, end, color, false);
})

whiterboard.on('draw', function (start, end, color){
    socket.emit('draw', start, end, color);
})



