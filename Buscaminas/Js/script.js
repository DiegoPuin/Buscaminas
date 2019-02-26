var minas = [];
var puntaje = 0;
var puntajeFinal = 0;
var contadorfinal = 0;
var contadorAbriertos = 0;
var dimension = 0;
var cantidadMinas = 0;

function inicializaMatriz() {
	var tabla = [];
	for (var i=0; i<dimension; i++) {
		if(dimension == 8){
			tabla[i] = [0, 0, 0, 0, 0, 0, 0, 0];
		}
		if(dimension == 16){
			tabla[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		}
		if(dimension == 24){
			tabla[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		}
	}
	return tabla;
}

function crearTablero() {
	for (var i=0; i<dimension; i++) {
		for (var j=0; j<dimension; j++) {
			var div = document.createElement("div");
			div.id = i + "" + j;
			div.addEventListener("click", mostrarNumero, true);
			tablerominas.appendChild(div);
		}
	}
}

function mostrarNumero(e) {
	var auxstr = this.id.split("");
	var myid = auxstr[0] + auxstr[1];
	divObj = document.getElementById(myid);

	if (minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] == 0) {
		divObj.style.backgroundColor = "white";
		abrirAlrededor(parseInt(auxstr[0], 10), parseInt(auxstr[1], 10), minas);

	} else {
		if (minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] != "*") {
			document.getElementById(myid).innerHTML = "<p style='margin-top:10px;'>" + minas[parseInt(auxstr[0], 10)][parseInt(auxstr[1], 10)] + "</p>";
			divObj.style.backgroundColor = "white";
			var p = 10;
			puntaje = puntaje + 10;
			puntuar();
		} else {
			divObj.style.backgroundImage = "url(img/bomba.jpg)";
			abrirTablero(minas);
			puntaje = puntaje - 500;
			puntuar();
			var a = puntaje;
			puntajeFinal = a;
			puntuarFinal();
		}
	}
}

function bombasAlrededor(tablero) {
	for (var i=0; i<dimension ; i++) {
		for (var j=0; j<dimension; j++) {
			if (tablero[i][j] == "*") {
				if (i == 0 && j == 0) {
					colocaNumeroBombas(i, j, i + 1, j + 1, tablero);
				}
				else if (i == 0 && (j > 0 && j < 7)) {
					colocaNumeroBombas(i, j - 1, i + 1, j + 1, tablero);
				}
				else if (i == 0 && j == dimension-1) {
					colocaNumeroBombas(i, j - 1, i + 1, j, tablero);
				}
				else if (j == dimension-1 && (i > 0 && i < dimension-1)) {
					colocaNumeroBombas(i - 1, j - 1, i + 1, j, tablero);
				}
				else if (i == dimension-1 && j == dimension-1) {
					colocaNumeroBombas(i - 1, j - 1, i, j, tablero);
				}
				else if (i == dimension-1 && (j > 0 && j < dimension-1)) {
					colocaNumeroBombas(i - 1, j - 1, i, j + 1, tablero);
				}
				else if (i == dimension-1 && j == 0) {
					colocaNumeroBombas(i - 1, j, i, j + 1, tablero);
				}
				else if (j == 0 && (i > 0 && i < dimension-1)) {
					colocaNumeroBombas(i - 1, j, i + 1, j + 1, tablero);
				} else {
					colocaNumeroBombas(i - 1, j - 1, i + 1, j + 1, tablero);
				}
			}
		}
	}
}

function colocaNumeroBombas(vari, varj, fini, finj, tablero) {
	for (var i = vari; i <= fini; i++) {
		for (var j = varj; j <= finj; j++) {
			if (tablero[i][j] != "*") {
				tablero[i][j] = (parseInt(tablero[i][j]) + 1);
			}
		}
	}
}

function generarBombas(tablero) {
	fil = Math.floor(Math.random() * dimension);
	col = Math.floor(Math.random() * dimension);
	for (var i=0; i<cantidadMinas; i++) {
		while (tablero[fil][col] == "*") {
			fil = Math.floor(Math.random() * dimension);
			col = Math.floor(Math.random() * dimension);
		}
		tablero[fil][col] = "*";
	}
}

