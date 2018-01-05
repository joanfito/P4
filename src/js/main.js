var cofres, armas, escudos, armaduras, pociones, moneda, botas, mapas, hechizos;
var gameover = false, cargasDunmer = 0, accionTerminada = true;


/* Inicializar el juego */
function iniciarJuego() {
  //Comprobamos que el slot que se va a cargar es un valor válido (nueva, 1, 2)
  var slot;
  try {
    slot = leeSlot();

    if (slot == 'nueva' || slot == '1' || slot == '2') {
      //Definimos las razas para poder usar sus habilidades
      defineRazas();

      //Cargamos el fichero correspondiente
      $.when(cargaFichero(slot)).done(function() {
        //Funciones del juego
        actualizaHUD();
        //  movimiento (ADRI)
        //  cambiar de nivel (de mapa) (ADRI)
        //lucha (FITO)
        //TODO crear 'stats' eneigo en hud (FITO)
        //TODO gestionar nivel personaje (augmentar las stats siguendo el enunciado + subir un punto en una de las stats (definido en rubrica.rtf)) (ADRI --> funcion creada: augmentaXP)
        //TODO recoger objetos (que dropean los enemigos) (FITO)
        //TODO comprar en tienda (ADRI -- aplicar pasiva Orco)
        //TODO abrir cofre (MARC: onclick en canvas per a "obrirlo")
        //TODO gestionar mochila (FITO)
        //TODO gestionar objetos equipados (MARC -- llegeix extras.rtf)
        //TODO visor (canvas) (ADRI)
        // HUD (FITO)
        //TODO guardar partida (sobreescribir si ya existe una en el slot) (FITO)
        //musica (ADRI)
        // alduin (drop 'alma' + aprender grito) (MARC)
        // abrir puerta salida (MARC)
        // game over (por muerte o abriendo puerta) (MARC (gameover.html))
      });
    } else {
      alert('Slot no válido, no modifiques la URL.');
      location.href = 'index.html';
    }
  } catch (e) {
    alert('Slot no válido, no modifiques la URL.');
    location.href = 'index.html';
  }
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
function mapaToImg(x, y) {
  /* TODO */
}

/* Muestra el fichero de la partida */
function mostraConfig() {
  console.log(partida);
}

/* Carga el fichero de partida correspondiente */
function cargaFichero(slot) {
  var url = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=' + slot;

  return $.get(url, function(data) {
    //Assignamos los datos que hay en el fichero
    data = JSON.parse(data);

    //Variables existentes en juego.js
    partida = data;
    objetos = data.objetos;
    enemigo = data.enemigos;
    player = data.player;

    //Nuevas variables
    cofres = data.cofre;
    armas = objetos[0].armas;
    escudos = objetos[1].escudos;
    armaduras = objetos[2].armaduras;
    pociones = objetos[3].pociones;
    moneda = objetos[4].moneda;
    botas = objetos[5].botas;
    hechizos = objetos[6].hechizos;
    mapas = data.mapas;

    //Cargamos el mapa (variable existente en juego.js)
    mapa = cargaMapa(player.estadoPartida.nivel);
    cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);
  });
}

/* Lee el slot que tiene que cargar */
function leeSlot() {
  //location.search vale ?slot=<valor>, por lo tanto, buscamos <valor>
  var regex = new RegExp("[\\?&]" + 'slot' + "=([^&#]*)");
  var slot = regex.exec(location.search)[1];
  return slot;
}

/* Carga el mapa del nivel indicado */
function cargaMapa(nivel) {
  for (var m of mapas) {
    if (m.nivel == nivel) {
      return m;
    }
  }
}

/* Carga la imagen que corresponde segun la posicion del jugador */
function cargaPosicion(x, y, orientacion) {
  switch (orientacion) {
    case 0:
      pintaPosicion(x - 1, y);
      break;
    case 1:
      pintaPosicion(x + 1, y);
      break;
    case 2:
      pintaPosicion(x, y + 1);
      break;
    case 3:
      pintaPosicion(x, y - 1);
      break;
  }
}

