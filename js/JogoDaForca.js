var erros;
var palavra;
var insert;
var jogavel;
var numJogadas;
var letrasJogadas;
var muted;

function inicializar(){
	erros = 0;
	insert = '';
	jogavel = true;
	numJogadas = 0;
	letrasJogadas = [];
	muted = false;
	getDica();
	palavra = palavra.split('');

	palavra.forEach(function(char) {
		if (char !== ' '){
			insert += '*';
		}else{
			insert += ' ';
		}	
	});

	palavra = palavra.join('');
	$('body').append($('h2').html(insert));
};

function jogada (letra) {
	var i = 0;
	var erro = true;
	var music = new Audio();
	letrasJogadas[numJogadas] = letra;
	palavra = palavra.split('');
	insert = insert.split('');

	palavra.forEach(function (let) {
		if (let === letra){
			music.src = 'resources/coin.mp3';
			if(muted !== true)
				music.play();
			insert[i] = letra;
			erro = false;
		}

		i++;
	});

	if(erro === true){
		music.src = 'resources/error.mp3';
		if(muted !== true)
			music.play();
	    erros++;
	  	$('p').append($('#err').html(erros));
	}

	numJogadas++;
	insert = insert.join('');
	palavra = palavra.join('');
	$('h2').empty();
	$('body').append($('h2').html(insert));
	$('label').append($('h1').html(letrasJogadas + ''));
	$('#btnDica').disabled = true;
	verifica();
};

function verifica () {
	if(erros === limiteErros){
		threadSleepAfeterRedirect('gameOver.html');
	}

	if (palavra === insert){
		threadSleepAfeterRedirect('home.html');
	}
};

function getDica(){
	var index = parseInt(Math.random() * palavra.length);
	$('#dicaModal').append($('<a>').html('A palavra contém a letra: ' + palavra[index]));
};

var audio;
function playMusic(url){
	audio = new Audio();
	audio.src = url;
	audio.loop = true;
	audio.play();
}

function mute(){
	if (muted === true){
		muted = false;
		audio.muted = false;
	}
	else{
		muted = true;
		audio.muted = true;
	}
}

$('#btnMute').click(function(){
	mute();
});

window.addEventListener('load', playMusic('resources/MainTheme.mp3'));


$('#btnChute').click(function(){
	var chute = $('#txtChute').val();
	var audio = new Audio();
	if (chute !== ''){
		if (chute === palavra){
			audio.src = '';
			threadSleepAfeterRedirect('home.html');
		}else{
			audio.src = 'resources/chutefail.mp3';
			if(muted !== true)
				audio.play();
			threadSleepAfeterRedirect('gameOver.html');
		}
	}
})

$('#txtChute').focus(function(){jogavel = false;});
$('#txtChute').blur(function(){jogavel = true;});

$('body').keypress(function(e){
	if(jogavel === true){
		var letra = String.fromCharCode(e.which);
		letra = letra.toLowerCase();
		if(!letra.search(/^[a-z]+$/)){
			if (letrasJogadas.indexOf(letra) === -1){
				jogada(letra);
			}
		}
	}
});
$('body').keyup(function(e){
    console.log('keyup', String.fromCharCode( e.which ));
});
