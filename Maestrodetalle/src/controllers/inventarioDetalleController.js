import InventarioD from "../models/inventarioDetalle.js";

export default class controladorInventarioDetalle {
  
  async create(inventario, producto, cantidad) {
    let item = new InventarioD(inventario, producto, cantidad);
    item.save();
  }

  async read() {
    let item = new InventarioD();
    return await item.all();
  }

  async find(id) {
    let item = new InventarioD();
    return await item.find(id);
  }

  async update(id, inventario, producto, cantidad) {
    let item = new InventarioD(inventario, producto, cantidad, id);
    item.save();
  }

  async delete(id) {
    let item = new InventarioD();
    item.setId(id);
    item.delete();
  }
  
}
