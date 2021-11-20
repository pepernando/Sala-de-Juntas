var sqlite3 = require('sqlite3').verbose();

//conexion al archivo local database.db
let db = new sqlite3.Database('./backend/database.db', (err) => {    
  if (err) {
    console.error(err.message);
  }else{
    console.log('Conectado a base de datos');
  }
});

module.exports = db