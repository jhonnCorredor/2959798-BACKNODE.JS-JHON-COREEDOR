function main(){
    const miBanco = new Banco("Mi Banco", 1000000);
    
    const sucursal1 = new Sucursal("Sucursal Principal", 0.05, miBanco);
    const sucursal2 = new Sucursal("Sucursal Secundaria", 0.03, miBanco);
    
    function seleccionarSucursal() {
    
      const opcion = prompt("Seleccione una opción:\n1. Sucursal Principal\n2. Sucursal Secundaria\n3. Salir del programa \nSeleccione una opción:");
      switch (opcion) {
        case "1":
          menuPrincipal(sucursal1);
          break;
        case "2":
          menuPrincipal(sucursal2);
          break;
        case "3":
          alert("Programa finalizado.");
          break;
        default:
          alert("Opción no válida.");
          seleccionarSucursal();
          break;
      }
    }
    
    function menuPrincipal(sucursal) {
    
      const opcion = prompt(`Bienvenido a ${sucursal.nombreSucural}:\n1. Ingresar nuevo cliente\n2. Iniciar sesión\n3. Salir de la sucursal \nSeleccione una opción:`);
      switch (opcion) {
        case "1":
          registrarCliente(sucursal);
          break;
        case "2":
          iniciarSesion(sucursal);
          break;
        case "3":
          alert("Ha salido de la sucursal.");
          seleccionarSucursal(); 
          break;
        default:
          alert("Opción no válida.");
          menuPrincipal(sucursal);
          break;
      }
    }
    
    function registrarCliente(sucursal) {
      const nombre = prompt("Ingrese el nombre del cliente:");
      const direccion = prompt("Ingrese la dirección del cliente:");
      const telefono = prompt("Ingrese el teléfono del cliente:");
      const tipoDocumento = prompt("Ingrese el tipo de documento del cliente:");
      const documento = prompt("Ingrese el número de documento del cliente:");
      const tipoCuenta = prompt("Ingrese el tipo de cuenta:");
      const numeroCuenta = prompt("Ingrese el número de cuenta:");
      const contrasenia = prompt("Ingrese la contraseña de la cuenta:");
      const saldoInicial = parseInt(prompt("Ingrese el saldo inicial de la cuenta:"));
    
      const nuevoCliente = new Cliente(nombre, direccion, telefono, tipoDocumento, documento, 0);
      const nuevaCuenta = new Cuenta(nuevoCliente, tipoCuenta, numeroCuenta, contrasenia, saldoInicial);
      sucursal.registrarCliente(nuevaCuenta);
      alert("Cliente registrado exitosamente.");
      realizarOtraAccion(sucursal);
    }
    
    function iniciarSesion(sucursal) {
      const documento = prompt("Ingrese el número de documento del cliente para iniciar sesión:");
      const index = sucursal.login(documento);
      if (index !== null) {
        realizarTransaccion(sucursal, index);
      } else {
        alert("No se encontró ninguna cuenta asociada a ese documento.");
        realizarOtraAccion(sucursal);
      }
    }
    
    function realizarTransaccion(sucursal, index) {
      const tipo = prompt("¿Qué tipo de transacción desea realizar?\ndeposito\nretiro\nhistorial\nsaldo\nprestamo\ncerrar");
    
      const cuenta = sucursal.cuentas[index];
      switch (tipo) {
        case "deposito":
          const montoDeposito = parseInt(prompt("Ingrese el monto del depósito:"));
          cuenta.depositar(montoDeposito);
          alert("Transacción completada.");
          realizarTransaccion(sucursal, index); 
          break;
        case "retiro":
          const montoRetiro = parseInt(prompt("Ingrese el monto del retiro:"));
          cuenta.retirar(montoRetiro);
          alert("Transacción completada.");
          realizarTransaccion(sucursal, index); 
          break;
        case "historial":
          cuenta.imprimirHistorialTransacciones();
          realizarTransaccion(sucursal, index); 
          break;
        case "saldo":
          cuenta.consultarSaldo();
          realizarTransaccion(sucursal, index); 
          break;
        case "prestamo":
          const montoPrestamo = parseInt(prompt("Ingrese el monto del préstamo:"));
          sucursal.prestamo(montoPrestamo, index);
          realizarTransaccion(sucursal, index); 
          break;
        case "cerrar":
          alert("Sesión cerrada.");
          realizarOtraAccion(sucursal); 
          break;
        default:
          alert("Opción no válida.");
          realizarTransaccion(sucursal, index); 
          break;
      }
    }
    
    function realizarOtraAccion(sucursal) {
      const respuesta = prompt(`¿Desea realizar otra acción en ${sucursal.nombre}? (si/no):`);
      if (respuesta.toLowerCase() === "si") {
        menuPrincipal(sucursal);
      } else {
        alert("Ha salido de la sucursal.");
        seleccionarSucursal(); 
      }
    }
    
    seleccionarSucursal();

}


