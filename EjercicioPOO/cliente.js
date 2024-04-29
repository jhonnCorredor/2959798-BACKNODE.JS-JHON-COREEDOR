const Persona = require('./persona')

class cliente extends Persona{

    constructor(nombre, direccion, telefono,num_ficha){
        super(nombre, direccion, telefono)
        this.num_ficha = num_ficha
    }

    consultarInformacion(){
        return `nombre: ${this.nombre}
direccion: ${this.direccion} 
telefono: ${this.telefono} 
numero cliente: ${this.num_ficha}`;
    }


}

module.exports = cliente;