//Definimos las razas
function Raza(nombre, nombrePasiva, descripcion, habilidad) {
  this.nombre = nombre;
  this.nombrePasiva = nombrePasiva;
  this.pasiva = descripcion;
  this.habilidad = habilidad;
}

var altmer = new Raza('Altmer', 'Soberbía Altmer', 'La habilidad para las artes mágicas de los altmer no tiene rival. Es por eso que tienen +X de daño mágico inicial.', undefined);

var bosmer = new Raza('Bosmer', 'Tiro de Valen', 'Los bosmer son los mejores arqueros de todo Tamriel. Antes de empezar el combate, es capaz de realizar un tiro con el arco que inflinge +X de daño verdadero al enemigo.', undefined);

var dunmer = new Raza('Dunmer', 'Ira del antepasado', 'Los dunmer, nativos de Morrowind, donde se alza la Montaña Roja, un enorme volcán, no le temen al fuego. Cada X turnos, se rodean durante un turno de fuego, que inflinge +X de daño verdadero al enemigo cuándo ataca.', undefined);

var orco = new Raza('Orco', 'Herrero de Orsinium', 'Los orcos son los mayores herreros de toda Tamriel. Las armas y escudos comprados en la tienda son un X% mejores.', undefined);

var imperial = new Raza('Imperial', 'Astucia de Cyrodiil', 'Los imperiales, nativos de Cyrodiil, sobresalen sobre las demadas razas por su astucia. Por eso, son capaces de conseguir un x% más de oro.', undefined);

var nordico = new Raza('Nordico', 'Fuerza de Skyrim', 'Los nordicos son una de las grandes razas guerreras de Tamriel. Su excelente habilidad para con la espada, les otorga un X% más de daño si llevan equipados una espada y un escudo.', undefined);

var breton = new Raza('Breton', 'Piel de dragon', 'Los bretones, habitantes de Roca Alta, son una raza mestiza entre altmer y humanos, tienen parte de la habilidad mágica de los altmer y una gran resistencia hacia la magia. Disponen de +X de resistencia mágica y +Y de daño mágico adicional.', undefined);

var guardiaRojo = new Raza('Guardia Rojo', 'Subida de adrenalina', 'Los guardia rojo, habitantes de Páramo del Martillo, son la mejor raza guerrera de toda Tamriel. Su gran envergadura les permite usar armaduras pesadas, por lo tanto, tienen +X de armadura adicional, y su execelente habilidad con armas de gran envergadura, les otorga +X de daño físico si no llevan escudo equipado.', undefined);

var argoniano = new Raza('Argoniano', 'Piel de hist', 'Los argonianos, una raza con aspecto de reptiliano que habitan en la Ciénaga Negra son resistentes a casi cualquier enfermedad. Despues de cada combate, tienen un X% de curarse +Y de vida.', undefined);

var khajita = new Raza('Khajita', 'Sigilo', 'Los khajita son una raza de aspecto felino originaria de Elsweyr y conocida por ser excelentes ladrones, gracias a su sigilo y agilidad. Tienen un X% de posibilidades de esquivar el ataque de un enemigo.', undefined);


//Definimos los roles
function Rol(nombre, descripcion, ataque, armadura, resistencia) {
  this.nombre = nombre;
  this.descripcion = descripcion;
  this.ataque = ataque;
  this.armadura = armadura;
  this.resistencia = resistencia;
}

var mago = new Rol('Colegio de Hibernalia', 'En el Colegio de Hibernalia se aprende todo lo relacionado con las artes arcanas. Sus miembros son hábiles magos. +X de daño mágico adicional y -Y de armadura y resistencia mágica.', 3, -1, -1);

var asesino = new Rol('Hermandad Oscura', 'La Hermandad Oscura es el gremio de asesinos más mortífero de toda Tamriel. Sus miembros son despiadados asesinos. +X de daño física adicional y -Y de armadura de resistencia mágica', 3, -1, -1);

var tanque = new Rol('Legión Imperial', 'En el ejercito del imperio, la Legión Imperial, se encuentran los mejores soldados del imperio. Sus miembros son resistentes gracias a sus excelentes armaduras. -X de daño y +Y de armadura y resistencia mágica.', -2, 2, 2);

