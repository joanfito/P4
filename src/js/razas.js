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

      bosmer = new Raza(info.razas[1].nombre, info.razas[1].habilidad, info.razas[1].descripcion, function (rival) {
        // Hace 1 de daño
        rival.vida = rival.vida - 1;
        $('#texto-juego').html('Inflinges 1 de daño con tu arco al ' + rival.nombre);
      });

      dunmer = new Raza(info.razas[2].nombre, info.razas[2].habilidad, info.razas[2].descripcion, function (rival, turnos) {
        // Hace 4 de daño --> se carga cada 10 turno
        if (turnos == 10) {
          rival.vida = rival.vida - 4;
          $('#texto-juego').html('El ' + rival.nombre + ' se quema y recibe 4 de daño');
          return true;
        }
        return false;
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

      argoniano = new Raza(info.razas[8].nombre, info.razas[8].habilidad, info.razas[8].descripcion, function (vida) {
        // 33% de prob de curarse 50% de la vida perdida
        var ran = Math.floor((Math.random() * 100) + 1);
        return ran <= 33 ? Math.floor(vida * 0.5) : 0;
      });

      khajita = new Raza(info.razas[9].nombre, info.razas[9].habilidad, info.razas[9].descripcion, function () {
        //10% prob de esquivar
        var ran = Math.floor((Math.random() * 100) + 1);
        return ran <= 10 ? true : false;
      });
    }
  });
}

function getNombre(raza) {
  switch (raza) {
    case 'altmer':
      return altmer.nombre;
    case 'bosmer':
      return bosmer.nombre;
    case 'dunmer':
      return dunmer.nombre;
    case 'orco':
      return orco.nombre;
    case 'imperial':
      return imperial.nombre;
    case 'nordico':
      return nordico.nombre;
    case 'breton':
      return breton.nombre;
    case 'guardiaRojo':
      return guardiaRojo.nombre;
    case 'argoniano':
      return argoniano.nombre;
    case 'khajita':
      return khajita.nombre;
  }
}
