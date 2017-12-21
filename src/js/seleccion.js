var ficheroInicial;

//Definimos las razas
function Raza(nombre, nombrePasiva, descripcion, habilidad) {
  this.nombre = nombre;
  this.nombrePasiva = nombrePasiva;
  this.pasiva = descripcion;
  this.habilidad = habilidad;
}
var altmer, bosmer, dunmer, orco, imperial, nordico, breton, guardiaRojo, argoniano, khajita;

//Definimos los roles
function Rol(nombre, descripcion, ataque, armadura, resistencia) {
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.ataque = ataque;
  this.armadura = armadura;
  this.resistencia = resistencia;
}
var mago, asesino, tanque;

//Seleccion de personaje
var playerJSON;

window.onload = function() {
  //Leemos el fichero inicial
  var urlGet = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=nueva';
  $.get(urlGet, function (data) {
    var ficheroInicial = JSON.parse(data);

    //Creamos las razas
    altmer = new Raza(ficheroInicial.razas[0].nombre, ficheroInicial.razas[0].habilidad, ficheroInicial.razas[0].descripcion, undefined);

    bosmer = new Raza(ficheroInicial.razas[1].nombre, ficheroInicial.razas[1].habilidad, ficheroInicial.razas[1].descripcion, undefined);

    dunmer = new Raza(ficheroInicial.razas[2].nombre, ficheroInicial.razas[2].habilidad, ficheroInicial.razas[2].descripcion, undefined);

    orco = new Raza(ficheroInicial.razas[3].nombre, ficheroInicial.razas[3].habilidad, ficheroInicial.razas[3].descripcion, undefined);

    imperial = new Raza(ficheroInicial.razas[4].nombre, ficheroInicial.razas[4].habilidad, ficheroInicial.razas[4].descripcion, undefined);

    nordico = new Raza(ficheroInicial.razas[5].nombre, ficheroInicial.razas[5].habilidad, ficheroInicial.razas[5].descripcion, undefined);

    breton = new Raza(ficheroInicial.razas[6].nombre, ficheroInicial.razas[6].habilidad, ficheroInicial.razas[6].descripcion, undefined);

    guardiaRojo = new Raza(ficheroInicial.razas[7].nombre, ficheroInicial.razas[7].habilidad, ficheroInicial.razas[7].descripcion, undefined);

    argoniano = new Raza(ficheroInicial.razas[8].nombre, ficheroInicial.razas[8].habilidad, ficheroInicial.razas[8].descripcion, undefined);

    khajita = new Raza(ficheroInicial.razas[9].nombre, ficheroInicial.razas[9].habilidad, ficheroInicial.razas[9].descripcion, undefined);

    //Creamos los roles
    mago = new Rol(ficheroInicial.roles[0].nombre, ficheroInicial.roles[0].descripcion, ficheroInicial.roles[0].ataque, ficheroInicial.roles[0].armadura, ficheroInicial.roles[0].resistenciaMagica);

    asesino = new Rol(ficheroInicial.roles[1].nombre, ficheroInicial.roles[1].descripcion, ficheroInicial.roles[1].ataque, ficheroInicial.roles[1].armadura, ficheroInicial.roles[1].resistenciaMagica);

    tanque = new Rol(ficheroInicial.roles[2].nombre, ficheroInicial.roles[2].descripcion, ficheroInicial.roles[2].ataque, ficheroInicial.roles[2].armadura, ficheroInicial.roles[2].resistenciaMagica);

    //Cargamos la información inicial (altmer y mago)
    cambioRaza();
    cambioRol();
  });

  //Creamos los eventos
  $('#raza').change(function() {
    cambioRaza();
  });

  $('#rol').change(function() {
    cambioRol();
  });
}

