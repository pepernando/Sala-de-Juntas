var express = require('express')
//para exportar el router a la app posteriormente
var router = express.Router();
var db = require('./basedeDatos')
const fechas = require('./validarFechas')

//Toda la funcionalidad de las reservaciones

// Ruta inicial mostrar tabla
router.get('/', (req,res) => {    
    arrayReservaciones = []
    arraySalas = []
    db.each("SELECT * FROM salas", (err, row) => {
        if (err) {
            console.log(err.message);
        }
        arraySalas.push(row)
    },() => {
        db.each("SELECT * FROM vreservaciones", (err, row) => {
            if (err) {
                console.log(err.message);
            }
            arrayReservaciones.push(row)
        },() => {
            res.render('reservaciones',{array: arrayReservaciones,salas: arraySalas})            
        })
    })    
})

//Agregar Reservacion
router.post('/',(req,res) => {
    const obj = JSON.parse(JSON.stringify(req.body))
    let dateinicio = obj.fechainicio
    let datefin = obj.fechafin
    validarOcupado(obj.idsala,dateinicio,datefin,res,-1)
})

//Editar reservacion pagina
router.get('/editar/:id', (req,res) => {    
    let id = req.params.id
    let arraySalas = []
    db.each("SELECT * FROM salas", (err, row) => {
        if (err) {
            console.log(err.message);
        }
        arraySalas.push(row)
    },() => {
        res.render('editarreservacion',{idreservacion: id,salas: arraySalas})
    })
})
//Accion de editar
router.post('/:idreservacion',(req,res) => {
    const obj = JSON.parse(JSON.stringify(req.body)); 
    let idedit = req.params.idreservacion
    validarOcupado(obj.idsala,obj.fechainicio,obj.fechafin,res,idedit)
})


router.get('/mensaje', (req,res) => {    
    res.json({asdasd: "asdas"})
})

//cambiar estado sala
function liberarSala(estado,idSala){
    let stmt = db.prepare("update salas set disponibilidad=? where idsala=?");
    if(estado==0){
        stmt.run(0,idSala)
        // res.send('sala desocupada')
    }else{
        stmt.run(1,idSala)
        // res.send('sala ocupada')
    }
    stmt.finalize()
}

//Busca todas las futuras reservaciones de una sala
//y mira si su inicio o fin de fecha entra en conflicto
//con los otros lapsos
function validarOcupado(idsala,fechainicio,fechafin,res,idedit){
    let arrayReservaciones = []
    db.each(`SELECT * FROM reservaciones where idsala=${idsala}`, (err, row) => {
        if (err) {
            console.log(err.message);
        }
        arrayReservaciones.push(fechas.fueraDeFechas(fechainicio,row.fechainicio,row.fechafin))
        arrayReservaciones.push(fechas.fueraDeFechas(fechafin,row.fechainicio,row.fechafin))
    },() => {
        if(arrayReservaciones.every(e => e) ){
            if(idedit==-1){
                db.serialize( () => {
                    db.run(
                        'INSERT INTO reservaciones(idsala,fechainicio,fechafin) VALUES (?,?,?)',
                        idsala,fechainicio,fechafin
                    )
                })
            }else{
                db.serialize( () => {
                    db.run(`update reservaciones 
                        set 
                            idsala = ?,
                            fechainicio=?, 
                            fechafin=? 
                            where idreservacion=?`,
                    idsala,fechainicio,fechafin,idedit)
                })          
            }            
            res.redirect('/reservaciones')
        }else{
            res.send('fechas ocupadas')
        }
    })
}

function verificaDisponibilidad(){    
    let opcupados = []
    let hoy = new Date(Date.now())
    db.each("SELECT * FROM reservaciones", (err, row) => {
        if (err) {
            console.log(err.message);
        }
        if(!fechas.fueraDeFechas(hoy,row.fechainicio,row.fechafin)){
            opcupados.push(row.idsala)
        }
    },() => {
        db.each("SELECT * FROM salas", (err, row2) => {
            if (err) {
                console.log(err.message);
            }
            if(opcupados.includes(row2.idsala)){
                liberarSala(1,row2.idsala)
            }else{
                liberarSala(0,row2.idsala)
            }
        })
    })
}

//Borrar reservacion
router.get('/borrar/:id',(req,res) => {
    let id = req.params.id
    db.serialize( () => {
        db.run('delete from reservaciones where idreservacion=?',id)
    })
    res.redirect('/reservaciones')
})

setInterval(verificaDisponibilidad,5000)

module.exports = router