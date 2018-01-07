var ficheroConfig;

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
window.onload = function() {

  //Cargamos la musica de esta pantalla
  cargaMusica("seleccion");
  //Leemos el fichero inicial
  var urlGet = 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=nueva';
  $.get(urlGet, function (data) {
    var ficheroInicial = JSON.parse(data);

    //Definimos las razas y mostramos la información inicial cuando la petición acabe
    $.when(defineRazas()).done(function() {
      cambioRaza();
      cambioRol();
      cambioSexo();
    });

    //Creamos los roles
    mago = new Rol(ficheroInicial.roles[0].nombre, ficheroInicial.roles[0].descripcion, ficheroInicial.roles[0].ataque, ficheroInicial.roles[0].armadura, ficheroInicial.roles[0].resistenciaMagica);

    asesino = new Rol(ficheroInicial.roles[1].nombre, ficheroInicial.roles[1].descripcion, ficheroInicial.roles[1].ataque, ficheroInicial.roles[1].armadura, ficheroInicial.roles[1].resistenciaMagica);

    tanque = new Rol(ficheroInicial.roles[2].nombre, ficheroInicial.roles[2].descripcion, ficheroInicial.roles[2].ataque, ficheroInicial.roles[2].armadura, ficheroInicial.roles[2].resistenciaMagica);

    ficheroConfig = ficheroInicial;
  });

  //Creamos los eventos
  $('#raza').change(function() {
    cambioRaza();
  });

  $('#rol').change(function() {
    cambioRol();
  });

  $('#sexo').change(function() {
    cambioSexo();
  });
};

function creaPersonaje() {
  var nombre = $('#nombre').val();
  var raza = $('#raza').val();
  var sexo = $('#sexo').val();
  var rol = $('#rol').val();

  //Comprobamos que el nombre sea valido
  if ((/^\w{3,12}$/).test(nombre)) {
    //Actualizamos los valores del jugador en función de su raza y rol
    var ataque, tipoAtaque, armadura, resistenciaMagica;
    var player = ficheroConfig.player;

    switch (rol) {
      case 'mago':
        tipoAtaque = 'AP';
        ataque = player.ataque + mago.ataque;
        armadura = player.armadura + mago.armadura;
        resistenciaMagica = player.resistenciaMagica + mago.resistencia;
        break;
      case 'asesino':
        tipoAtaque = 'AD';
        ataque = player.ataque + asesino.ataque;
        armadura = player.armadura + asesino.armadura;
        resistenciaMagica = player.resistenciaMagica + asesino.resistencia;
        break;
      case 'tanque':
        tipoAtaque = 'AD';
        ataque = player.ataque + tanque.ataque;
        armadura = player.armadura + tanque.armadura;
        resistenciaMagica = player.resistenciaMagica + tanque.resistencia;
        break;
    }

    switch (raza) {
      case 'altmer':
        if (tipoAtaque == 'AP') {
          ataque = ataque + 2;
        }
        break;
      case 'breton':
        if (tipoAtaque == 'AP') {
          ataque = ataque + 1;
        }
        resistenciaMagica = resistenciaMagica + 2;
        break;
      case 'guardiaRojo':
        armadura = armadura + 2;
        break;
    }
    //Actualizamos el JSON conla nueva información
    ficheroConfig.player.nombre = nombre;
    ficheroConfig.player.raza = raza;
    ficheroConfig.player.sexo = sexo;
    ficheroConfig.player.rol = rol;
    ficheroConfig.player.ataque = ataque;
    ficheroConfig.player.tipoAtaque = tipoAtaque;
    ficheroConfig.player.armadura = armadura;
    ficheroConfig.player.resistenciaMagica = resistenciaMagica;

    //Actualizamos el fichero de nueva partida con los datos
    $.when(eliminaJSON()).done(function() {
      $.ajax({
        type: 'POST',
        url: 'http://puigpedros.salleurl.edu/pwi/pac4/partida.php?token=0aee8310-0212-424d-b2b2-8e7771e4982d&slot=nueva',
        data: {json: JSON.stringify(ficheroConfig)},
        statusCode: {
         404: function () {
           console.log('Slot ocupat');
         }
        },
        success: function() {
          console.log('JSON inicial guardado correctamente');

          //Avanzamos hasta el juego
          location.href = 'juego.html?slot=nueva';
        }
      });
    });
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
  var sexo = $('#sexo').val();

  //Cambiamos la imagen del personaje
  var src = './media/images/' + raza + '_' + sexo +'.jpg';
  $('#visor-personaje').get(0).src=src;

  //Mostramos la información del nuevo raza
  $('#descripcion-raza').html(descripcionRaza(raza));
}

function cambioSexo() {
  var raza = $('#raza').val();
  var sexo = $('#sexo').val();

  //Cambiamos la imagen del personaje
  var src = './media/images/' + raza + '_' + sexo +'.jpg';
  $('#visor-personaje').get(0).src=src;
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