function creaPersonaje() {
  var nombre = $('#nombre').val();
  var raza = $('#raza').val();
  var sexo = $('#sexo').val();
  var rol = $('#rol').val();

  //Comprobamos que el nombre sea valido
  if ((/^\w{3,12}$/).test(nombre)) {
    console.log(nuevoJugador);
    //Actualizamos los valores del jugador en función de su raza y rol
    var ataque, tipoAtaque, armadura, resistenciaMagica;

    switch (rol) {
      case 'mago':
        tipoAtaque = 'AP';
        ataque = nuevoJugador.ataque + mago.ataque;
        armadura = nuevoJugador.armadura + mago.armadura;
        resistenciaMagica = nuevoJugador.resistenciaMagica + mago.resistencia;
        break;
      case 'asesino':
        tipoAtaque = 'AD';
        ataque = nuevoJugador.ataque + asesino.ataque;
        armadura = nuevoJugador.armadura + asesino.armadura;
        resistenciaMagica = nuevoJugador.resistenciaMagica + asesino.resistencia;
        break;
      case 'tanque':
        tipoAtaque = 'AD';
        ataque = nuevoJugador.ataque + tanque.ataque;
        armadura = nuevoJugador.armadura + tanque.armadura;
        resistenciaMagica = nuevoJugador.resistenciaMagica + tanque.resistencia;
        break;
    }

    switch (raza) {
      case 'altmer':
        if (tipoAtaque == 'AP') {
          ataque = ataque + 2;
        }
        //Creamos la habilidad
        altmer.habilidad = function () {
          console.log("ATAQUEEEE ALTMER");
        };
        break;
      case 'bosmer':
        //Creamos la habilidad
        bosmer.habilidad = function () {
          // Hace 1 de daño
          console.log("ATAQUEEEE BOSMER");
        };
        break;
      case 'dunmer':
        //Creamos la habilidad
        dunmer.habilidad = function () {
          // Hace 4 de daño --> se carga cada 10 turnos
          console.log("ATAQUEEEE DUNMER");
        };
        break;
      case 'orco':
        //Creamos la habilidad
        orco.habilidad = function () {
          // 20% mejores
          console.log("ATAQUEEEE ORCO");
        };
        break;
      case 'imperial':
        //Creamos la habilidad
        imperial.habilidad = function () {
          // 25% de oro
          console.log("ATAQUEEEE IMPERIAL");
        };
        break;
      case 'nordico':
        //Creamos la habilidad
        nordico.habilidad = function () {
          // 20% de daño extra
          console.log("ATAQUEEEE NORDICO");
        };
        break;
      case 'breton':
        if (tipoAtaque == 'AP') {
          ataque = ataque + 1;
        }
        resistenciaMagica = resistenciaMagica + 2;

        //Creamos la habilidad
        breton.habilidad = function () {
          console.log("ATAQUEEEE BRETON");
        };
        break;
      case 'guardiaRojo':
        armadura = armadura + 2;

        //Creamos la habilidad
        guardiaRojo.habilidad = function () {
          // +3 daño si no lleva escudo
          console.log("ATAQUEEEE ROJO");
        };
        break;
      case 'argoniano':
        //Creamos la habilidad
        argoniano.habilidad = function () {
          // 33% de prob de curarse 25% de la vida restante
          console.log("ATAQUEEEE ARGONIANO");
        };
        break;
      case 'khajita':
        //Creamos la habilidad
        khajita.habilidad = function () {
          //10% prob de esquivar
          console.log("ATAQUEEEE KHAJITA");
        };
        break;
    }
    //Creamos un JSON con la nueva información
    playerJSON = JSON.stringify({nombre: nombre, raza: raza, sexo: sexo, rol: rol, vida: 10, nivel: 0, xp: 0, ataque: ataque, tipoAtaque: tipoAtaque, armadura: armadura, resistenciaMagica: resistenciaMagica, manoderecha: 'boli', manoizquierda: '', mochila: [], estadoPartida: {x: 3, y: 1, nivel: -2, direccion: 0}});

    console.log(playerJSON);
    //Avanzamos hasta el juego
    //location.href = 'juego.html';
  } else {
    alert('Introduce un nombre que tenga entre 3 y 12 caràcteres alfanumericos (sin acentos)');
  }
}

function cambioRol() {
  //Mostramos la información del nuevo rol
  $('#descripcion-rol').html(descripcionRol($('#rol').val()));
}

function cambioRaza() {
  var raza = $('#raza').val();

  //Cambiamos la imagen del personaje
  var src = './media/images/' + raza + '_char.png';
  $('#visor-personaje').get(0).src='./media/images/dungeon_door.png';

  //Mostramos la información del nuevo raza
  $('#descripcion-raza').html(descripcionRaza(raza));
}

function descripcionRaza(raza) {
  var descripcion;
  switch (raza) {
    case 'altmer':
      descripcion = altmer.nombrePasiva + ": <br>" + altmer.pasiva;
      break;
    case 'bosmer':
      descripcion = bosmer.nombrePasiva + ": <br>" + bosmer.pasiva;
      break;
    case 'dunmer':
      descripcion = dunmer.nombrePasiva + ": <br>" + dunmer.pasiva;
      break;
    case 'orco':
      descripcion = orco.nombrePasiva + ": <br>" + orco.pasiva;
      break;
    case 'imperial':
      descripcion = imperial.nombrePasiva + ": <br>" + imperial.pasiva;
      break;
    case 'nordico':
      descripcion = nordico.nombrePasiva + ": <br>" + nordico.pasiva;
      break;
    case 'breton':
      descripcion = breton.nombrePasiva + ": <br>" + breton.pasiva;
      break;
    case 'guardiaRojo':
      descripcion = guardiaRojo.nombrePasiva + ": <br>" + guardiaRojo.pasiva;
      break;
    case 'argoniano':
      descripcion = argoniano.nombrePasiva + ": <br>" + argoniano.pasiva;
      break;
    case 'khajita':
      descripcion = khajita.nombrePasiva + ": <br>" + khajita.pasiva;
      break;
  }
  return descripcion;
}

function descripcionRol(rol) {
  var descripcion;
  switch (rol) {
    case 'mago':
      descripcion = mago.nombre + ": <br>" + mago.descripcion;
      break;
    case 'asesino':
      descripcion = asesino.nombre + ": <br>" + asesino.descripcion;
      break;
    case 'tanque':
      descripcion = tanque.nombre + ": <br>" + tanque.descripcion;
      break;
  }
  return descripcion;
}
