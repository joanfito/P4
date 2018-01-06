
var musica = {
  c1:'media/music/DragonBorn.mp3',
  c2:'media/music/FromPastToPresent.mp3',
  c3:'media/music/WatchTheSkies.mp3',
  c4: 'media/music/masser.mp3'
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
    case "juego":
      music.src = musica.c4;
      break;
  }
  music.setAttribute('loop','true');
  music.id = "backgroundmusic";
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

function playMusic(){
  var canco = document.getElementById('backgroundmusic');
  canco.play();
}

function cambiaMusica(num){
  var canco = document.getElementById('backgroundmusic');
  canco.src = musica[num];
  canco.play();
}
