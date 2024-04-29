const { log } = require("node:console");
const Biblioteca = require("./biblioteca");
const Cliente = require("./cliente");
const Libro = require("./libro");
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let libro1 = new Libro("el principito", "alguien", "infantil", true);
let libro2 = new Libro("la masacre de texas", "alguien", "terror", true);

let biblioteca = new Biblioteca("san jorge");

biblioteca.libros.push(libro1, libro2);

menu();

function menu() {
  console.log(`Biblioteca: ${biblioteca.nombre}
1- Realizar registro.
2- Consultar libros.
3- Consultar registros.
4- Registrar libro.
5- Consultar clientes.
6- Finalizar programa.`);
  rl.question("Ingrese opción: ", (option) => {
    switch (option) {
      case "1":
        crearRegistro();
        break;
      case "2":
        biblioteca.consultarLibros();
        menu();
        break;
      case "3":
        biblioteca.consultarRegistro();
        menu();
        break;
      case "4":
        crearLibro();
        break;
      case "5":
        biblioteca.consultarClientes();
        menu();
        break;
      case "6":
        console.log("programa finalizado.");
        rl.close();
        break;
      default:
        console.log("opción no valida.");
        break;
    }
  });
}

function crearRegistro() {
  rl.question("Ingrese nombre cliente: ", (nombre) => {
    rl.question("Ingrese direccion cliente: ", (direccion) => {
      rl.question("Ingrese telefono cliente: ", (telefono) => {
        rl.question("Ingrese numero de ficha del cliente: ", (num_cliente) => {
          let cliente = new Cliente(nombre, direccion, telefono, num_cliente);

          biblioteca.consultarLibros();

          rl.question("Ingrese el libro: ", (option) => {
            const libroEncontrado = biblioteca.libros.find(
              (libro) => libro.titulo === option.toLowerCase()
            );

            if (libroEncontrado != null) {
              biblioteca.crearRegistro(cliente, libroEncontrado);
              menu();
            } else {
              console.log("Libro no encontrado.");
              menu();
            }
          });
        });
      });
    });
  });
}

function crearLibro() {
  rl.question("Ingrese titulo del libro: ", (titulo) => {
    rl.question("Ingrese autor del libro: ", (autor) => {
      rl.question("Ingrese genero del libro: ", (genero) => {
        let libro = new Libro(titulo, autor, genero, true);
        biblioteca.libros.push(libro);
        console.log("Libro registrado.");
        menu();
      });
    });
  });
}
