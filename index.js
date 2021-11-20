const express = require('express')
const app = express()
const port = 3000

/*la app usara una carpeta llamada public
para servir los archivos estaticos*/
app.use(express.static('public'))

/* El motor de vistas sera pug por su simplicidad 
la primera funcion es para decir que carpeta se guardaran
las vistas la segunda para configurar pug*/
app.set('views', './vistas')
app.set('view engine', 'pug')

app.use(express.urlencoded({extended: true}))
app.use(express.json());

var reservaciones = require('./backend/reservaciones.js')
var salas = require('./backend/salas.js')

app.use('/reservaciones',reservaciones)
app.use('/salas',salas)

app.get('/', (req,res) => {  
  res.render('index')
})

app.listen(port, () => {
  console.log(`Aplicacion funcionando en: http://localhost:${port}`)
})