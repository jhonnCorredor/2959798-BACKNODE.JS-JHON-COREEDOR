
const Registro = require("./registro");

class biblioteca {
  constructor(nombre) {
    this.nombre = nombre;
    this.libros = [];
    this.registros = [];
  }

  crearRegistro(cliente, libro) {
    libro.prestar();
    let registro = new Registro(cliente, libro);
    this.registros.push(registro);
    console.log("registro realizado:");
    console.log(registro.consultarRegistro());
  }

  consultarLibros() {
    console.log("Libros disponibles:");
    this.libros.forEach((libro) => {
      if (libro.disponible != false) {
        console.log(`- ${libro.titulo}`);
      }
    });
  }

  consultarRegistro() {
    console.log("Lista de registros:");
    this.registros.forEach((registro) => {
      console.log(registro.consultarRegistro());
    });
  }

  consultarClientes(){
    console.log("Lista de clientes:");
    this.registros.forEach((registro) => {
      console.log(registro.consultarCliente());
    });
  }
}

module.exports = biblioteca;
