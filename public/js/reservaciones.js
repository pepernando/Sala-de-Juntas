//agrega ceros faltantes para poder formatear la fecha
const zeroPad = (num, places) => String(num).padStart(places, '0')
//funcion que formatea fecha y se le pueden incrementar minutos
function formateoFecha(incrementoM=0){
    let d = new Date(Date.now() + incrementoM*60000)
    let padHoras = zeroPad(d.getHours(),2)
    let padMinutos = zeroPad(d.getMinutes(),2)
    let a = d.toLocaleDateString().split('\/').reverse().join('-') + 'T' +padHoras+':'+ padMinutos
    return a
}
//se les da un formato input tipo datetime-local
document.getElementById('fechainicio').value = formateoFecha(2)
document.getElementById('fechafin').value = formateoFecha(16)

function validarFecha(fechaA,fechaB){
    let diferencia = (fechaB - fechaA)/3600000;
    let fechahoy = new Date(Date.now())
    let errores = []
    if(diferencia > 2){
        errores.push('no se puede reservar mas de dos horas!')
    }
    if(diferencia<0){
        errores.push('la primera fecha debe ser anterior a la segunda!')
    }
    if(diferencia==0){
        errores.push('las fechas deben de ser diferentes')
    }
    if(fechaA <= fechahoy|| fechaB <= fechahoy ){
        errores.push('no puedes reservar en fechas pasadas')
    }
    return errores
}

//valida todas las condiciones de arriba
//para evitar desde el usuario datos erroneos y no recibir la solicitud
//asi no tener peticiones extras
function validar(){
    let param1 = document.getElementById('fechainicio').value
    let param2 = document.getElementById('fechafin').value
    let d1 = new Date(param1)
    let d2 = new Date(param2)
    let errores = validarFecha(d1,d2)
    if(errores.length===0){
        alert('Todo correcto :)')
        return true
    }else{
        alert(errores.join('\n'))
        return false
    }
}
document.getElementById('submit').onclick('submit',validar)
