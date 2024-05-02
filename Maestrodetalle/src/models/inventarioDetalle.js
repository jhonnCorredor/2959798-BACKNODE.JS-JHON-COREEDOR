import conection from "../database/conection.js";
import inventario from "../models/inventario.js";
import producto from "../models/producto.js";

export default class inventarioDetalle {
  constructor(inventario, producto, cantidad, id = null) {
    this.id = id;
    this.inventario = inventario;
    this.producto = producto;
    this.cantidad = cantidad;
  }

  async save() {
    let query = `INSERT INTO inventario_detalle (inventario_id, producto_id, cantidad, id) 
VALUES ("${this.inventario.id}","${this.producto.id}",${this.cantidad},${this.id}) 
ON DUPLICATE KEY UPDATE inventario_id=VALUES(inventario_id) , producto_id=VALUES(producto_id), cantidad=VALUES(cantidad)`;
    await conection(query);
  }

  async delete() {
    let query = `DELETE from inventario_detalle WHERE id = ${this.id}`;
    await conection(query);
  }

  async find(id) {
    let pr = new producto();
    let inv = new inventario();
    let query = `SELECT * from inventario_detalle WHERE id= ${id}`;
    let rows = await conection(query);

    let detallesPromises = rows.map(async (row) => {
      return new inventarioDetalle(
        await inv.find(row.inventario_id),
        await pr.find(row.producto_id),
        row.cantidad,
        row.id
      );
    });

    let detalles = await Promise.all(detallesPromises);

    return detalles;
  }

  async all() {
    let pr = new producto();
    let inv = new inventario();
    let query = `SELECT * from inventario_detalle`;
    let rows = await conection(query);

    let detallesPromises = rows.map(async (row) => {
      return new inventarioDetalle(
        await inv.find(row.inventario_id),
        await pr.find(row.producto_id),
        row.cantidad,
        row.id
      );
    });

    let detalles = await Promise.all(detallesPromises);

    return detalles;
  }

  setId(id) {
    this.id = id;
  }

  setInventario(inventario) {
    this.inventario = inventario;
  }

  setProducto(producto) {
    this.producto = producto;
  }

  setCantidad(cantidad) {
    this.cantidad = cantidad;
  }

  getId() {
    return this.id;
  }

  getInventario() {
    return this.inventario;
  }

  getProducto() {
    return this.producto;
  }

  getCantidad() {
    return this.cantidad;
  }
}
