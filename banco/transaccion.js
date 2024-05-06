class Transaction {
    constructor(type, amount, date) {
        this.type = type;
        this.amount = amount;
        this.date = date || new Date();
    }

    // Método para obtener una representación legible de la transacción
    toString() {
        return `Tipo: ${this.type}, Cantidad: ${this.amount}, Fecha: ${this.date}`;
    }
}
