const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '',
  database: 'Aeropuerto'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/index');
app.use('/', routes);

app.listen(4000, () => {
  console.log('Servidor en ejecución en el puerto 4000');
});

app.use(express.static('public'));

