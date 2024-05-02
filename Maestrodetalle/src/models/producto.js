import conection from "../database/conection.js"

export default class producto {
    constructor(nombre, codigo, precio,id= null) {
      this.id = id;
      this.nombre = nombre;
      this.codigo = codigo;
      this.precio = precio;
    }

    async save(){
      let query = `INSERT INTO producto (nombre,codigo,precio,id) VALUES ("${this.nombre}","${this.codigo}",${this.precio},${this.id}) ON DUPLICATE KEY UPDATE nombre=VALUES(nombre) , codigo=VALUES(codigo), precio=VALUES(precio)`;
      await conection(query);
    }
  
    async delete(){
      let query = `DELETE from producto WHERE id = ${this.id}`
      await conection(query);
    }
  
    async find(id){
      let query = `SELECT * from producto WHERE id= ${id}`
      let rows = await conection(query);
      rows = rows.map(row => new producto( row.nombre, row.codigo, row.precio ,row.id));
      return rows[0];
    }
  
    async all(){
      let query = `SELECT * from producto`
      let rows = await conection(query);
      return rows.map(row => new producto( row.nombre, row.codigo, row.precio ,row.id));
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

    setPrecio(precio) {
      this.precio = precio;
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

    getPrecio() {
      return this.precio;
    }
  }
  