/* Transforma la posicion de la imagen a la propia imagen en si */
function mapaToImg(x, y) {
  switch (mapa[x][y]) {
    case "V":
      return "suelo.png";
    case "X":
      return "pared.png";
    case "O":
      return "portal.png";
    case "P":
      return "portal.png";
    case "S":
      return "puerta_arriba.png";
    case "B":
      return "puerta_abajo.png";
    case "F":
      return "puerta_final.png";
    case "T":
      return "tienda.png";
    case "C":
      return cofres[0].img;
    case "J":
      return enemigo[3].img;
    case "E":
      return enemigo[0].img;
    case "M":
      return enemigo[1].img;
    case "G":
      return enemigo[2].img;
    case "A":
      return "pared_con_grito 1.png";
  }
}

function muevePlayer(direccion) {

  if (accionTerminada) {
    switch (player.estadoPartida.direccion) {
      case 0:
        //Direccion NORTE
        switch (direccion) {
          case 0:
            //Adelante
            if (player.estadoPartida.x > 0) {
              $('#texto-juego').html(player.nombre + ' avanza hacia adelante');
              movimiento(player.estadoPartida.x - 1, player.estadoPartida.y);
            }
            break;
          case 1:
            //Atras
            if (player.estadoPartida.x < 9) {
              $('#texto-juego').html(player.nombre + ' retrocede');
              movimiento(player.estadoPartida.x + 1, player.estadoPartida.y);
            }
            break;
          case 2:
            //Derecha
            if (player.estadoPartida.y < 9) {
              $('#texto-juego').html(player.nombre + ' avanza hacia la derecha');
              movimiento(player.estadoPartida.x, player.estadoPartida.y + 1);
            }
            break;
          case 3:
            //Izquierda
            if (player.estadoPartida.y > 0) {
              $('#texto-juego').html(player.nombre + ' avanza hacia la izquierda');
              movimiento(player.estadoPartida.x, player.estadoPartida.y - 1);
            }
            break;
        }
        break;
      case 1:
        //Direccion SUR
        switch (direccion) {
          //Norte
          case 0:
            //Adelante
            if (player.estadoPartida.x < 9) {
              $('#texto-juego').html(player.nombre + ' avanza hacia adelante');
              movimiento(player.estadoPartida.x + 1, player.estadoPartida.y);
            }
            break;
          case 1:
            //Atras
            if (player.estadoPartida.x > 0) {
              $('#texto-juego').html(player.nombre + ' retrocede');
              movimiento(player.estadoPartida.x - 1, player.estadoPartida.y);
            }
            break;
          case 2:
            //Derecha
            if (player.estadoPartida.y > 0) {
              $('#texto-juego').html(player.nombre + ' avanza hacia la derecha');
              movimiento(player.estadoPartida.x, player.estadoPartida.y - 1);
            }
            break;
          case 3:
            //Izquierda
            if (player.estadoPartida.y < 9) {
              $('#texto-juego').html(player.nombre + ' avanza hacia la izquierda');
              movimiento(player.estadoPartida.x, player.estadoPartida.y + 1);
            }
            break;
        }
        break;
      case 2:
        //Direccion ESTE
        switch (direccion) {
          case 0:
            //Adelante
            if (player.estadoPartida.y < 9) {
              $('#texto-juego').html(player.nombre + ' avanza hacia adelante');
              movimiento(player.estadoPartida.x, player.estadoPartida.y + 1);
            }
            break;
          case 1:
            //Atras
            if (player.estadoPartida.y > 0) {
              $('#texto-juego').html(player.nombre + ' retrocede');
              movimiento(player.estadoPartida.x, player.estadoPartida.y - 1);
            }
            break;
          case 2:
            //Derecha
            if (player.estadoPartida.x < 9) {
              $('#texto-juego').html(player.nombre + ' avanza hacia la derecha');
              movimiento(player.estadoPartida.x + 1, player.estadoPartida.y);
            }
            break;
          case 3:
            //Izquierda
            if (player.estadoPartida.x > 0) {
              $('#texto-juego').html(player.nombre + ' avanza hacia la izquierda');
              movimiento(player.estadoPartida.x - 1, player.estadoPartida.y);
            }
            break;
        }
        break;
      case 3:
        //Direccion OESTE
        switch (direccion) {
          case 0:
            //Adelante
            if (player.estadoPartida.y > 0) {
              $('#texto-juego').html(player.nombre + ' avanza hacia adelante');
              movimiento(player.estadoPartida.x, player.estadoPartida.y - 1);
            }
            break;
          case 1:
            //Atras
            if (player.estadoPartida.y < 9) {
              $('#texto-juego').html(player.nombre + ' retrocede');
              movimiento(player.estadoPartida.x, player.estadoPartida.y + 1);
            }
            break;
          case 2:
            //Derecha
            if (player.estadoPartida.x > 0) {
              $('#texto-juego').html(player.nombre + ' avanza hacia la derecha');
              movimiento(player.estadoPartida.x - 1, player.estadoPartida.y);
            }
            break;
          case 3:
            //Izquierda
            if (player.estadoPartida.x < 9) {
              $('#texto-juego').html(player.nombre + ' avanza hacia la izquierda');
              movimiento(player.estadoPartida.x + 1, player.estadoPartida.y);
            }
            break;
        }
        break;
    }
  }
}

