const socket = io();

const params = new URLSearchParams( window.location.search )

    if ( !params.has('nombre') || !params.has('sala') ) {
        window.location = 'index.html';
        throw new Error('El nombre y sala son necesarios');
    }

    const usuario = {
        nombre: params.get('nombre'),
        sala: params.get('sala') //nombres del query params
    }

    socket.on('connect', () => {
        console.log('Conectado al servidor');

        // si me conecto o el server me acpata se ejecuta un callback
        socket.emit('entrarChat', usuario, ( resp ) =>{
            console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', () => {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {enviarMensaje
//     usuario: 'Fernando', Puedo obviar mandar el nombre porque lo obtenemos de los params
//     mensaje: 'Hola Mundo'
// }, (resp) => {
//     console.log('respuesta server: ', resp);
// });


// Escuchar información
socket.on('crearMensaje', (mensaje) => { // escucha mensaje tanto del servidor como el del navegador en su consola

    console.log('Servidor:', mensaje);

});

//Escuchar cambios de usuarios
//Cuando un usuario entra o sale del chat

socket.on('listaPersonas', ( personas ) => {

    console.log('Servidor:', personas);

});


//? Mensaje Privados
// entiendase que aqui es la accion de escuchar del cliente un mensaje privado
// y el emit es lo que va hacer el servidor cuando alguien que mandar un mensaje privado.

socket.on('mensajePrivado', ( mensaje ) =>{
    console.log('Mensaje Privado', mensaje );
})








//* Codigo usado en consola del navegador y que escucha el server 
//podeos obviar enviar el nombre

// socket.emit('crearMensaje',{ nombre: 'Fernando', mensaje:'Hola a todos'})