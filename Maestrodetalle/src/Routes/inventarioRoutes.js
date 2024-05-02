import expres from "express";
import bodyParser from "body-parser";
import inventarioController from "../controllers/inventarioController.js";

const controller = new inventarioController();
const api = "";
const inventario = new expres();
inventario.use(bodyParser.json());
inventario.use(bodyParser.urlencoded({ extended: true }));

inventario.get(api, async (req, res) => {
  try {
    let data = await controller.read();
    res.json({ data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

inventario.get(`${api}/:ID`, async (req, res) => {
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

inventario.post(api, async (req, res) => {
  try {
    let nombre = req.body.nombre;
    let codigo = req.body.codigo;
    await controller.create(nombre, codigo);
    res.json({ data: { nombre, codigo }, message: "Registro guardado." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

inventario.put(`${api}/:ID`, async (req, res) => {
  try {
    let id = [req.params.ID];
    let nombre = req.body.nombre;
    let codigo = req.body.codigo;
    await controller.update(id, nombre, codigo);
    res.json({ data: {id, nombre, codigo }, message: "Registro actualizado." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

inventario.delete(`${api}/:ID`, async (req, res) => {
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

export default inventario;
