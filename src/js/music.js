
var musica = {
  c1:'media/music/DragonBorn.mp3',
  c2:'media/music/FromPastToPresent.mp3',
  c3:'media/music/WatchTheSkies.mp3'
};



function cargaMusica(pantalla){
  var music = document.createElement ('audio');
  switch (pantalla){
    case "index":
      music.src = musica.c1;
    break;
    case "seleccion":
      music.src = musica.c2;
    break;
    case "cargaPartida":
      music.src = musica.c3;
    break;
  }
  music.id = "backgroundmusic"; //En caso que queramos hacer pausas, stop, etc, sino se puede quitar
  document.getElementById('musicaindex').appendChild(music);
  music.play();
}

function pauseMusic(){
  var canco = document.getElementById('backgroundmusic');
  canco.pause();
}

function stopMusic(){
  var canco = document.getElementById('backgroundmusic');
  canco.stop();
}
