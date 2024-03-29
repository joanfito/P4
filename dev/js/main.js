var cofres, armas, escudos, armaduras, pociones, moneda, botas, mapas, hechizos;
var gameover = false, cargasDunmer = 0, accionTerminada = true, tipoCofre;
var itemsCofre, mapaAbierto = false;


/* Inicializar el juego */
function iniciarJuego() {
  //Cargamos la musica del juego
  cargaMusica('juego');
  //Comprobamos que el slot que se va a cargar es un valor válido (nueva, 1, 2)
  var slot;
  try {
    slot = leeSlot();

    if (slot == 'nueva' || slot == '1' || slot == '2') {
      //Definimos las razas para poder usar sus habilidades
      defineRazas();

      //Cargamos el fichero correspondiente
      $.when(cargaFichero(slot)).done(function() {

        //Añadimos el arma inicial
        if (player.tipoAtaque == 'AD') {
          player.manoizquierda = armas[0];
          player.ataque = player.ataque + armas[0].ataque;
        } else {
          player.manoizquierda = hechizos[0];
          player.ataque = player.ataque + hechizos[0].ataque;
        }

        actualizaHUD();
        creaMenuMochila();
        creaMenuEquipo();
        actualizaMapa();

        //Creamos el listener para guardar
        $('#menu-guardar').click(function(e) {
          var nombreSlot1 = $('#nombre-slot1').text();
          var nombreSlot2 = $('#nombre-slot2').text();

          switch (e.target.id) {
            case 'eliminar-slot1':
              if (nombreSlot1 != 'Slot 1 (vacío)') {
                eliminaSlot(1);
              } else {
                $('#texto-guardar').html('No puedes eliminar un slot vacio');
              }
              break;
            case 'guardar-slot1':
              if (nombreSlot1 != 'Slot 1 (vacío)') {
                $('#texto-guardar').html('No puedes guardar en un slot ocupado');
              } else {
                guardaSlot(1);
              }
              break;
            case 'eliminar-slot2':
              if (nombreSlot2 != 'Slot 2 (vacío)') {
                eliminaSlot(2);
              } else {
                $('#texto-guardar').html('No puedes eliminar un slot vacio');
              }
              break;
            case 'guardar-slot2':
              if (nombreSlot2 != 'Slot 2 (vacío)') {
                $('#texto-guardar').html('No puedes guardar en un slot ocupado');
              } else {
                guardaSlot(2);
              }
              break;
          }
        });
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

/* Listener del teclado, para poder moverse sin tener que pulsar la tecla */
window.onkeypress = function(event) {
  var key = event.keyCode;
  //Dependiendo de la tecla pulsada, se movera, girara la camara o guardara partida
  if (key == 87 || key == 119) {
    //W
    if (accionTerminada) {
      muevePlayer(0);
    }
  } else if (key == 65 || key == 97) {
    //A
    if (accionTerminada) {
      muevePlayer(3);
    }
  } else if (key == 83 || key == 115) {
    //S
    if (accionTerminada) {
      muevePlayer(1);
    }
  } else if (key == 68 || key == 100) {
    //D
    if (accionTerminada) {
      muevePlayer(2);
    }
  } else if (key == 81 || key == 113) {
    //Q
    if (accionTerminada) {
      girarCamara(false);
    }
  } else if (key == 69 || key == 101) {
    //E
    if (accionTerminada) {
      girarCamara(true);
    }
  } else if (key == 71 || key == 103) {
    //G
    if (accionTerminada) {
      guardarPartida();
    }
  } else if (key == 77 || key == 109) {
    //M
    if (!mapaAbierto && accionTerminada) {
      $('#mapa').css({
        'left': ($(window).width() / 2 - $('#mapa').width() / 2) + 'px',
        'top': ($(window).height() / 2 - $('#mapa').height() / 2) + 'px'
      });
      $('#mapa').css('display', 'block');
      mapaAbierto = true;
    } else {
      $('#mapa').css('display', 'none');
      mapaAbierto = false;
    }
  }
};

window.onkeyup = function(event) {
  if (event.keyCode == 27) {
    //ESC
    accionTerminada = true;
    $('#menu-mochila').css('display', 'none');
    $('#menu-equipo').css('display', 'none');
    $('#menu-guardar').css('display', 'none');
    $('#mapa').css('display', 'none');
  }
};

/* Carga la imagen que corresponde segun la posicion del jugador */
function cargaPosicion(x, y, orientacion) {
  try {
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
  } catch (e) {

  }
}

/* Convierte lo que hay en el mapa en un archivo de imagen */
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
    case "C0":
      return cofres[0].img;
    case "C1":
      return cofres[1].img;
    case "C2":
      return cofres[2].img;
    case "C3":
      return cofres[3].img;
    case "C4":
      return cofres[4].img;
    case "C5":
      return cofres[5].img;
    case "C6":
      return cofres[6].img;
    case "C7":
      return cofres[7].img;
    case "C8":
      return cofres[8].img;
    case "C9":
      return cofres[9].img;
    case "C10":
      return cofres[10].img;
    case "C11":
        return cofres[11].img;
    case "C12":
      return cofres[12].img;
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

/* Ejecuta movimiento segun direccion*/
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
    //Espacio Vacio
    case "V":
      //Actualizamos la posicion
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      break;
      //Pared
    case "X":
      $('#texto-juego').html('No puedes avanzar por la pared');
      break;
      //Portal
    case "O":
      $('#texto-juego').html(player.nombre + ' has utilizado un portal');
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
      actualizaHUD();
      break;
      //Portal
    case "P":
      if (player.estadoPartida.nivel == -4) {
        $('#texto-juego').html(player.nombre + ' has utilizado un portal');
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
      actualizaHUD();
      break;
      //Subir de nivel
    case "S":
      $('#texto-juego').html(player.nombre + ' ha subido de nivel');
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
          player.estadoPartida.x = 1;
          player.estadoPartida.y = 8;
          player.estadoPartida.direccion = 3;
          break;
      }
      actualizaHUD();
      break;
      //Bajar de nivel
    case "B":
      $('#texto-juego').html(player.nombre + ' ha bajado de nivel');
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
          player.estadoPartida.x = 1;
          player.estadoPartida.y = 8;
          player.estadoPartida.direccion = 3;
          break;
      }
      actualizaHUD();
      break;
      //Puerta final
    case "F":
      if (player.estadoPartida.grito == true) {
        setGameover(true);
      } else {
        $('#texto-juego').html('Necesitas el grito para abrir la puerta');
      }
      break;
      //Tienda
    case "T":
      //Bloqueamos el movimiento mientras compramos
      accionTerminada = false;
      creaTienda();
      break;
      //Cofre
    case "C0":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(0);
      break;
      //Cofre
    case "C1":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(1);
      break;
      //Cofre
    case "C2":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(2);
      break;
      //Cofre
    case "C3":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(3);
      break;
      //Cofre
    case "C4":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(4);
      break;
      //Cofre
    case "C5":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(5);
      break;
      //Cofre
    case "C6":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(6);
      break;
      //Cofre
    case "C7":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(7);
      break;
      //Cofre
    case "C8":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(8);
      break;
      //Cofre
    case "C9":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(9);
      break;
      //Cofre
    case "C10":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(10);
      break;
      //Cofre
    case "C11":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(11);
      break;
      //Cofre
    case "C12":
      //Bloqueamos el movimiento mientras abrimos el cofre
      accionTerminada = false;
      creaCofre(12);
      break;
    case "J":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      //Bloqueamos el movimiento mientras luchamos
      accionTerminada = false;
      combate(enemigo[3]);
      break;
      //Enemigo Tanque
    case "G":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      //Bloqueamos el movimiento mientras luchamos
      accionTerminada = false;
      combate(Object.assign({}, enemigo[2]));
      break;
      //Enemigo Asesino
    case "E":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      //Bloqueamos el movimiento mientras luchamos
      accionTerminada = false;
      combate(Object.assign({}, enemigo[0]));
      break;
      //Enemigo Mago
    case "M":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;

      //Bloqueamos el movimiento mientras luchamos
      accionTerminada = false;
      combate(Object.assign({}, enemigo[1]));
      break;
      //Alma
    case "A":
      player.estadoPartida.x = x;
      player.estadoPartida.y = y;
      aprendeGrito();
      break;
  }
  mapa = cargaMapa(player.estadoPartida.nivel);
  cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);
  actualizaMapa();
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
  //Quitamos el canvas del div
  $('#visor').remove();
  $('#texto-juego').html(player.nombre + ' abre la tienda');
  //Creamos el menu principal de la tienda
  creaMenuTienda();
}

/* Creamos el menu de la tienda*/
function creaMenuTienda() {
  //En caso de existir, lo removemos, para cuando volvemos de algun submenu
  $('#tienda').remove();
  //Creamos la cabecera
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#productos').append('<tr id ="fila1"></tr>');
  //En funcion si es mago o no le dejamos comprar armas o hechizos
  if (player.rol == 'mago') {
    $('#fila1').append('<td><button class = "botontienda2" disabled>Armas</button></td>');
  } else {
    $('#fila1').append('<td><button class = "botontienda" onclick = creaTableArmas();>Armas</button></td>');
  }

  $('#fila1').append('<td><button class = "botontienda" onclick = creaTableEscudos();>Escudos</button></td>');
  $('#fila1').append('<td><button class = "botontienda" onclick = creaTableArmaduras();>Armaduras</button></td>');

  $('#productos').append('<tr id ="fila2"></tr>');
  $('#fila2').append('<td><button class = "botontienda" onclick = creaTablePociones();>Pociones</button></td>');
  $('#fila2').append('<td><button class = "botontienda" onclick = creaTableBotas();>Botas</button></td>');

  if (player.rol == 'mago') {
    $('#fila2').append('<td><button class = "botontienda" onclick = creaTableHechizos();>Hechizos</button></td>');
  } else {
    $('#fila2').append('<td><button disabled class = "botontienda2">Hechizos</button></td>');
  }

  $('#tienda').append('<button id = "volverjuegotienda" onclick = volverJuegoTienda();>Salir</button>');
}

/* Creamos la table de las Armas*/
function creaTableArmas() {
  //Hacemos remove del menu principal
  $('#tienda').remove();

  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que arma deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#productos').append('<tr id ="fila0"></tr>');

  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Ataque</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  //Añadimos todos los objetos que tiene el submenu
  while (armas[i] != null) {
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

    $('#productos').append(tr);
    $('#' + idfila).append(tdnombre);
    $('#' + idnombre).html(armas[i].nombre);
    $('#' + idfila).append(tdataque);
    $('#' + idataque).html(armas[i].ataque);
    $('#' + idfila).append(tdprecio);
    $('#' + idprecio).html(armas[i].precio);

    var comprar = '<td><button class = "botoncompraitem" onclick = compraentienda(armas[' + i + '],0);>Comprar!</button></td>';
    $('#' + idfila).append(comprar);

    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

/* Creamos la table de los Escudos*/
function creaTableEscudos() {
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que escudo deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#productos').append('<tr id ="fila0"></tr>');

  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Armadura</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while (escudos[i] != null) {
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

    $('#productos').append(tr);
    $('#' + idfila).append(tdnombre);
    $('#' + idnombre).html(escudos[i].nombre);
    $('#' + idfila).append(tdarmadura);
    $('#' + idarmadura).html(escudos[i].armadura);
    $('#' + idfila).append(tdprecio);
    $('#' + idprecio).html(escudos[i].precio);

    var comprar = '<td><button class = "botoncompraitem" onclick = compraentienda(escudos[' + i + '],1);>Comprar!</button></td>';
    $('#' + idfila).append(comprar);
    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

/* Creamos la table de las Armaduras*/
function creaTableArmaduras() {
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que armadura deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#productos').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Armadura</td>');
  $('#fila0').append('<td>Resistencia Magica</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while (armaduras[i] != null) {
    var fila = 'fila';
    var numfila = 1 + i;
    var strnumfila = numfila.toString();

    var idfila = fila.concat(strnumfila);
    var idnombre = 'nombre'.concat(idfila);
    var idarmadura = 'armadura'.concat(idfila);
    var idmr = 'resistenciaMagica'.concat(idfila);
    var idprecio = 'precio'.concat(idfila);

    var tr = '<tr id = "' + idfila + '"></tr>';
    var tdnombre = '<td id = "' + idnombre + '"></td>';
    var tdarmadura = '<td id = "' + idarmadura + '"></td>';
    var tdmr = '<td id = "' + idmr + '"></td>';
    var tdprecio = '<td id = "' + idprecio + '"></td>';

    $('#productos').append(tr);
    $('#' + idfila).append(tdnombre);
    $('#' + idnombre).html(armaduras[i].nombre);
    $('#' + idfila).append(tdarmadura);
    $('#' + idarmadura).html(armaduras[i].armadura);
    $('#' + idfila).append(tdmr);
    $('#' + idmr).html(armaduras[i].resistenciaMagica);
    $('#' + idfila).append(tdprecio);
    $('#' + idprecio).html(armaduras[i].precio);

    var comprar = '<td><button class = "botoncompraitem" onclick = compraentienda(armaduras[' + i + '],2);>Comprar!</button></td>';
    $('#' + idfila).append(comprar);
    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

/* Creamos la table de las Pociones*/
function creaTablePociones() {
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que pocion deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#productos').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Curacion</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while (pociones[i] != null) {
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

    $('#productos').append(tr);
    $('#' + idfila).append(tdnombre);
    $('#' + idnombre).html(pociones[i].nombre);
    $('#' + idfila).append(tdcuracion);
    $('#' + idcuracion).html(pociones[i].curacion);
    $('#' + idfila).append(tdprecio);
    $('#' + idprecio).html(pociones[i].precio);

    var comprar = '<td><button class = "botoncompraitem" onclick = compraentienda(pociones[' + i + '],3);>Comprar!</button></td>';
    $('#' + idfila).append(comprar);
    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

/* Creamos la table de las Botas*/
function creaTableBotas() {
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que botas deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#productos').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while (botas[i] != null) {
    var fila = 'fila';
    var numfila = 1 + i;
    var strnumfila = numfila.toString();

    var idfila = fila.concat(strnumfila);
    var idnombre = 'nombre'.concat(idfila);
    var idprecio = 'precio'.concat(idfila);

    var tr = '<tr id = "' + idfila + '"></tr>';
    var tdnombre = '<td id = "' + idnombre + '"></td>';
    var tdprecio = '<td id = "' + idprecio + '"></td>';

    $('#productos').append(tr);
    $('#' + idfila).append(tdnombre);
    $('#' + idnombre).html(botas[i].nombre);
    $('#' + idfila).append(tdprecio);
    $('#' + idprecio).html(botas[i].precio);

    var comprar = '<td><button class = "botoncompraitem" onclick = compraentienda(botas[' + i + '],4);>Comprar!</button></td>';
    $('#' + idfila).append(comprar);

    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

/* Creamos la table de los Hechizos*/
function creaTableHechizos() {
  $('#tienda').remove();
  $('#navegacion').append('<div id = "tienda"></div>');
  $('#tienda').append('<h3>Que hechizo deseas Comprar?</h3>');
  $('#tienda').append('<table id ="productos"></table>');
  $('#productos').append('<tr id ="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Ataque</td>');
  $('#fila0').append('<td>Precio</td>');
  $('#fila0').append('<td>Comprar</td>');

  var i = 0;
  while (hechizos[i] != null) {
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

    $('#productos').append(tr);
    $('#' + idfila).append(tdnombre);
    $('#' + idnombre).html(hechizos[i].nombre);
    $('#' + idfila).append(tdataque);
    $('#' + idataque).html(hechizos[i].ataque);
    $('#' + idfila).append(tdprecio);
    $('#' + idprecio).html(hechizos[i].precio);

    var comprar = '<td><button class = "botoncompraitem" onclick = compraentienda(hechizos[' + i + '],0);>Comprar!</button></td>';
    $('#' + idfila).append(comprar);
    i++;
  }
  $('#tienda').append('<button id = "volverjuegotienda" onclick = creaMenuTienda();>Salir</button>');
}

/* Gestiona la compra de los diferentes elementos de la tienda*/
function compraentienda(producto, tipo) {
  //Comprovamos que el objeto quepa en la mochila y que tenga suficiente dinero
  if (player.mochila.indexOf("") < 6 && player.mochila.indexOf("") > -1) {
    if (player.oro >= producto.precio) {
      //En caso de ser el orco le aplicamos su habilidad pasiva
      if (player.raza == 'orco') {
        orco.habilidad(producto, tipo);
      }
      //Restamos el dinero del item i lo metemos en la mochila
      player.oro = player.oro - producto.precio;
      player.mochila[player.mochila.indexOf("")] = producto;
      actualizaHUD();
      $('#texto-juego').html('Gracias por comprar!');
    } else {
      $('#texto-juego').html('No tienes suficiente dinero');
    }
  } else {
    $('#texto-juego').html('Tienes la mochila llena!');
  }
  //Volvemos en el menu principal
  creaMenuTienda();
}

/*Nos permite crear de nuevo el canvas del juego*/
function volverJuegoTienda() {
  $('#tienda').remove();
  $('#navegacion').append('<canvas id="visor" width="300" height="300"></canvas>');
  cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);

  accionTerminada = true;

}

/* Crea los cofres del juego*/
function creaCofre(tipoCofre) {
  itemsCofre = cofres[tipoCofre].itemsCofre;
  $('#visor').remove();
  $('#texto-juego').html(player.nombre + ' abre el cofre');
  creaItemsCofre(tipoCofre);
}

/* Crea los items de dentro del cofre*/
function creaItemsCofre(tipoCofre) {
  //Estructura similar a tienda
  $('#cofre').remove();
  $('#navegacion').append('<div id="cofre"></div>');
  $('#cofre').append('<h3>Cofre</h3>');
  $('#cofre').append('<table id="items"></table>');
  $('#items').append('<tr id="fila0"></tr>');
  $('#fila0').append('<td>Nombre</td>');
  $('#fila0').append('<td>Coger</td>');

  //Añadimos todos los objetos del cofre
  for (var i = 0; i < cofres[tipoCofre].objetos.length; i++) {
    var fila = 'fila';
    var numfila = 1 + i;
    var strnumfila = numfila.toString();

    var idfila = fila.concat(strnumfila);
    var idnombre = 'nombre'.concat(idfila);

    var tr = '<tr id = "' + idfila + '"></tr>';
    var tdnombre = '<td id = "' + idnombre + '"></td>';

    $('#items').append(tr);
    $('#' + idfila).append(tdnombre);
    $('#' + idnombre).html(cofres[tipoCofre].objetos[i]);

    var coger = '<td><button class = "botoncompraitem" id="btn' + i + '" onclick=cogerdeCofre(' + tipoCofre + ',' + i + ');>Coger</button></td>';
    $('#' + idfila).append(coger);
    if (itemsCofre[i] == false) {
      $('#btn' + i).attr("disabled", "true");
    }
  }
  $('#cofre').append('<button id = "volverjuegocofre" onclick = volverJuegoCofre();>Salir</button>');
}

/* Nos permite gestionr cuando cojemos un elemento del cofre*/
function cogerdeCofre(tipoCofre, item) {
  //En caso de ser el oro del cofre lo sumamos
  if (item == 0) {
    player.oro = player.oro + cofres[tipoCofre].objetos[item];
    itemsCofre[item] = false;
  } else {
    //Comprobamos si la mochila esta llena antes de assignar el objeto
    if (player.mochila.indexOf("") < 6 && player.mochila.indexOf("") > -1) {
      var objeto = getObjectByName(cofres[tipoCofre].objetos[item]);
      player.mochila[player.mochila.indexOf("")] = objeto;
      itemsCofre[item] = false;
    } else {
      $('#texto-juego').html('Tienes la mochila llena!');
    }
  }
  actualizaHUD();
  creaItemsCofre(tipoCofre);
}

/* Nos recarga el canvas del juego*/
function volverJuegoCofre() {
  $('#cofre').remove();
  $('#navegacion').append('<canvas id="visor" width="300" height="300"></canvas>');
  cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);

  accionTerminada = true;
}

/* Aprende el grito necesario para salir*/
function aprendeGrito() {
  //Comprovamos si se ha aprendido el alma
  if (player.estadoPartida.alma == true) {
    player.estadoPartida.grito = true;
    $('#texto-juego').html('Has aprendido el grito');
  } else {
    player.estadoPartida.grito = false;
    $('#texto-juego').html('Necesitas un alma de dragón para aprender el grito');
  }
}

/* Ejecuta el combate entre el jugador y el enemigo */
function combate(rival) {
  var huir = false;

  //Assignamos objetos al enemigo
  asignaObjetos(rival.objetos);

  if (rival.nombre != 'Alduin') {
    //Augmentamos sus estadisticas en funcion del nivel del jugador
    rival.vida = rival.vida + Math.floor(rival.vida * (player.nivel) / 10);
    rival.ataque = rival.ataque + Math.floor(rival.ataque * (player.nivel) / 4);
    rival.armadura = rival.armadura + Math.floor(rival.armadura * (player.nivel) / 4);
    rival.resistenciaMagica = rival.resistenciaMagica + Math.floor(rival.resistenciaMagica * (player.nivel) / 4);
  }

  //Comprobamos que el combate sea posible, sino, el jugador huye del combate
  if (player.tipoAtaque == 'AD' && player.ataque <= rival.armadura) {
    huir = true;
    accionTerminada = true;
    $('#texto-juego').html('Has huido del combate contra ' + rival.nombre);
  } else if (player.tipoAtaque == 'AP' && player.ataque <= rival.resistenciaMagica) {
    huir = true;
    accionTerminada = true;
    $('#texto-juego').html('Has huido del combate contra ' + rival.nombre);
  } else {
    //El combate es posible, ejecutamos la habilidad pasiva (si tiene)
    if (player.raza == 'bosmer') {
      setTimeout(bosmer.habilidad, 500, rival);
    }

    //Mostramos en el HUD las estadisticas del enemigo
    muestraHudEnemigo(rival);

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

  if (rival.vida >= dano) {
    rival.vida = rival.vida - dano;
  } else {
    dano = rival.vida;
    rival.vida = 0;
  }
  $('#texto-juego').html(player.nombre + ' inflinge ' + dano + ' de daño al ' + rival.nombre);

  //Augmentamos el turno
  cargasDunmer++;
  turno++;

  //Actualizamos la vida del enemigo en el HUD
  actualizaVidaEnemigo(rival);

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
  recogeObjetos(rival.objetos, rival.objetos[0]);

  if (player.raza == 'argoniano') {
    player.vida = player.vida + argoniano.habilidad(vidaPerdida);
  }

  //Comprobamos que el enemigo sea Alduin
  if (rival.nombre == 'Alduin') {
    player.estadoPartida.alma = true;
    rival.xp = 0;
  }

  //Augmentamos el numero de enemigos muertos
  player.estadoPartida.enemigosMuertos++;

  //Indicamos que ya nos podemos volver a mover
  accionTerminada = true;

  muestraHudMochila();
  creaMenuMochila();
  actualizaHUD();
}

/* Gestiona la derrota en un combate */
function derrotaCombate(rival) {
  $('#texto-juego').html(player.nombre + ' ha perdido el combate contra el ' + rival.nombre);
  setGameover(false);
}

/* Gestiona la experiencia y el nivel del jugador */
function augmentaXP(xp) {
  var maxnivel = 10 * player.nivel + 10 * (player.nivel - 1);
  var nivelesaugmentados = 0;
  while (player.xp + xp > maxnivel) {
    maxnivel = 10 * player.nivel + 10 * (player.nivel - 1);
    player.nivel++;

    //Augmentamos las estadisticas
    if (!(player.nivel % 2 == 0)) {
      player.ataque++;
    }
    player.armadura++;
    player.resistenciaMagica++;
    player.vidaMax = player.vidaMax + (player.nivel * 10);
    nivelesaugmentados++;
    xp = xp - maxnivel;

    //Restauramos el 50% de la vida restante
    player.vida = player.vida + Math.floor((player.vidaMax - player.vida) * 0.5);
  }

  if (nivelesaugmentados != 0) {
    actualizaHUD();
    $('#visor').remove();
    augmentaNivel(nivelesaugmentados);
  }
  player.xp = player.xp + xp;

  actualizaHUD();
}

/* Crea la tabla para seleccionar que atributo quieres mejorar*/
function augmentaNivel(nivelesaugmentados) {
  $('#navegacion').append('<div id = "mejora"></div>');
  $('#mejora').append('<h3>Que deseas mejorar?' + nivelesaugmentados + ' mejoras disponible</h3>');
  $('#mejora').append('<table id ="mejoras"></table>');
  $('#mejoras').append('<tr id ="fila1"></tr>');
  $('#fila1').append('<td><img class="imgmejora" src="./media/images/mejora.png" alt="mejoraVida" onclick="ejecutaMejora(0,' + nivelesaugmentados + ');"></td>');
  $('#fila1').append('<td><img class="imgmejora" src="./media/images/mejora.png" alt="mejoraVida" onclick="ejecutaMejora(1,' + nivelesaugmentados + ');"></td>');
  $('#fila1').append('<td><img class="imgmejora" src="./media/images/mejora.png" alt="mejoraVida" onclick="ejecutaMejora(2,' + nivelesaugmentados + ');"></td>');
  $('#fila1').append('<td><img class="imgmejora" src="./media/images/mejora.png" alt="mejoraVida" onclick="ejecutaMejora(3,' + nivelesaugmentados + ');"></td>');
  $('#mejoras').append('<tr id ="fila2"></tr>');
  $('#fila2').append('<td>Vida</td>');
  $('#fila2').append('<td>Ataque</td>');
  $('#fila2').append('<td>Armadura</td>');
  $('#fila2').append('<td>Resitencia Magica</td>');
}

/* Ejectua la mejora seleccionada*/
function ejecutaMejora(tipo, nivelesaugmentados) {
  nivelesaugmentados--;
  switch (tipo) {
    case 0:
      player.vida++;
      player.vidaMax++;
      break;
    case 1:
      player.ataque++;
      break;
    case 2:
      player.armadura++;
      break;
    case 3:
      player.resistenciaMagica++;
      break;
  }

  actualizaHUD();
  $('#mejora').remove();
  if (nivelesaugmentados == 0) {
    $('#navegacion').append('<canvas id="visor" width="300" height="300"></canvas>');
    cargaPosicion(player.estadoPartida.x, player.estadoPartida.y, player.estadoPartida.direccion);
  } else {
    augmentaNivel(nivelesaugmentados);
  }
}

/* Asigna objetos aleatorios en funcion del nivel a los enemigos */
function asignaObjetos(objetos) {
  var num, i;

  if (player.nivel >= 1 && player.nivel < 4) {
    //Un único objetos, de los más básicos
    objetos.push(objetoAleatorio('basico'));
  }

  if (player.nivel >= 4 && player.nivel < 6) {
    //Entre 1 y 2 objetos intermedios
    num = Math.floor(Math.random() * 2) + 1;

    for (i = 0; i < num; i++) {
      objetos.push(objetoAleatorio('intermedio'));
    }
  }

  if (player.nivel >= 6 && player.nivel < 9) {
    //Entre 2 y 4 objetos intermedios y poción pequeña
    num = Math.floor(Math.random() * 3) + 2;

    for (i = 0; i < num; i++) {
      objetos.push(objetoAleatorio('intermedio'));
    }
    objetos.push(pociones[0]);
  }

  if (player.nivel >= 9) {
    //Entre 2 y 4 objetos, de los más fuertes y poción
    num = Math.floor(Math.random() * 3) + 2;

    for (i = 0; i < num; i++) {
      objetos.push(objetoAleatorio('fuerte'));
    }
    objetos.push(pociones[1]);
  }

}

/* Devuelve un objeto aleatorio segun su tipo */
function objetoAleatorio(tipo) {
  var num = Math.floor(Math.random() * 3);
  var objeto;

  switch (num) {
    case 0:
      //Arma
      switch (tipo) {
        case 'basico':
          //Arma/Hechizo '0' o '1'
          if (player.tipoAtaque == 'AD') {
            objeto = armas[Math.floor(Math.random() * 2)];
          } else {
            objeto = hechizos[Math.floor(Math.random() * 2)];
          }
          break;
        case 'intermedio':
          //Arma/Hechizo '2' o '3'
          if (player.tipoAtaque == 'AD') {
            objeto = armas[Math.floor(Math.random() * 2) + 2];
          } else {
            objeto = hechizos[Math.floor(Math.random() * 2) + 2];
          }
          break;
        case 'fuerte':
          //Arma/Hechizo '4' o '5'
          if (player.tipoAtaque == 'AD') {
            objeto = armas[Math.floor(Math.random() * 2) + 3];
          } else {
            objeto = hechizos[Math.floor(Math.random() * 2) + 3];
          }
          break;
      }
      return objeto;
    case 1:
      //Escudo
      switch (tipo) {
        case 'basico':
          objeto = escudos[0];
          break;
        case 'intermedio':
          //Escudo '1' o '2'
          objeto = escudos[Math.floor(Math.random() * 2) + 1];
          break;
        case 'fuerte':
          objeto = escudos[3];
          break;
      }
      return objeto;
    case 2:
      //Armadura
      switch (tipo) {
        case 'basico':
          objeto = armaduras[0];
          break;
        case 'intermedio':
          //Armaduras '1' o '2'
          objeto = armaduras[Math.floor(Math.random() * 2) + 1];
          break;
        case 'fuerte':
          objeto = armaduras[3];
          break;
      }
      return objeto;
  }
}

/* Gestiona la recogida de objetos de un enemigo */
function recogeObjetos(objetos, oro) {
  var i = 1;

  //Añadir objetos a la mochila
  while (player.mochila.indexOf('') < 7 && player.mochila.indexOf('') != -1 && i < objetos.length) {
    player.mochila[player.mochila.indexOf('')] = objetos[i];
    i++;
  }

  //Eliminamos los objetos del enemigo
  while (objetos.length > 1) {
    objetos.pop();
  }

  //Añadimos el oro
  if (player.raza == 'imperial') {
    player.oro = player.oro + imperial.habilidad(oro);
  } else {
    player.oro = player.oro + oro;
  }
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
  accionTerminada = false;
  //Cargamos las partidas guardadas
  $.when(creaSlots()).done(function() {
    //Mostramos el menu de guardar partida
    $('#menu-guardar').css({
      'left': ($(window).width() / 2 - $('#menu-guardar').width() / 2) + 'px',
      'top': ($(window).height() / 2 - $('#menu-guardar').height() / 2) + 'px'
    });
    $('#menu-guardar').css('display', 'block');

  });
}

/* Comprueba los slots */
function creaSlots() {
  var url = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d';

  return $.get(url, function(data) {
    var slots = JSON.parse(data);
    if (slots[1] == 1) {
      //Obtenemos el nombre del slot 1
      var urlGet1 = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=1';
      $.get(urlGet1, function(data) {
        var slot = JSON.parse(data);
        //Rellenamos el nombre del slot
        $('#nombre-slot1').html(slot.nombre);
      });
    } else {
      $('#nombre-slot1').html('Slot 1 (vacío)');
    }

    if (slots[1] == 2 || slots[2] == 2) {
      //Obtenemos el nombre del slot 2
      var urlGet2 = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=2';
      $.get(urlGet2, function(data) {
        var slot = JSON.parse(data);
        //Rellenamos el nombre del slot
        $('#nombre-slot2').html(slot.nombre);
      });
    } else {
      $('#nombre-slot2').html('Slot 2 (vacío)');
    }
  });
}

/* Elimina el slot seleccionado */
function eliminaSlot(slot) {
  return $.ajax({
    url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=' + slot,
    type: 'DELETE',
    success: function(result) {
      guardarPartida();
    },
    error: function() {
      console.log('Error: No existe ninguna partida en el slot \'' + slot + '\'');
    }
  });
}

/* Guarda el slot seleccionado */
function guardaSlot(slot) {
  var nombre = $('#nombre-partida').val();

  if (nombre != '') {
    var url = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=' + slot;

    //Actualizamos la informacion del jugador
    partida.player = player;

    //Le damos un nombre a la partida
    partida.nombre = nombre;

    //Subimos el json
    $.ajax({
      type: 'POST',
      url: url,
      data: {
        json: JSON.stringify(partida)
      },
      success: function() {
        $('#menu-guardar').css('display', 'none');
        accionTerminada = true;
        alert('Partida guardada');
      },
      error: function() {
        console.log('Error: El slot \'' + slot + '\' esta ocupado');
      }
    });
  } else {
    $('#texto-guardar').html('Introduce un nombre para poder guardar');
  }
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
  $('.barra-vida').children('progress').attr('value', player.vida);
  $('.barra-vida').children('progress').attr('max', player.vidaMax);
}

/* Actualiza el nivel del hud */
function actualizaNivel() {
  $('.barra-nivel').children('p').html(player.nivel);
  $('.barra-nivel').children('progress').attr('value', player.xp);
  $('.barra-nivel').children('progress').attr('max', 10 * player.nivel + 10 * (player.nivel - 1));
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
    id = '#objeto' + (i + 1);
    if (player.mochila[i] != '') {
      $(id).attr('src', './media/images/' + player.mochila[i].img);
    } else {
      $(id).attr('src', './media/images/objeto_vacio.png');
    }
  }
}

/* Actualiza los objetos equipados en el HUD */
function actualizaEquipo() {
  if (player.manoizquierda != '') {
    $('#mano-izq').attr('src', './media/images/' + player.manoizquierda.img);
  } else {
    $('#mano-izq').attr('src', './media/images/objeto_vacio.png');
  }

  if (player.manoderecha != '') {
    $('#mano-der').attr('src', './media/images/' + player.manoderecha.img);
  } else {
    $('#mano-der').attr('src', './media/images/objeto_vacio.png');
  }

  if (player.cuerpo != '') {
    $('#cuerpo').attr('src', './media/images/' + player.cuerpo.img);
  } else {
    $('#cuerpo').attr('src', './media/images/objeto_vacio.png');
  }
}

/* Actualiza la vida del enemigo */
function actualizaVidaEnemigo(rival) {
  $('#vida-enemigo').html(rival.vida);
}

/* Devuelve la un objeto a partir de su nombre */
function getObjectByName(nombre) {
  var obj;

  //Buscamos en las armas
  for (obj of armas) {
    if (obj.nombre == nombre) {
      return obj;
    }
  }

  //Buscamos en los escudos
  for (obj of escudos) {
    if (obj.nombre == nombre) {
      return obj;
    }
  }

  //Buscamos en las armaduras
  for (obj of armaduras) {
    if (obj.nombre == nombre) {
      return obj;
    }
  }

  //Buscamos en las pociones
  for (obj of pociones) {
    if (obj.nombre == nombre) {
      return obj;
    }
  }

  //Buscamos en las botas
  for (obj of botas) {
    if (obj.nombre == nombre) {
      return obj;
    }
  }

  //Buscamos en los hechizos
  for (obj of hechizos) {
    if (obj.nombre == nombre) {
      return obj;
    }
  }

  return undefined;
}

/* Muestra las estadisticas del enemigo en el HUD */
function muestraHudEnemigo(rival) {

  $($('.lista-objetos')[0]).html('<div id="hud-enemigo"></div>');
  $('#hud-enemigo').append('<h4>' + rival.nombre + '</h4>');
  $('#hud-enemigo').append('<p>Vida: <span id="vida-enemigo">' + rival.vida + '</span></p>');
  $('#hud-enemigo').append('<p>Ataque: ' + rival.ataque + '</p>');
  $('#hud-enemigo').append('<p>Tipo de daño: ' + rival.tipoAtaque + '</p>');
  $('#hud-enemigo').append('<p>Armadura: ' + rival.armadura + '</p>');
  $('#hud-enemigo').append('<p>Resistencia magica: ' + rival.resistenciaMagica + '</p>');
}

/* Muestra la mochila del jugador en el HUD */
function muestraHudMochila() {
  $($('.lista-objetos')[0]).html('<h4>Mochila</h4><div><img id="objeto1" src="./media/images/objeto_vacio.png" alt="objeto 1" width="100" height="100"><img id="objeto2" src="./media/images/objeto_vacio.png" alt="objeto 2" width="100" height="100"><img id="objeto3" src="./media/images/objeto_vacio.png" alt="objeto 3" width="100" height="100"></div><div><img id="objeto4" src="./media/images/objeto_vacio.png" alt="objeto 4" width="100" height="100"><img id="objeto5" src="./media/images/objeto_vacio.png" alt="objeto 5" width="100" height="100"><img id="objeto6" src="./media/images/objeto_vacio.png" alt="objeto 6" width="100" height="100"></div></div>');
}

/* Menu para gestionar la mochila */
function creaMenuMochila() {
  //Si hacemos click en un objeto, se mostrara el menu
  $('#objeto1').click(function(e) {
    if ($('#objeto1').attr('src') != './media/images/objeto_vacio.png') {
      $('#menu-mochila').css({
        'display': 'block',
        'left': e.pageX,
        'top': e.pageY
      });
      $('#origen-menu').html('0');
    }
  });

  $('#objeto2').click(function(e) {
    if ($('#objeto2').attr('src') != './media/images/objeto_vacio.png') {
      $('#menu-mochila').css({
        'display': 'block',
        'left': e.pageX,
        'top': e.pageY
      });
      $('#origen-menu').html('1');
    }
  });

  $('#objeto3').click(function(e) {
    if ($('#objeto3').attr('src') != './media/images/objeto_vacio.png') {
      $('#menu-mochila').css({
        'display': 'block',
        'left': e.pageX,
        'top': e.pageY
      });
      $('#origen-menu').html('2');
    }
  });

  $('#objeto4').click(function(e) {
    if ($('#objeto4').attr('src') != './media/images/objeto_vacio.png') {
      $('#menu-mochila').css({
        'display': 'block',
        'left': e.pageX,
        'top': e.pageY
      });
      $('#origen-menu').html('3');
    }
  });

  $('#objeto5').click(function(e) {
    if ($('#objeto5').attr('src') != './media/images/objeto_vacio.png') {
      $('#menu-mochila').css({
        'display': 'block',
        'left': e.pageX,
        'top': e.pageY
      });
      $('#origen-menu').html('4');
    }
  });

  $('#objeto6').click(function(e) {
    if ($('#objeto6').attr('src') != './media/images/objeto_vacio.png') {
      $('#menu-mochila').css({
        'display': 'block',
        'left': e.pageX,
        'top': e.pageY
      });
      $('#origen-menu').html('5');
    }
  });

  //Si hacemos click en una de las opciones, la ejecutamos y hacemos desaparecer el menu
  $('#menu-mochila').click(function(e) {
    var idObjeto = $('#origen-menu').text();

    if (e.target.id == 'equipar-objeto') {
      equiparObjeto(idObjeto);

    } else if (e.target.id == 'tirar-objeto') {
      //Eliminamos el objeto
      player.mochila[idObjeto] = '';
      actualizaMochila();
    }

    //Ocultamos el menu
    $("#menu-mochila").css('display', 'none');
  });
}

/* Equipa un objeto de la mochila */
function equiparObjeto(idObjeto) {
  var objeto = player.mochila[idObjeto];

  if ((/espada/i).test(objeto.nombre) || (/hacha/i).test(objeto.nombre)) {
    //Es un arma, miramos que mano derecha o mano izquierda esten libres
    if (player.manoderecha == '' && player.tipoAtaque == 'AD') {
      //Equipamos el objeto
      player.manoderecha = objeto;

      //Actualizamos las estadisticas correspondientes
      player.ataque = player.ataque + objeto.ataque;

      //Lo eliminamos de la mochila
      player.mochila[idObjeto] = '';

    } else if (player.manoizquierda == '' && player.tipoAtaque == 'AD') {
      player.manoizquierda = objeto;
      player.ataque = player.ataque + objeto.ataque;
      player.mochila[idObjeto] = '';

    } else {
      $('#texto-juego').html('No puedes equiparte el arma');
    }
  } else if ((/escudo/i).test(objeto.nombre)) {
    //Es un escudo, miramos que mano derecha o mano izquierda esten libres
    if (player.manoderecha == '') {
      player.manoderecha = objeto;
      player.armadura = player.armadura + objeto.armadura;
      player.mochila[idObjeto] = '';

    } else if (player.manoizquierda == '') {
      player.manoizquierda = objeto;
      player.armadura = player.armadura + objeto.armadura;
      player.mochila[idObjeto] = '';

    } else {
      $('#texto-juego').html('No puedes equiparte el escudo');
    }
  } else if ((/armadura/i).test(objeto.nombre) || (/capa/i).test(objeto.nombre)) {
    //Es una armadura, miramos que cuerpo este libre
    if (player.cuerpo == '') {
      player.cuerpo = objeto;
      player.armadura = player.armadura + objeto.armadura;
      player.resistenciaMagica = player.resistenciaMagica + objeto.resistenciaMagica;
      player.mochila[idObjeto] = '';

    } else {
      $('#texto-juego').html('No puedes equiparte la armadura');
    }
  } else if ((/poción/i).test(objeto.nombre)) {
    //Es una pocion
    var vidaRestante = player.vidaMax - player.vida;
    if (vidaRestante > objeto.curacion) {
      player.vida = player.vida + objeto.curacion;
    } else {
      player.vida = player.vidaMax;
    }
    player.mochila[idObjeto] = '';

  } else if ((/hechizo/i).test(objeto.img)) {
    //Es un hechizo, miramos que mano derecha o mano izquierda esten libres
    if (player.manoderecha == '' && player.tipoAtaque == 'AP') {
      player.manoderecha = objeto;
      player.ataque = player.ataque + objeto.ataque;
      player.mochila[idObjeto] = '';

    } else if (player.manoizquierda == '' && player.tipoAtaque == 'AP') {
      player.manoizquierda = objeto;
      player.ataque = player.ataque + objeto.ataque;
      player.mochila[idObjeto] = '';

    } else {
      $('#texto-juego').html('No puedes equiparte el hechizo');
    }
  }

  //Aplicamos pasiva de Nordico y Guardia Rojo
  if (player.raza == 'nordico') {
    player.ataque = player.ataque + nordico.habilidad(player.manoizquierda, player.manoderecha);
  }

  if (player.raza == 'guardiaRojo') {
    player.ataque = player.ataque + guardiaRojo.habilidad(player.manoizquierda, player.manoderecha);
  }

  actualizaHUD();
}

/* Crea el menu del equipo */
function creaMenuEquipo() {
  //Creamos los onclick en los 3 campos
  $('#mano-izq').click(function(e) {
    if ($('#mano-izq').attr('src') != './media/images/objeto_vacio.png') {
      $('#menu-equipo').css({
        'display': 'block',
        'left': e.pageX,
        'top': e.pageY
      });
      $('#id-equipo').html('manoizquierda');
    }
  });

  $('#cuerpo').click(function(e) {
    if ($('#cuerpo').attr('src') != './media/images/objeto_vacio.png') {
      $('#menu-equipo').css({
        'display': 'block',
        'left': e.pageX,
        'top': e.pageY
      });
      $('#id-equipo').html('cuerpo');
    }
  });

  $('#mano-der').click(function(e) {
    if ($('#mano-der').attr('src') != './media/images/objeto_vacio.png') {
      $('#menu-equipo').css({
        'display': 'block',
        'left': e.pageX,
        'top': e.pageY
      });
      $('#id-equipo').html('manoderecha');
    }
  });

  //Si hacemos click en una de las opciones, la ejecutamos y hacemos desaparecer el menu
  $('#menu-equipo').click(function(e) {
    var idObjeto = $('#id-equipo').text();

    if (e.target.id == 'desequipar-equipo') {
      desequiparObjeto(idObjeto);

    } else if (e.target.id == 'tirar-equipo') {
      //Eliminamos el objeto
      player[idObjeto] = '';
      actualizaEquipo();
    }

    //Ocultamos el menu
    $("#menu-equipo").css('display', 'none');
  });
}

/* Desequipa un objeto */
function desequiparObjeto(idObjeto) {
  var objeto = player[idObjeto];

  switch (idObjeto) {
    case 'manoizquierda':
      //Puede ser arma, escudo o hechizo
      desequipaMano(objeto, idObjeto);
      break;
    case 'cuerpo':
      //Solo puede ser una armadura
      if (player.mochila.indexOf('') < 7 && player.mochila.indexOf('') != -1) {
        //La mochila tiene slots vacios, añadimos el objeto
        player.mochila[player.mochila.indexOf('')] = objeto;

        //Actualizamos las estadisticas
        player.armadura = player.armadura - objeto.armadura;
        player.resistenciaMagica = player.resistenciaMagica - objeto.resistenciaMagica;

        //Eliminamos el objeto del equipo
        player.cuerpo = '';
      } else {
        $('#texto-juego').html('No puedes desequiparte, la mochila está llena');
      }

      break;
    case 'manoderecha':
      desequipaMano(objeto, idObjeto);
      break;
  }

  actualizaHUD();
}

/* Desequipa una mano del jugador */
function desequipaMano(objeto, mano) {
  if (player.mochila.indexOf('') < 7 && player.mochila.indexOf('') != -1) {
    //La mochila tiene slots vacios, añadimos el objeto
    player.mochila[player.mochila.indexOf('')] = objeto;

    //Actualizamos las estadisticas en funcion del tipo de objeto
    if ((/espada/i).test(objeto.nombre) || (/hacha/i).test(objeto.nombre) || (/hechizo/i).test(objeto.img)) {
      //Es un arma o hechizo
      player.ataque = player.ataque - objeto.ataque;

      //Aplicamos pasiva de Nordico y Guardia Rojo
      if (player.raza == 'nordico') {
        player.ataque = player.ataque - nordico.habilidad(player.manoizquierda, player.manoderecha);
      }

      if (player.raza == 'guardiaRojo') {
        player.ataque = player.ataque - guardiaRojo.habilidad(player.manoizquierda, player.manoderecha);
      }

    } else if ((/escudo/i).test(objeto.nombre)) {
      //Es un escudo
      player.armadura = player.armadura - objeto.armadura;

      //Aplicamos pasiva de Nordico y Guardia Rojo
      if (player.raza == 'nordico') {
        player.ataque = player.ataque - nordico.habilidad(player.manoizquierda, player.manoderecha);
      }

      if (player.raza == 'guardiaRojo') {
        player.ataque = player.ataque - guardiaRojo.habilidad(player.manoizquierda, player.manoderecha);
      }
    }

    //Eliminamos el objeto del equipo
    player[mano] = '';
  } else {
    $('#texto-juego').html('No puedes desequiparte, la mochila está llena');
  }
}

/* Pinta el minimapa */
function actualizaMapa() {
  var index, i = 0, j = 0, aux = 0;

  while (i < 10) {
    j = 0;
    while (j < 10) {
      aux = j;
      index = (i * 10) + j;
      if (mapa[i][aux] == 'X') {
        index = (i * 10) + j;
        $($('.mapa-fila').children()[index]).css('background-color', 'rgba(175,83,33, 0.5)');
      } else {
        $($('.mapa-fila').children()[index]).css('background-color', 'rgba(110,219,114, 0.5)');
      }

      if (player.estadoPartida.x == i && player.estadoPartida.y == aux) {
        $($('.mapa-fila').children()[index]).css('background-color', 'rgba(214,224,24, 0.5)');
      }
      j++;
    }
    i ++;
  }
}
