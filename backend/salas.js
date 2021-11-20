var express = require('express');
//para exportar el router a la app posteriormente
var router = express.Router();
//Toda la funcionalidad de las reservaciones
var db = require('./basedeDatos')

//pagina principal de sala de juntas
router.get('/',(req,res) => {
    let arraux = []
    db.each("SELECT * FROM salas", (err, row) => {
        if (err) {
            console.log(err.message);
        }
        arraux.push(row)
    },() => {
        res.render('salas',{array: arraux})
    })
})
// Agregar una sala de juntas
router.post('/',(req,res) => {
    const obj = JSON.parse(JSON.stringify(req.body)); 
    db.serialize( () => {
        db.run('INSERT INTO salas(nombre,disponibilidad) VALUES (?,1)',obj.nombresala)
    })
    res.redirect('/salas')
})

//borrar sala
router.get('/borrar/:id',(req,res) => {
    let id = req.params.id
    console.log('id es',id)
    db.serialize( () => {
        db.run('delete from salas where idsala=?',id)
    })
    res.redirect('/salas')
})

//Editar pagina
router.get('/editar/:id',(req,res) => {
    let id = req.params.id
    res.render('editarsala',{idsala: id })
})
// Accion de Editar
router.post('/:id',(req,res) => {
    const obj = JSON.parse(JSON.stringify(req.body)); 
    let id = req.params.id
    db.serialize( () => {
        db.run('update salas set nombre=? where idsala=?',obj.nombresala,id)
    })
    res.redirect('/salas')
})

module.exports = router;