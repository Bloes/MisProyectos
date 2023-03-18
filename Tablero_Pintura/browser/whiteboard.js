

import EventEmitter from "./event-emitter";
const whiteboard = new EventEmitter();
//*este código está importando y creando una instancia de la clase EventEmitter, 
//*lo que sugiere que el objeto whiteboard creado podría utilizarse para implementar la funcionalidad de eventos en una aplicación o sistema.

let color;

const colorElements = [].slice.call(document.querySelectorAll('.marker'));
colorElements.forEach((el) => {
    el.style.backgroundColor = el.id;
    el.addEventListener('click', () => {
        color = this.id;
        document.querySelector('.selected').classList.remove('selected');
        this.classList.add('selected');
    })
})

const canvas = document.getElementById('paint');
const ctx = canvas.getContext('2d');

function resize(){
    ctx.setTransform(1,0,0,1,0,0);
    const pixelRatio = window.devicePixelRatio || 1;
    const w = canvas.clientWidth * pixelRatio,
        h = canvas.clientHeight * pixelRatio;
    if (w !== canvas.width || h !== canvas.height) {
      
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      canvas.width = w; canvas.height = h;

      
      ctx.putImageData(imgData, 0, 0)
    }
    ctx.scale(pixelRatio, pixelRatio);

    ctx.lineWidth = 5
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
}
//*En este codigo establece eventos de escucha para el mouse en el canvas que permiten al 
//*usuario dibujar en el canvas y utilizar la funcion "whiteboard" para dibujar una línea 
//*y emitir un evento "draw" cuando sea necesario. 

resize();
  window.addEventListener('resize', resize);

  const currentMousePosition = { x: 0, y: 0 };
  const lastMousePosition = { x: 0, y: 0 };

  const drawing = false;

  canvas.addEventListener('mousedown', function (e) {
    drawing = true;
    currentMousePosition.x = e.pageX - this.offsetLeft;
    currentMousePosition.y = e.pageY - this.offsetTop;
  });

  canvas.addEventListener('mouseup', function () {
    drawing = false;
  });

  canvas.addEventListener('mousemove', function (e) {

    if (!drawing) return;

    lastMousePosition.x = currentMousePosition.x;
    lastMousePosition.y = currentMousePosition.y;

    currentMousePosition.x = e.pageX - this.offsetLeft;
    currentMousePosition.y = e.pageY - this.offsetTop;

    whiteboard.draw(lastMousePosition, currentMousePosition, color, true);

  });

  whiteboard.draw = (start, end, strokeColor, shouldBroadcast) => {

    ctx.beginPath();
    ctx.strokeStyle = strokeColor || 'black';
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.stroke();

    if (shouldBroadcast) {
      whiteboard.emit('draw', start, end, strokeColor);
    }

  };

  export default whiteboard; 