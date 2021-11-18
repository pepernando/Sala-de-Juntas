var sqlite3 = require('sqlite3').verbose();

//conexion al archivo local database.db
let db = new sqlite3.Database('./backend/database.db', (err) => {    
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado a base de datos');
});

/*
var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("Ipsum " + i);
  }
stmt.finalize();*/

//db.close();

module.exports = db