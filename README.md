# Sala-de-Juntas
Sala de juntas en expressjs para reservar una o mas salas.
Se eligio como tecnoliogia [expressjs](https://expressjs.com/) por su simplicidad en las pequeñas api's. con el motor de vistas [pug](https://pugjs.org) ya que es muy facil de leer y reciclar codigos y generar tambien

Como base de datos se uso [sqlite3](https://www.npmjs.com/package/sqlite3) por su desempeño en un solo computador, y tiene lo necesario para un pequeño proyecto, y por ultmio como libreria css se uso [Picnic CSS](https://picnicss.com/) ya que es muy simple y liegera con lo necesario en conjuto de [fontawesome](https://fontawesome.com/) para los inconos

## Instalacion
Descargar la version LTS de [NodeJS](https://nodejs.org/) una ves descargado bajar el repositorio de [Github clickeando aqui](https://github.com/pepernando/Sala-de-Juntas) y estando en la carpeta descargada ejecutar `npm install` y posteriormente `npm start` para iniciar el proyecto depues ir a la pagina siguiente [localhost](http://localhost:3000/) cuando el servidor este ejecutandose.

## Uso
Se tienen dos secciones, una de salas para ver las salas nombrarlas y saber su disponibilidad, y otra de reservaciones con el listado de las reservaciones para poder ver las reservaciones futuras, editarlas o cancelarlas.

hay un timer que verifica la disponibilidad de las salas, aunque seria mas apropiado hacerlo por tareas programadas y reducir la carga, entre muchas optimizaciones de codigo que por razones de tiempo y y trabajo no alcance. 