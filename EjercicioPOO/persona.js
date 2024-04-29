class persona{
    constructor(nombre, direccion, telefono){
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    consultarInformacion(){
        return `nombre: ${this.nombre} \n
        direccion: ${this.direccion} \n
        telefono: ${this.telefono}`;
    }
}

module.exports = persona;