/* Trata el movimiento del jugador */
function movimiento(x, y) {
  //Entran x, y que serian la posicion siguiente dependiendo de la tecla que pulsemos --> x+1,y , etc.
  switch (mapa[x][y]) {
    case "V":
      //Actualizamos la posicion
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      break;
    case "X":
      $('#texto-juego').html('No puedes avanzar por la pared');
      break;
    case "O":
      if (player.estadoPartida.nivel == -5) {
        player.estadoPartida.nivel = -1;
        player.estadoPartida.x = 8;
        player.estadoPartida.y = 7;
        player.estadoPartida.direccion = 3;
      } else {
        player.estadoPartida.nivel = -5;
        player.estadoPartida.x = 8;
        player.estadoPartida.y = 1;
        player.estadoPartida.direccion = 0;
      }
      break;
    case "P":
      if (player.estadoPartida.nivel == -4) {
        player.estadoPartida.nivel = -2;
        player.estadoPartida.x = 8;
        player.estadoPartida.y = 4;
        player.estadoPartida.direccion = 0;
      } else {
        player.estadoPartida.nivel = -4;
        player.estadoPartida.x = 5;
        player.estadoPartida.y = 6;
        player.estadoPartida.direccion = 0;
      }
      break;
    case "S":
      player.estadoPartida.nivel++;
      switch (player.estadoPartida.nivel) {
        case -1:
          player.estadoPartida.x = 4;
          player.estadoPartida.y = 8;
          player.estadoPartida.direccion = 3;
          break;
        case -2:
          player.estadoPartida.x = 6;
          player.estadoPartida.y = 3;
          player.estadoPartida.direccion = 2;
          break;
        case -3:
          player.estadoPartida.x = 2;
          player.estadoPartida.y = 1;
          player.estadoPartida.direccion = 2;
          break;
        case -4:
          player.estadoPartida.x = 8;
          player.estadoPartida.y = 1;
          player.estadoPartida.direccion = 3;
          break;
      }
      break;
    case "B":
      player.estadoPartida.nivel--;
      switch (player.estadoPartida.nivel) {
        case -2:
          player.estadoPartida.x = 4;
          player.estadoPartida.y = 8;
          player.estadoPartida.direccion = 3;
          break;
        case -3:
          player.estadoPartida.x = 6;
          player.estadoPartida.y = 3;
          player.estadoPartida.direccion = 0;
          break;
        case -4:
          player.estadoPartida.x = 2;
          player.estadoPartida.y = 1;
          player.estadoPartida.direccion = 2;
          break;
        case -5:
          player.estadoPartida.x = 8;
          player.estadoPartida.y = 1;
          player.estadoPartida.direccion = 3;
          break;
      }
      break;
    case "F":
      if (player.estadoPartida.grito == true) {
        setGameover(true);
      } else {
        $('#texto-juego').html('Necesitas el grito para abrir la puerta');
      }
      break;
    case "T":
      //Bloqueamos el movimiento mientras compramos
      accionTerminada = false;
      creaTienda();
      break;
    case "C":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre();
      break;
    case "J":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      //Bloqueamos el movimiento mientras luchamos
      accionTerminada = false;
      combate(enemigo[3]);
      break;
    case "G":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      //Bloqueamos el movimiento mientras luchamos
      accionTerminada = false;
      combate(enemigo[2]);
      break;
    case "E":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      //Bloqueamos el movimiento mientras luchamos
      accionTerminada = false;
      combate(enemigo[0]);
      break;
    case "M":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      //Bloqueamos el movimiento mientras luchamos
      accionTerminada = false;
      combate(enemigo[1]);
      break;
    case "A":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;
      aprendeGrito();
      break;
  }
  mapa = cargaMapa(player.estadoPartida.nivel);
  cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);
}

