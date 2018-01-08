# P4 - DUNGEON MASTER AJAX GAME

Práctica 4 de la asignatura Proyectos Web I

## Funcionamiento

### Funcionamiento ‘pre-juego’

Para iniciar el juego se debe acceder a index.html, ahí se encuentran dos opciones, nueva partida y carga partida.
Si se accede a nueva partida, se reproducirá un video de introducción y cuando termine se cargará el menú de selección (seleccion.html).
En esta pantalla se puede elegir la configuración deseada para nuestro personaje. Hay tres campos a elegir: raza, sexo y rol. Mientras que sexo es únicamente estético, las diferentes razas y roles aportan diferentes jugabilidades.
Si accedemos a cargar partida, se nos mostraran los dos slots de los que disponemos, junto con información sobre la partida en cuestión.

### Funcionamiento general del juego

Para pasarte el juego tienes que encontrar la puerta de salida, que requiere una ‘llave’. Para conseguir la ‘llave’, deberás encontrar y derrotar a Alduin, el jefe final del juego, que se encuentra en nivel -5.
Una vez derrotado, conseguirás una ‘alma de dragón’, la cual es necesaria para aprender el grito (la llave). Éste se encuentra en una pared justo detrás de Alduin

En el juego te encontraras con diferentes enemigos que derrotar, tiendas donde podrás equiparte con mejores armas y armaduras, cofres donde te encontrarás valiosos objetos y portales que te ahorraran camino.

### Funcionamiento del movimiento

Puedes moverte con los botones incorporados en el HUD, o con el teclado:
* W: Movimiento hacia delante
* A: Movimiento hacia la izquierda
* S: Movimiento hacia atras
* D: Movimiento hacia derecha
* Q: Girar la cámara hacia la izquierda
* E: Girar la cámara hacia la derecha

### Funcionamiento del mapa

Puedes mostrar el mapa del nivel pulsando la letra 'M' del teclado.
Únicamente podras diferenciar donde hay paredes, tu posición y por donde puedes caminar.
Para cerrarlo, vuelve a pulsar 'M' o 'ESC'.

### Funcionamiento del combate

Siempre que sea posible  que el jugador derrote al enemigo, se empezará un combate, en caso contrario el jugador huirá.
El combate se realiza automáticamente, primero ataca el jugador y luego el enemigo. En el menú de la derecha se pueden ver las estadísticas en tiempo real del combate.
Al terminar, en caso de victoria del jugador, éste recibirá los objetos del enemigo, así como oro y experiencia.

Hay dos tipos de daño: mágico, que se contrarresta con resistencia mágica y físico, que se contrarresta con armadura.

### Funcionamiento del nivel

Al subir de nivel aparecerá un menú donde se podrá subir un punto adicional por cada nivel subido en una de las estadísticas principales (ataque/vida/armadura/resistencia mágica).

### Funcionamiento de los objetos

Para equipar los objetos que compres o que quites a los enemigos muertos, tienes que hacer ‘click’ sobre la imagen del objeto, al pulsar se abrirá un menú con dos opciones: equipar (si hay sitio en el equipo del jugador, pasará de la mochila a los objetos ‘activos’) i tirar (el objeto desaparece).

Para desequipar o tirar un objeto ‘activo’, el funcionamiento es el mismo.

Para cerrar la ventana, realiza una acción o pulsa 'ESC'.

La mochila dispone de un total de 6 huecos y el equipo del jugador de 3 (mano izquierda, cuerpo y mano derecha).

### Funcionamiento del guardado de partida

Para guardar partida, deberás pulsar en el botón ‘G’ del HUD, o la tecla G del teclado.
Se abrirá un menú donde podrás guardar la partida, añadiéndole un nombre, en uno de los dos slots.
El slot debe estar vacío, si no, antes se tendrá que borrar y después guardar.
Para cerrar la ventana, guarda partida o pulsa 'ESC'.

### Leyenda mapa

* V:  Espacio vacío
* X:  Pared
* O:  Transporte 1
* P:  Transporte 2
* S:  Puerta subir nivel
* B:  Puerta bajar nivel
* F:  Puerta final
* T:  Tienda
* C<x>:  Cofre
* J:  Alduin
* E:  Enemigo asesino
* M:  Enemigo mago
* G:  Enemigo tanque
* A:  Pared grito

### Extras

Movimiento: Moverse izquierda/derecha (sin girar) y movimiento con teclado.

Objetos: Armas, escudos, hechizos, pociones, etc.

Lucha: Huir si el combate es imposible de ganar + poder esquivar  si eres de raza khajita + HUD información jugador / enemigo en tiempo real.

Nivel/XP: Punto adicional por cada nivel, con un menú en pantalla para gestionarlo.

Jugabilidad: Razas, roles, tiendas, cofres, jefe final, llave para poder salir, etc.

Información de datos: HUD mejorado que muestra las imágenes de los objetos de mochila / equipo y permite gestionar los objetos pulsando encima de ellos. También dispones de un mapa del nivel.

Diseño: video de introducción, música de fondo en las diferentes pantallas, pantalla de gameover, texto que informa sobre las acciones del juego, etc.

Nivel mazmorra: portales para saltar diversos niveles.

## Autores
[Joan Fitó Martínez](https://github.com/joanfito) - joan.fito.2015

[Adrián Garcia Garrido](https://github.com/adrig-geek) - adrian.garcia.2015

[Marc Salinero Roig](https://github.com/SlamMark) - marc.salinero.2015
