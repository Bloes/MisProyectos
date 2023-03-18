
function EventEmitter () {
    this.subscribers = {};
}

EventEmitter.prototype.on = (eventName, eventListener) => {
    if(!this.subscribers[eventName]){
        this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(eventListener);
}

EventEmitter.prototype.emit = (eventName) => {
    if(!this.subscribers[eventName]){
        return;
    }
const remainingArgs = [].slice.call(arguments, 1);

this.subscribers[eventName].forEach((listener) => {
    listener.apply(null, remainingArgs);

});

}
export default EventEmitter; 
//*Este código en JavaScript exporta la clase EventEmitter para que pueda ser utilizada en otros archivos o módulos de la aplicación. 
//*La palabra clave export default indica que EventEmitter es la exportación predeterminada del archivo event-emitter.