/* Trata los giros de camara */
function girarCamara(derecha) {
  if (derecha == true) {
    switch (player.estadoPartida.direccion) {
      case 0:
        player.estadoPartida.direccion = 2;
        $('#texto-juego').html(player.nombre + ' está mirando al este');
        break;
      case 1:
        player.estadoPartida.direccion = 3;
        $('#texto-juego').html(player.nombre + ' está mirando al oeste');
        break;
      case 2:
        player.estadoPartida.direccion = 1;
        $('#texto-juego').html(player.nombre + ' está mirando al sud');
        break;
      case 3:
        player.estadoPartida.direccion = 0;
        $('#texto-juego').html(player.nombre + ' está mirando al norte');
        break;
    }
  } else {
    switch (player.estadoPartida.direccion) {
      case 0:
        player.estadoPartida.direccion = 3;
        $('#texto-juego').html(player.nombre + ' está mirando al oeste');
        break;
      case 1:
        player.estadoPartida.direccion = 2;
        $('#texto-juego').html(player.nombre + ' está mirando al este');
        break;
      case 2:
        player.estadoPartida.direccion = 0;
        $('#texto-juego').html(player.nombre + ' está mirando al norte');
        break;
      case 3:
        player.estadoPartida.direccion = 1;
        $('#texto-juego').html(player.nombre + ' está mirando al sud');
        break;
    }
  }

  //Actualizamos el canvas
  cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);
}

/* Creamos el menu de la Tienda con los items*/
function creaTienda() {
  $('#visor').remove();
  creaMenuTienda();
}

