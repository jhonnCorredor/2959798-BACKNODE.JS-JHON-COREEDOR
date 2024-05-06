
class Sucursal {
    constructor(nombreSucural, interes, banco) {
        this.nombreSucural = nombreSucural
        this.interes = interes
        this.banco = banco
        this.cuentas = []
    }

    login(documento) {
        // Utilizamos findIndex() para buscar una cuenta basada en el documento del titular
        const index = this.cuentas.findIndex(cuenta => cuenta.titular.documento === documento);

        if (index !== -1) {
            const cuenta = this.cuentas[index];
            console.log(`Bienvenido, ${cuenta.titular.nombre}.`);
            // Devolvemos tanto la cuenta como su índice en un objeto
            return index;
        } else {
            console.log("No se encontró ninguna cuenta asociada a ese documento.");
            return null;
        }
    }

    registrarCliente(cuenta){
        try {
            if (cuenta != null) {
                this.cuentas.push(cuenta)
            }else{
                throw new Error("Registro no valido.")
            }
        } catch (error) {
            alert("Error: "+ error)
        }
    }

    prestamo(cantidad, index) {
        if (cantidad > 0 && this.banco.monto >= cantidad) {

            const cuotaInteres = cantidad * this.interes
            this.banco.monto -= cantidad;
            this.cuentas[index].titular.prestamo += parseInt(cantidad);
            console.log(`La candidad solicitada es de ${cantidad} con un interes de ${this.interes * 100}% la cuota del interes quedaria de : ${cuotaInteres}`)

        } else {

            console.log(`No se a podido realizar el prestamo`);
        }
    }
}

