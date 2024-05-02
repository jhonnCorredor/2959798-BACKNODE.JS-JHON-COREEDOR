import expres from "express";
import bodyParser from "body-parser";
import productoController from "../controllers/productoController.js";

const controller = new productoController();
const api = "";
const producto = new expres();
producto.use(bodyParser.json());
producto.use(bodyParser.urlencoded({ extended: true }));

producto.get(api, async (req, res) => {
  try {
    let data = await controller.read();
    res.json({ data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

producto.get(`${api}/:ID`, async (req, res) => {
  try {
    let id = [req.params.ID];
    let data = await controller.find(id);
    res.json({ data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

producto.post(api, async (req, res) => {
  try {
    let nombre = req.body.nombre;
    let codigo = req.body.codigo;
    let precio = req.body.precio;
    await controller.create(nombre, codigo, precio);
    res.json({ data: { nombre, codigo, precio }, message: "Registro guardado." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

producto.put(`${api}/:ID`, async (req, res) => {
  try {
    let id = [req.params.ID];
    let nombre = req.body.nombre;
    let codigo = req.body.codigo;
    let precio = req.body.precio;
    await controller.update(id, nombre, codigo), precio;
    res.json({ data: {id, nombre, codigo, precio }, message: "Registro actualizado." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

producto.delete(`${api}/:ID`, async (req, res) => {
  try {
    let id = [req.params.ID];
    await controller.delete(id);
    res.json({ message: "Registro eliminado." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

export default producto;
