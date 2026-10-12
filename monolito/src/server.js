const express = require('express');
const pool = require('./db'); // Importamos la conexión a la base de datos
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ estado: 'ok' });
});

// Endpoint para probar la conexión a PostgreSQL
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ estado: 'ok', fecha: result.rows[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error de conexión a la base de datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
