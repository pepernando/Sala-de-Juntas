const zeroPad = (num, places) => String(num).padStart(places, '0')
//funcion que formatea fecha y se le pueden incrementar minutos
function formateoFecha(fecha){
    let d = new Date(fecha)
    let padHoras = zeroPad(d.getHours(),2)
    let padMinutos = zeroPad(d.getMinutes(),2)
    let a = d.toLocaleDateString().split('\/').reverse().join('-') + 'T' +padHoras+':'+ padMinutos
    return a
}

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

//compara si la primer fecha esta fuera de las dos siguientes
//si es cierto es que fecha esta fuera del rango y se puede reservar
function fueraDeFechas(fecha,fechaA,fechaB){
    let fechaComparar = new Date(fecha)
    let fecha1 = new Date(fechaA)
    let fecha2 = new Date(fechaB)
    return !(fecha1 <= fechaComparar && fechaComparar <= fecha2)
}   

module.exports.fueraDeFechas = fueraDeFechas
module.exports.validarFecha = validarFecha
module.exports.formateoFecha = formateoFecha