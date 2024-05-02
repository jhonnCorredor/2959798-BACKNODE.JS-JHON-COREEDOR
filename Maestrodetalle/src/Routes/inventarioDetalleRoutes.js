import expres from "express";
import bodyParser from "body-parser";
import inventarioDetalleController from "../controllers/inventarioDetalleController.js";

const controller = new inventarioDetalleController();
const api = "";
const invDetalle = new expres();
invDetalle.use(bodyParser.json());
invDetalle.use(bodyParser.urlencoded({ extended: true }));

invDetalle.get(api, async (req, res) => {
  try {
    let data = await controller.read();
    res.json({ data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

invDetalle.get(`${api}/:ID`, async (req, res) => {
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


invDetalle.post(api, async (req, res) => {
  try {
    let inventario = req.body.inventario;
    let producto = req.body.producto;
    let cantidad = req.body.cantidad;
    await controller.create(inventario, producto, cantidad);
    res.json({ data: { inventario, producto, cantidad }, message: "Registro guardado." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

invDetalle.put(`${api}/:ID`, async (req, res) => {
  try {
    let id = [req.params.ID];
    let inventario = req.body.inventario;
    let producto = req.body.producto;
    let cantidad = req.body.cantidad;
    await controller.update(id, inventario, producto, cantidad);
    res.json({ data: {id, inventario, producto, cantidad }, message: "Registro actualizado." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud", Error: error });
  }
});

invDetalle.delete(`${api}/:ID`, async (req, res) => {
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

export default invDetalle;
