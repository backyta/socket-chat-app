const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utils/utilidades')


const usuarios = new Usuarios();

//* Caundo se recarga el navegador dispara el connection y vuelve agregar la misma persona
//* deberiamos borrar cuando se desconecta 

io.on('connection', (client) => {
    // console.log('Usuario conectado');

    client.on('entrarChat', ( data, callback ) => {

        // console.log( data );

        if ( !data.nombre || !data.sala ) {
            return callback({
                error: true,
                msg: 'El nombre/sala es necesario'
            })
        }

        //* instruccion para conectar un usuario a una sala
        client.join( data.sala ) // te unes a una sala con tu id

        //se debe pasar la sala tmb cuando se crea una persona o Conexion nueva de socket o navegador
        usuarios.agregarPersona( client.id, data.nombre, data.sala )

        //* Necesito mandarlo unicamente alas personas que esten en la misma sala no a todas
        client.broadcast.to( data.sala ).emit('listaPersonas', usuarios.getPersonasPorSala( data.sala )); // cada vez que una persona entra o sale del chat

        return callback( usuarios.getPersonas( data.sala ) );
    });

    client.on('crearMensaje', ( data ) => {

        let persona = usuarios.getPersona( client.id )

        let mensaje = crearMensaje( persona , data.mensaje );

        client.broadcast.to( persona.sala ).emit('crearMensaje', mensaje)
    })


    client.on('disconnect', () =>{

        let personaBorrada = usuarios.borrarPersona( client.id ); // retorna la persona borrada

        client.broadcast.to( personaBorrada.sala ).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salio`) );

        //Solo quiero los usuarios que estan en esa sala para eso isar getPerosanaPorSala()
        client.broadcast.to( personaBorrada.sala ).emit('listaPersonas', usuarios.getPersonasPorSala( personaBorrada.sala )); 

    });

    //* Mensajes privados

    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona( client.id )

        //* para enviar un mensaje a una persona en especifico
        // data.para  es el id que quiero enviar a que person con ese id

        client.broadcast.to( data.para ).emit( 'mensajePrivado', crearMensaje( persona.nombre , data.mensaje ));

    })

});