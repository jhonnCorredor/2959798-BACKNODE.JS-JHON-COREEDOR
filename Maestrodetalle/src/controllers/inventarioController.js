import Inventario from "../models/inventario.js";

export default class controladorInventario {

  async create(nombre, codigo) {
    let item = new Inventario(nombre, codigo);
    item.save();
  }

  async read() {
    let item = new Inventario();
    return await item.all();
  }

  async find(id) {
    let item = new Inventario();
    return await item.find(id);
  }

  async update(id, nombre, codigo) {
    let i = this.find(id);
      let item = new Inventario(nombre, codigo, id);
      item.save();
  }

  async delete(id) {
    let item = new Inventario();
    item.setId(id);
    item.delete();
  }
  
}
