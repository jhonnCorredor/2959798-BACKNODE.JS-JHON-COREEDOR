import conection from "../database/conection.js";

export default class inventario {
  constructor(nombre, codigo, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.codigo = codigo;
  }

  async save() {
    let query = `INSERT INTO inventario (id, nombre, codigo) VALUES (${this.id},"${this.nombre}","${this.codigo}") ON DUPLICATE KEY UPDATE nombre=VALUES(nombre) , codigo=VALUES(codigo)`;
    await conection(query);
  }

  async delete() {
    let query = `DELETE from inventario WHERE id = ${this.id}`;
    await conection(query);
  }

  async find(id) {
    let query = `SELECT * from inventario WHERE id= ${id}`;
    let rows = await conection(query);
    rows = rows.map((row) => new inventario(row.nombre, row.codigo,row.id));
    return rows[0];
  }

  async all() {
    let query = `SELECT * from inventario`;
    let rows = await conection(query);
    return rows.map((row) => new inventario(row.nombre, row.codigo,row.id));
  }

  setId(id) {
    this.id = id;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  setCodigo(codigo) {
    this.codigo = codigo;
  }

  getId() {
    return this.id;
  }

  getNombre() {
    return this.nombre;
  }

  getCodigo() {
    return this.codigo;
  }
}
