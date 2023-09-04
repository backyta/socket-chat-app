class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona( id, nombre, sala ) {

        let persona = { id, nombre, sala };
        this.personas.push( persona );
        return this.personas;
    }

    getPersona( id ){
        let persona = this.personas.filter( persona => persona.id === id )[0]; // retorna un nuevo array pero solo su primer pos osea el primer objeto
        console.log({persona});
        return persona
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala( sala ) {

        let personasEnSala = this.personas.filter( persona => persona.sala === sala );
        return personasEnSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id); //referencia a la persona antes de sacarla del array

        this.personas = this.personas.filter( persona => persona.id !== id ) // elimina al que dejo el chat y retorna  alos activos

        return personaBorrada;
    }

}



module.exports = {
    Usuarios
}