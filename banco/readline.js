const readline = require("readline");

const Cliente = require("./cliente");
const Cuenta = require("./cuenta");
const Sucursal = require("./sucursal");
const Banco = require("./banco");

const miBanco = new Banco("Mi Banco", 1000000);

const sucursal1 = new Sucursal("Sucursal Principal", 0.05, miBanco);
const sucursal2 = new Sucursal("Sucursal Secundaria", 0.03, miBanco);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function seleccionarSucursal() {
  console.log("Seleccione una opción:");
  console.log("1. Sucursal Principal");
  console.log("2. Sucursal Secundaria");
  console.log("3. Salir del programa");

  rl.question("Seleccione una opción: ", function (opcion) {
    switch (opcion) {
      case "1":
        menuPrincipal(sucursal1);
        break;
      case "2":
        menuPrincipal(sucursal2);
        break;
      case "3":
        console.log("Programa finalizado.");
        rl.close();
        break;
      default:
        console.log("Opción no válida.");
        seleccionarSucursal();
        break;
    }
  });
}

function menuPrincipal(sucursal) {
  console.log(`Bienvenido a ${sucursal.nombreSucural}:`);
  console.log("1. Ingresar nuevo cliente");
  console.log("2. Iniciar sesión");
  console.log("3. Salir de la sucursal");

  rl.question("Seleccione una opción: ", function (opcion) {
    switch (opcion) {
      case "1":
        registrarCliente(sucursal);
        break;
      case "2":
        iniciarSesion(sucursal);
        break;
      case "3":
        console.log("Ha salido de la sucursal.");
        seleccionarSucursal(); // Volver a seleccionar una sucursal
        break;
      default:
        console.log("Opción no válida.");
        menuPrincipal(sucursal);
        break;
    }
  });
}

function registrarCliente(sucursal) {
  rl.question("Ingrese el nombre del cliente: ", function (nombre) {
    rl.question("Ingrese la dirección del cliente: ", function (direccion) {
      rl.question("Ingrese el teléfono del cliente: ", function (telefono) {
        rl.question(
          "Ingrese el tipo de documento del cliente: ",
          function (tipoDocumento) {
            rl.question(
              "Ingrese el número de documento del cliente: ",
              function (documento) {
                rl.question(
                  "Ingrese el tipo de cuenta: ",
                  function (tipoCuenta) {
                    rl.question(
                      "Ingrese el número de cuenta: ",
                      function (numeroCuenta) {
                        rl.question(
                          "Ingrese la contraseña de la cuenta: ",
                          function (contrasenia) {
                            rl.question(
                              "Ingrese el saldo inicial de la cuenta: ",
                              function (saldoInicial) {
                                const nuevoCliente = new Cliente(nombre,direccion,telefono,tipoDocumento,documento,0);
                                const nuevaCuenta = new Cuenta(nuevoCliente,tipoCuenta,numeroCuenta,contrasenia,parseInt(saldoInicial));
                                sucursal.registrarCliente(nuevaCuenta);
                                console.log("Cliente registrado exitosamente.");
                                realizarOtraAccion(sucursal);
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    });
  });
}

function iniciarSesion(sucursal) {
  rl.question(
    "Ingrese el número de documento del cliente para iniciar sesión: ",
    function (documento) {
      const index = sucursal.login(documento);
      if (index !== null) {
        realizarTransaccion(sucursal, index);
      } else {
        console.log("No se encontró ninguna cuenta asociada a ese documento.");
        realizarOtraAccion(sucursal);
      }
    }
  );
}

function realizarTransaccion(sucursal, index) {
  rl.question(
    "¿Qué tipo de transacción desea realizar? \n" +
      "-deposito\n" +
      "-retiro\n" +
      "-historial\n" +
      "-saldo\n" +
      "-prestamo\n" +
      "-cerrar \n",
    function (tipo) {
      const cuenta = sucursal.cuentas[index];
      switch (tipo) {
        case "deposito":
          rl.question("Ingrese el monto del depósito: ", function (monto) {
            cuenta.depositar(parseInt(monto));
            console.log("Transacción completada.");
            realizarTransaccion(sucursal, index); // Se mantiene en la misma sesión
          });
          break;
        case "retiro":
          rl.question("Ingrese el monto del retiro: ", function (monto) {
            cuenta.retirar(parseInt(monto));
            console.log("Transacción completada.");
            realizarTransaccion(sucursal, index); // Se mantiene en la misma sesión
          });
          break;
        case "historial":
          cuenta.imprimirHistorialTransacciones();
          realizarTransaccion(sucursal, index); // Se mantiene en la misma sesión
          break;
        case "saldo":
          cuenta.consultarSaldo();
          realizarTransaccion(sucursal, index); // Se mantiene en la misma sesión
          break;
        case "prestamo":
          rl.question("Ingrese el monto del préstamo: ", function (monto) {
            sucursal.prestamo(parseInt(monto), index);
            realizarTransaccion(sucursal, index); // Se mantiene en la misma sesión
          });
          break;
        case "cerrar":
          console.log("Sesión cerrada.");
          realizarOtraAccion(sucursal); // Se cierra la sesión y se pregunta si se quiere realizar otra acción
          break;
        default:
          console.log("Opción no válida.");
          realizarTransaccion(sucursal, index); // Se mantiene en la misma sesión
          break;
      }
    }
  );
}

function realizarOtraAccion(sucursal) {
  rl.question(
    "¿Desea realizar otra acción en " + sucursal.nombre + "? (si/no): ",
    function (respuesta) {
      if (respuesta.toLowerCase() === "si") {
        menuPrincipal(sucursal);
      } else {
        console.log("Ha salido de la sucursal.");
        seleccionarSucursal(); // Volver a seleccionar una sucursal
      }
    }
  );
}

seleccionarSucursal();