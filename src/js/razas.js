/*
 * En este fichero se encuentran definidas las razas y sus habildades
 */

//Definimos las razas
function Raza(nombre, nombrePasiva, descripcion, habilidad) {
  this.nombre = nombre;
  this.nombrePasiva = nombrePasiva;
  this.pasiva = descripcion;
  this.habilidad = habilidad;
 }

var altmer, bosmer, dunmer, orco, imperial, nordico, breton, guardiaRojo, argoniano, khajita;

/*
 * Petición a la API que crea las razas con su correspondiente información
 */
function defineRazas() {
  //Creamos las razas
  var urlGet = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=nueva';
  return $.ajax({
    url: urlGet,
    type: 'GET',
    //async: false,
    success: function(data) {
      var info = JSON.parse(data);

      altmer = new Raza(info.razas[0].nombre, info.razas[0].habilidad, info.razas[0].descripcion, undefined);

      bosmer = new Raza(info.razas[1].nombre, info.razas[1].habilidad, info.razas[1].descripcion, function () {
        // Hace 1 de daño
        console.log("ATAQUEEEE BOSMER");
      });

      dunmer = new Raza(info.razas[2].nombre, info.razas[2].habilidad, info.razas[2].descripcion, function () {
        // Hace 4 de daño --> se carga cada 10 turnos
        console.log("ATAQUEEEE DUNMER");
      });

      orco = new Raza(info.razas[3].nombre, info.razas[3].habilidad, info.razas[3].descripcion, function () {
        // 20% mejores
        console.log("ATAQUEEEE ORCO");
      });

      imperial = new Raza(info.razas[4].nombre, info.razas[4].habilidad, info.razas[4].descripcion, function () {
        // 25% de oro
        console.log("ATAQUEEEE IMPERIAL");
      });

      nordico = new Raza(info.razas[5].nombre, info.razas[5].habilidad, info.razas[5].descripcion, function () {
        // 20% de daño extra
        console.log("ATAQUEEEE NORDICO");
      });

      breton = new Raza(info.razas[6].nombre, info.razas[6].habilidad, info.razas[6].descripcion, undefined);

      guardiaRojo = new Raza(info.razas[7].nombre, info.razas[7].habilidad, info.razas[7].descripcion, function () {
        // +3 daño si no lleva escudo
        console.log("ATAQUEEEE ROJO");
      });

      argoniano = new Raza(info.razas[8].nombre, info.razas[8].habilidad, info.razas[8].descripcion, function () {
        // 33% de prob de curarse 25% de la vida restante
        console.log("ATAQUEEEE ARGONIANO");
      });

      khajita = new Raza(info.razas[9].nombre, info.razas[9].habilidad, info.razas[9].descripcion, function () {
        //10% prob de esquivar
        console.log("ATAQUEEEE KHAJITA");
      });
    }
  });
}
