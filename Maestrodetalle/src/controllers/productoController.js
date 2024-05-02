import Producto from "../models/producto.js";

export default class controladorProducto {

  async create(nombre, codigo, precio) {
    let item = new Producto(nombre, codigo, precio);
    item.save();
  }

  async read() {
    let item = new Producto();
    return await item.all();
  }

  async find(id) {
    let item = new Producto();
    return await item.find(id);
  }

  async update(id, nombre, codigo, precio) {
    let item = new Producto(nombre, codigo, precio, id);
    item.save();
  }

  async delete(id) {
    let item = new Producto();
    item.setId(id);
    item.delete();
  }

}