//Seleccion de personaje
var playerJSON;

window.onload = function() {
  //Cargamos la información inicial (altmer y mago)
  cambioRaza();
  cambioRol();

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
    //Leemos el JSON de nueva partida
    var nuevoJugador;

    console.log(nuevoJugador);
    //Actualizamos los valores del jugador en función de su raza y rol
    var ataque, tipoAtaque, armadura, resistenciaMagica;

    /*switch (rol) {
      case 'mago':
        tipoAtaque = 'AP';
        ataque = nuevoJugador.get('player').get('ataque') + 3;
        armadura = nuevoJugador.get('player').get('armadura') - 1;
        resistenciaMagica = nuevoJugador.get('player').get('resistenciaMagica') - 1;
        break;
      case 'asesino':
        tipoAtaque = 'AD';
        ataque = nuevoJugador.get('player').get('ataque') + 3;
        armadura = nuevoJugador.get('player').get('armadura') - 1;
        resistenciaMagica = nuevoJugador.get('player').get('resistenciaMagica') - 1;
        break;
      case 'tanque':
        tipoAtaque = 'AD';
        ataque = nuevoJugador.get('player').get('ataque') - 2;
        armadura = nuevoJugador.get('player').get('armadura') + 2;
        resistenciaMagica = nuevoJugador.get('player').get('resistenciaMagica') + 2;
        break;
    }*/

    switch (raza) {
      case 'altmer':
        if (tipoAtaque == 'AP') {
          ataque = nuevoJugador.get('player').get('ataque') + 2;
        }
        console.log('patata');
        //Creamos la habilidad
        altmer.habilidad = function () {
          console.log("ATAQUEEEE ALTMER");
        };
        console.log('patata2');
        break;
      case 'bosmer':
        //Creamos la habilidad
        bosmer.habilidad = function () {
          console.log("ATAQUEEEE BOSMER");
        };
        break;
      case 'dunmer':
        //Creamos la habilidad
        dunmer.habilidad = function () {
          console.log("ATAQUEEEE DUNMER");
        };
        break;
      case 'orco':
        //Creamos la habilidad
        orco.habilidad = function () {
          console.log("ATAQUEEEE ORCO");
        };
        break;
      case 'imperial':
        //Creamos la habilidad
        imperial.habilidad = function () {
          console.log("ATAQUEEEE IMPERIAL");
        };
        break;
      case 'nordico':
        //Creamos la habilidad
        nordico.habilidad = function () {
          console.log("ATAQUEEEE NORDICO");
        };
        break;
      case 'breton':
        if (tipoAtaque == 'AP') {
          ataque = nuevoJugador.get('player').get('ataque') + 1;
        }
        resistenciaMagica = nuevoJugador.get('player').get('resistenciaMagica') + 2;

        //Creamos la habilidad
        breton.habilidad = function () {
          console.log("ATAQUEEEE BRETON");
        };
        break;
      case 'guardiaRojo':
        armadura = nuevoJugador.get('player').get('armadura') + 2;

        //Creamos la habilidad
        guardiaRojo.habilidad = function () {
          console.log("ATAQUEEEE ROJO");
        };
        break;
      case 'argoniano':
        //Creamos la habilidad
        argoniano.habilidad = function () {
          console.log("ATAQUEEEE ARGONIANO");
        };
        break;
      case 'khajita':
        //Creamos la habilidad
        khajita.habilidad = function () {
          console.log("ATAQUEEEE KHAJITA");
        };
        break;
    }
    //Creamos un JSON con la nueva información
    playerJSON = JSON.stringify({nombre: 'Joan', raza: 'Humano', sexo: 'masculino', rol: 'ninguno', vida: 10, nivel: 0, xp: 100, ataque: 2, tipoAtaque: 'aa', armadura: 2, resistenciaMagica: 2, manoderecha: 'boli', manoizquierda: '', mochila: [], estadoPartida: {x: 3, y: 1, nivel: -2, direccion: 0}});

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
