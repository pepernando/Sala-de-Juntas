var express = require('express');
//para exportar el router a la app posteriormente
var router = express.Router();
//Toda la funcionalidad de las reservaciones
var db = require('./basedeDatos')

router.get('/',(req,res) => {
    let arraux = []
    db.each("SELECT * FROM salas", (err, row) => {
        if (err) {
            console.log(err.message);
        }
        arraux.push(row)
    },() => {
        console.log(arraux)
        res.render('salas',{array: arraux})
    })
})

router.post('/',(req,res) => {
    const obj = JSON.parse(JSON.stringify(req.body)); 
    console.log(obj)
    db.serialize( () => {
        db.run('INSERT INTO salas(nombre,disponibilidad) VALUES (?,1)',obj.nombresala)
    })
    res.redirect('/salas')
})

module.exports = router;