function creaMenuTienda(){
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#productos').append('<tr id ="fila1"></tr>');
  if (player.rol == 'mago'){
    $('#fila1').append('<td><button class = "botontienda2" disabled>Armas</button></td>');
  }else{
    $('#fila1').append('<td><button class = "botontienda" onclick = creaTableArmas();>Armas</button></td>');
  }
  $('#fila1').append('<td><button class = "botontienda" onclick = creaTableEscudos();>Escudos</button></td>');
  $('#fila1').append('<td><button class = "botontienda" onclick = creaTableArmaduras();>Armaduras</button></td>');
  $('#productos').append('<tr id ="fila2"></tr>');
  $('#fila2').append('<td><button class = "botontienda" onclick = creaTablePociones();>Pociones</button></td>');
  $('#fila2').append('<td><button class = "botontienda" onclick = creaTableBotas();>Botas</button></td>');
  if (player.rol == 'mago'){
    $('#fila2').append('<td><button class = "botontienda" onclick = creaTableHechizos();>Hechizos</button></td>');
  }else{
    $('#fila2').append('<td><button disabled class = "botontienda2">Hechizos</button></td>');
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = volverJuegoTienda();>Salir</button>');
}

function creaTableArmas(){
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que arma deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#tienda').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Ataque</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while(armas[i] != null){
    var fila = 'fila';
    var numfila = 1 + i;
    var strnumfila = numfila.toString();

    var idfila = fila.concat(strnumfila);
    var idnombre = 'nombre'.concat(idfila);
    var idataque = 'ataque'.concat(idfila);
    var idprecio = 'precio'.concat(idfila);

    var tr = '<tr id = "' + idfila + '"></tr>';
    var tdnombre = '<td id = "' + idnombre + '"></td>';
    var tdataque = '<td id = "' + idataque + '"></td>';
    var tdprecio = '<td id = "' + idprecio + '"></td>';

    $('#tienda').append(tr);
    $('#'+idfila).append(tdnombre);
    $('#'+idnombre).html(armas[i].nombre);
    $('#'+idfila).append(tdataque);
    $('#'+idataque).html(armas[i].ataque);
    $('#'+idfila).append(tdprecio);
    $('#'+idprecio).html(armas[i].precio);

    var comprar = '<td><button onclick = compraentienda(armas[' + i + '].precio,0,armas[' + i + '].ataque);>Comprar!</button></td>';
    $('#'+idfila).append(comprar);

    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

function creaTableEscudos(){
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que escudo deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#tienda').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Armadura</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while(escudos[i] != null){
    var fila = 'fila';
    var numfila = 1 + i;
    var strnumfila = numfila.toString();

    var idfila = fila.concat(strnumfila);
    var idnombre = 'nombre'.concat(idfila);
    var idarmadura = 'armadura'.concat(idfila);
    var idprecio = 'precio'.concat(idfila);

    var tr = '<tr id = "' + idfila + '"></tr>';
    var tdnombre = '<td id = "' + idnombre + '"></td>';
    var tdarmadura = '<td id = "' + idarmadura + '"></td>';
    var tdprecio = '<td id = "' + idprecio + '"></td>';

    $('#tienda').append(tr);
    $('#'+idfila).append(tdnombre);
    $('#'+idnombre).html(escudos[i].nombre);
    $('#'+idfila).append(tdarmadura);
    $('#'+idarmadura).html(escudos[i].armadura);
    $('#'+idfila).append(tdprecio);
    $('#'+idprecio).html(escudos[i].precio);

    var comprar = '<td><button onclick = compraentienda(escudos[' + i + '].precio,1,escudos[' + i + '].armadura);>Comprar!</button></td>';
    $('#'+idfila).append(comprar);
    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

function creaTableArmaduras(){
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que armadura deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#tienda').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Armadura</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while(armaduras[i] != null){
    var fila = 'fila';
    var numfila = 1 + i;
    var strnumfila = numfila.toString();

    var idfila = fila.concat(strnumfila);
    var idnombre = 'nombre'.concat(idfila);
    var idarmadura = 'armadura'.concat(idfila);
    var idprecio = 'precio'.concat(idfila);

    var tr = '<tr id = "' + idfila + '"></tr>';
    var tdnombre = '<td id = "' + idnombre + '"></td>';
    var tdarmadura = '<td id = "' + idarmadura + '"></td>';
    var tdprecio = '<td id = "' + idprecio + '"></td>';

    $('#tienda').append(tr);
    $('#'+idfila).append(tdnombre);
    $('#'+idnombre).html(armaduras[i].nombre);
    $('#'+idfila).append(tdarmadura);
    $('#'+idarmadura).html(armaduras[i].armadura);
    $('#'+idfila).append(tdprecio);
    $('#'+idprecio).html(armaduras[i].precio);

    var comprar = '<td><button onclick = compraentienda(armaduras[' + i + '].precio,1,armaduras[' + i + '].armadura);>Comprar!</button></td>';
    $('#'+idfila).append(comprar);
    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

function creaTablePociones(){
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que pocion deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#tienda').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Curacion</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while(pociones[i] != null){
    var fila = 'fila';
    var numfila = 1 + i;
    var strnumfila = numfila.toString();

    var idfila = fila.concat(strnumfila);
    var idnombre = 'nombre'.concat(idfila);
    var idcuracion = 'curacion'.concat(idfila);
    var idprecio = 'precio'.concat(idfila);

    var tr = '<tr id = "' + idfila + '"></tr>';
    var tdnombre = '<td id = "' + idnombre + '"></td>';
    var tdcuracion = '<td id = "' + idcuracion + '"></td>';
    var tdprecio = '<td id = "' + idprecio + '"></td>';

    $('#tienda').append(tr);
    $('#'+idfila).append(tdnombre);
    $('#'+idnombre).html(pociones[i].nombre);
    $('#'+idfila).append(tdcuracion);
    $('#'+idcuracion).html(pociones[i].curacion);
    $('#'+idfila).append(tdprecio);
    $('#'+idprecio).html(pociones[i].precio);

    var comprar = '<td><button onclick = compraentienda(pociones[' + i + '].precio,2,pociones[' + i + '].curacion);>Comprar!</button></td>';
    $('#'+idfila).append(comprar);
    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

function creaTableBotas(){
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que botas deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#tienda').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while(botas[i] != null){
    var fila = 'fila';
    var numfila = 1 + i;
    var strnumfila = numfila.toString();

    var idfila = fila.concat(strnumfila);
    var idnombre = 'nombre'.concat(idfila);
    var idprecio = 'precio'.concat(idfila);

    var tr = '<tr id = "' + idfila + '"></tr>';
    var tdnombre = '<td id = "' + idnombre + '"></td>';
    var tdprecio = '<td id = "' + idprecio + '"></td>';

    $('#tienda').append(tr);
    $('#'+idfila).append(tdnombre);
    $('#'+idnombre).html(botas[i].nombre);
    $('#'+idfila).append(tdprecio);
    $('#'+idprecio).html(botas[i].precio);

    var comprar = '<td><button onclick = compraentienda(botas[' + i + '].precio,0,0);>Comprar!</button></td>';
    $('#'+idfila).append(comprar);

    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

function creaTableHechizos(){
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que hechizo deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#tienda').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Ataque</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while(hechizos[i] != null){
    var fila = 'fila';
    var numfila = 1 + i;
    var strnumfila = numfila.toString();

    var idfila = fila.concat(strnumfila);
    var idnombre = 'nombre'.concat(idfila);
    var idataque = 'ataque'.concat(idfila);
    var idprecio = 'precio'.concat(idfila);

    var tr = '<tr id = "' + idfila + '"></tr>';
    var tdnombre = '<td id = "' + idnombre + '"></td>';
    var tdataque = '<td id = "' + idataque + '"></td>';
    var tdprecio = '<td id = "' + idprecio + '"></td>';

    $('#tienda').append(tr);
    $('#'+idfila).append(tdnombre);
    $('#'+idnombre).html(hechizos[i].nombre);
    $('#'+idfila).append(tdataque);
    $('#'+idataque).html(hechizos[i].ataque);
    $('#'+idfila).append(tdprecio);
    $('#'+idprecio).html(hechizos[i].precio);

    var comprar = '<td><button onclick = compraentienda(hechizos[' + i + '].precio,0,hechizos[' + i + '].ataque);>Comprar!</button></td>';
    $('#'+idfila).append(comprar);
    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

function compraentienda (precio, tipo, valor){
  /* TODO Comprar y volver al menu principal + Hacer el scroll de las table */
  alert('comprando...');
  creaMenuTienda();
}

function volverJuegoTienda(){
    $('#tienda').remove();
    $('#navegacion').append('<canvas id="visor" width="300" height="300"></canvas>');
    cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);

    accionTerminada = true;

}

/* Creamos el menu de la Tienda con los items*/
function creaCofre() {
  //Al salir --> accionTerminada = true;
  accionTerminada = true;
}

function aprendeGrito() {
  if (player.estadoPartida.alma == true) {
    player.estadoPartida.grito = true;
  } else {
    player.estadoPartida.grito = false;
  }
}

/* Ejecuta el combate entre el jugador y el enemigo */
function combate(rival) {
  var huir = false;

  //Comprobamos que el combate sea posible, sino, el jugador huye del combate
  if (player.tipoAtaque == 'AD' && player.ataque <= rival.armadura) {
    huir = true;
    $('#texto-juego').html('Has huido del combate contra ' + rival.nombre);
  } else if (player.tipoAtaque == 'AP' && player.ataque <= rival.resistenciaMagica) {
    huir = true;
    $('#texto-juego').html('Has huido del combate contra ' + rival.nombre);
  } else {
    //El combate es posible, ejecutamos la habilidad pasiva (si tiene)
    if (player.raza == 'bosmer') {
      setTimeout(bosmer.habilidad, 500, rival);
    }

    //Empieza el combate
    $('#texto-juego').html('Te enfrentas a un ' + rival.nombre);
    turnosCombate(rival, 0, 0, rival.vida);

  }
}

function turnosCombate(rival, turno, vidaPerdida, vidaInicial) {
  //Empieza el combate (2 segundos entre turno y turno)
  if (player.vida > 0 && rival.vida > 0) {
    if (turno % 2 == 0) {
      //Primero ataca el jugador
      if (player.raza == 'dunmer' && cargasDunmer == 10) {
        setTimeout(dunmer.habilidad, 2000, rival, cargasDunmer);
        setTimeout(turnoJugador, 4000, rival, turno, vidaPerdida, vidaInicial);
        cargasDunmer = 0;
      } else {
        setTimeout(turnoJugador, 2000, rival, turno, vidaPerdida, vidaInicial);
      }

    } else {
      //Despues ataca el enemigo
      setTimeout(turnoRival, 2000, rival, turno, vidaPerdida, vidaInicial);
    }
  } else {
    //Si el enemigo muere, augmentamos la XP y dropeamos los objetos
    if (rival.vida <= 0) {
      setTimeout(victoriaCombate, 2000, rival, vidaPerdida, vidaInicial);
    }

    if (player.vida <= 0) {
      setTimeout(derrotaCombate, 2000, rival);
    }
  }
}

/* Turno del jugador */
function turnoJugador(rival, turno, vidaPerdida, vidaInicial) {

  var dano;
  if (player.tipoAtaque == 'AD') {
    dano = player.ataque - rival.armadura;
  } else dano = player.ataque - rival.resistenciaMagica;

  rival.vida = rival.vida - dano;
  $('#texto-juego').html(player.nombre + ' inflinge ' + dano + ' de daño al ' + rival.nombre);

  //Augmentamos el turno
  cargasDunmer++;
  turno++;

  //Actualizamos la vida del enemigo en el HUD
  actualizaVidaEnemigo();

  //Si el rival tiene vida, volvemos a llamar a la funcion
  turnosCombate(rival, turno, vidaPerdida, vidaInicial);
}

/* Turno del rival */
function turnoRival(rival, turno, vidaPerdida, vidaInicial) {
  var dano, esquivar;
  if (player.raza == 'khajita') {
    esquivar = khajita.habilidad();
  }

  if (!esquivar) {
    if (rival.tipoAtaque == 'fisico') {
      dano = rival.ataque - player.armadura;
    } else dano = rival.ataque - player.resistenciaMagica;

    if (dano > 0) {
      player.vida = player.vida - dano;
      vidaPerdida = vidaPerdida + dano;
      $('#texto-juego').html('El ' + rival.nombre + ' te inflinge ' + dano + ' de daño');
    } else {
      $('#texto-juego').html('El ' + rival.nombre + ' no te inflinge daño');
    }
  } else {
    $('#texto-juego').html('Has esquivado el ataque');
  }

  //Augmentamos el turno
  turno++;

  //Actualizamos la vida del jugador en el HUD
  actualizaVida();

  //Si el jugador tiene vida, volvemos a llamar a la funcion
  turnosCombate(rival, turno, vidaPerdida, vidaInicial);
}

/* Gestiona la victoria en un combate */
function victoriaCombate(rival, vidaPerdida, vidaInicial) {
  $('#texto-juego').html(player.nombre + ' ha vencido el combate contra el ' + rival.nombre);
  augmentaXP(rival.xp);
  recogeObjetos(rival.objetos);

  if (player.raza == 'argoniano') {
    player.vida = player.vida + argoniano.habilidad(vidaPerdida);
  }

  //Comprobamos que el enemigo sea Alduin
  if (player.estadoPartida.x  == 4 && player.estadoPartida.y == 6 && player.estadoPartida.nivel == -5) {
    player.estadoPartida.alma = true;
  }

  //Augmentamos el numero de enemigos muertos
  player.estadoPartida.enemigosMuertos++;

  //Restauramos la vida del rival para proximos combates
  rival.vida = vidaInicial;

  //Indicamos que ya nos podemos volver a mover
  accionTerminada = true;
}

/* Gestiona la derrota en un combate */
function derrotaCombate(rival) {
  $('#texto-juego').html(player.nombre + ' ha perdido el combate contra el ' + rival.nombre);
  //setGameover(false);
}

/* Gestiona la experiencia y el nivel del jugador */
function augmentaXP(xp) {

  actualizaNivel();
}

/* Gestiona la recogida de objetos de un enemigo */
function recogeObjetos(objetos) {

}

/* Indicamos que se ha acabado la partida */
function setGameover(victoria) {
  gameover = true;
  var fin = function() {
    location.href = (victoria ? 'gameover.html?victoria=s' : 'gameover.html?victoria=n');
  }();
}

/* Guarda la partida actual en un slot */
function guardarPartida() {
  //Substitumos el panel de información por el menu de guardar partida

}

/* Cierra el juego */
function salir() {
  alert('Gracias por jugar');
  location.href = 'index.html';
}

/* Actualiza el HUD del juego */
function actualizaHUD() {

  //Valores de la barra de la vida
  actualizaVida();

  //Valores del nivel y de la barra de experiencia
  actualizaNivel();

  //Actualizamos las otras estadisticas
  actualizaStats();

  //Actualizamos los objetos de la mochila
  actualizaMochila();

  //Actualizamos los objetos equipados
  actualizaEquipo();

  //Actualizamos el nombre, sexo, rol y raza
  $('#nombre-hud').html(player.nombre);
  $('#sexo-hud').html(player.sexo);
  $('#raza-hud').html(getNombre(player.raza));

  switch (player.rol) {
    case 'mago':
      $('#rol-hud').html(partida.roles[0].nombre);
      break;
    case 'asesino':
      $('#rol-hud').html(partida.roles[1].nombre);
      break;
    case 'tanque':
      $('#rol-hud').html(partida.roles[2].nombre);
      break;
  }
}

/* Actualiza la vida del hud */
function actualizaVida() {
  $('.barra-vida').children('progress').attr('value',player.vida);
  $('.barra-vida').children('progress').attr('max',player.vidaMax);
}

/* Actualiza el nivel del hud */
function actualizaNivel() {
  $('.barra-nivel').children('p').html(player.nivel);
  $('.barra-nivel').children('progress').attr('value',player.xp);
  $('.barra-nivel').children('progress').attr('max',10 * player.nivel);
}

/* Actualiza las estadisticas del hud */
function actualizaStats() {
  $('#oro-hud').html(player.oro);
  $('#ataque-hud').html(player.ataque);
  $('#armadura-hud').html(player.armadura);
  $('#mr-hud').html(player.resistenciaMagica);
  $('#niv-hud').html(player.estadoPartida.nivel);
  $('#enemigos-hud').html(player.estadoPartida.enemigosMuertos);
}

/* Actualiza la mochila en el HUD */
function actualizaMochila() {
  var id;
  for (var i = 0; i < player.mochila.length; i++) {
    id = '#objeto' + (i+1);
    $(id).attr('src', './media/images/' + getObjectImg(player.mochila[i]));
  }
}

/* Actualiza los objetos equipados en el HUD */
function actualizaEquipo() {
  $('#mano-izq').attr('src', './media/images/' + getObjectImg(player.manoizquierda));
  $('#mano-der').attr('src', './media/images/' + getObjectImg(player.manoderecha));
  $('#cuerpo').attr('src', './media/images/' + getObjectImg(player.cuerpo));
}

/* Actualiza la vida del enemigo */
function actualizaVidaEnemigo() {

}

/* Devuelve la imagen de un objeto */
function getObjectImg(nombre) {
  var obj;

  //Buscamos en las armas
  for (obj of armas) {
    if (obj.nombre == nombre) {
      return obj.img;
    }
  }

  //Buscamos en los escudos
  for (obj of escudos) {
    if (obj.nombre == nombre) {
      return obj.img;
    }
  }

  //Buscamos en las armaduras
  for (obj of armaduras) {
    if (obj.nombre == nombre) {
      return obj.img;
    }
  }

  //Buscamos en las pociones
  for (obj of pociones) {
    if (obj.nombre == nombre) {
      return obj.img;
    }
  }

  //Buscamos en las botas
  for (obj of botas) {
    if (obj.nombre == nombre) {
      return obj.img;
    }
  }

  //Buscamos en los hechizos
  for (obj of hechizos) {
    if (obj.nombre == nombre) {
      return obj.img;
    }
  }

  return 'objeto_vacio.png';
}
