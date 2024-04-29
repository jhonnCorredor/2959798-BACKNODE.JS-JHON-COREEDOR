class registro{

    constructor(cliente, libro){
        this.cliente = cliente;
        this.libro = libro;
        this.fecha =  new Date();
    }

    consultarRegistro(){
        console.log( `Registro 
    nombre cliente: ${this.cliente.nombre}
    libro: ${this.libro.titulo} 
    fecha: ${this.fecha}`);
    }

    consultarCliente(){
        console.log("---------------------");
        console.log(this.cliente.consultarInformacion());
    }

}

module.exports = registro;