function abrirCeros(vari, varj, fini, finj, cori, corj, tablero) {
	for (var i = vari; i <= fini; i++) {
		for (var j = varj; j <= finj; j++) {
			var myid = i + "" + j;
			var objDiv = document.getElementById(myid)
			if (objDiv.textContent == "") {
				if (tablero[i][j] == 0) {
					if (i == cori && j == corj) {
						objDiv.textContent = "";
						objDiv.style.backgroundColor = "white";
					} else {
						if (objDiv.style.backgroundColor != "white") {
							abrirAlrededor(i, j, tablero);
						}
					}
				} else {
					if (tablero[i][j] != "*") {
						document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + tablero[i][j] + "</p>";
						objDiv.style.backgroundColor = "white";

					}
				}
			}
		}
	}
}

function abrirAlrededor(xi, xj, tablero) {
	if (xi == 0 && xj == 0) {
		abrirCeros(xi, xj, xi + 1, xj + 1, xi, xj, tablero);
		puntaje = puntaje + 50;
	}
	else if (xi == 0 && (xj > 0 && xj < dimension-1)) {
		abrirCeros(xi, xj - 1, xi + 1, xj + 1, xi, xj, tablero);
		puntaje = puntaje + 50;
	}
	else if (xi == 0 && xj == dimension-1) {
		abrirCeros(xi, xj - 1, xi + 1, xj, xi, xj, tablero);
		puntaje = puntaje + 50;
	}
	else if (xj == dimension-1 && (xi > 0 && xi < dimension-1)) {
		abrirCeros(xi - 1, xj - 1, xi + 1, xj, xi, xj, tablero);
		puntaje = puntaje + 50;
	}
	else if (xi == dimension-1 && xj == dimension-1) {
		abrirCeros(xi - 1, xj - 1, xi, xj, xi, xj, tablero);
		puntaje = puntaje + 50;
	}
	else if (xi == dimension-1 && (xj > 0 && xj < dimension-1)) {
		abrirCeros(xi - 1, xj - 1, xi, xj + 1, xi, xj, tablero);
		puntaje = puntaje + 50;
	}
	else if (xi == dimension-1 && xj == 0) {
		abrirCeros(xi - 1, xj, xi, xj + 1, xi, xj, tablero);
		puntaje = puntaje + 50;
	}
	else if (xj == 0 && (xi > 0 && xi < dimension-1)) {
		abrirCeros(xi - 1, xj, xi + 1, xj + 1, xi, xj, tablero);
		puntaje = puntaje + 50;
	} else {
		abrirCeros(xi - 1, xj - 1, xi + 1, xj + 1, xi, xj, tablero);
		puntaje = puntaje + 50;
	}
	puntuar();
}

function abrirTablero(tablero) {
	for (var i=0; i<dimension; i++) {
		for (var j=0; j<dimension; j++) {
			var myid = i + "" + j;
			var objDiv = document.getElementById(myid);
			if (tablero[i][j] == "*") {
				objDiv.style.backgroundImage = "url(Img/bomba.jpg)";
			}
		}
	}
}

function recargar() {
	location.reload();
}

function puntuar() {
	var point = document.getElementById("puntuacion");
	point.innerHTML = "Puntuacion:" + puntaje;
}

function puntuarFinal() {
	var pFinal = document.getElementById("puntuacionFinal");
	pFinal.innerHTML = "Puntuacion Final:" + puntajeFinal;
	if (contadorfinal == 1) {
		var el = document.getElementById("puntuacion"); //se define la variable "el" igual a nuestro div
		el.style.display = (el.style.display == 'none') ? 'block' : 'none';
	}
	contadorfinal = +1;
}

function describirNivel(nivel){
	if(nivel==1){
		dimension = 8;
		cantidadMinas = 10;
	}
	if(nivel==2){
		dimension = 16;
		cantidadMinas = 40;
	}
	if(nivel==3){
		dimension = 24;
		cantidadMinas = 100;
	}
}

function tiempoJuego(){
	var s = 0;
	var t = document.getElementById("tiempoJuego");
	t.innerHTML = "Tiempo de Juego: 10 seg";
	// window.setInterval(function(){
	// 	t.innerHTML = "Tiempo de juego: " = s;
	// 	s++;
	// },1000);
}

function cantidadMinas(){
	var texto = document.getElementById("cantidadMinas");
	texto.innerHTML = "Cantidad De Minas:" + cantidadMinas;
}

function cargarTablero(nivel) {
	describirNivel(nivel);
	minas = inicializaMatriz();
	crearTablero();
	generarBombas(minas);
	bombasAlrededor(minas);
	puntuar();
	puntuarFinal();
}	