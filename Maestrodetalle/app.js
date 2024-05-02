import expres from 'express'
import inventarioRoutes from './src/Routes/inventarioRoutes.js'
import productoRputes from './src/Routes/productoRoutes.js';
import invDetalleRoutes from './src/Routes/inventarioDetalleRoutes.js'


const app = new expres;

app.use('/api/inventario', inventarioRoutes)
app.use('/api/producto',productoRputes)
app.use('/api/inventario-detalle',invDetalleRoutes)

const PORT = 3000; 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});