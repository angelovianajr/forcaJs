var erros;
var palavra;
var insert;
var palavraString;
var jogavel;
var numJogadas;
var letrasJogadas;
var muted;
var pontos;
var dificuldadeAtual;
var user = {};

function inicializar(){
	palavraString = palavra;
	pontos = 0;
	erros = 0;
	insert = '';
	jogavel = true;
	numJogadas = 0;
	letrasJogadas = [];
	muted = false;
	getDica();
	palavra = palavra.split('');
	user.nome = getURLParameter('nome');
	dificuldadeAtual = getURLParameter('dificuldade');
	user = obterJogador(user.nome);
	console.log(user);

	palavra.forEach(function(char) {
		if (char !== ' '){
			insert += '*';
		}else{
			insert += ' ';
		}
	});

	limiteErros = ( dificuldadeAtual === 'nunez' ) ? 2 : 5;
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
			dificuldadeAtual === 'nunez' ? user.pontos+=2 : user.pontos+=1;
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
	var audio = new Audio();
	if(erros === limiteErros){
		audio.src = 'resources/youlose.mp3';
		if(muted !== true)
			audio.play();
		fimDeJogo('derrota');
	}

	if (palavra === insert){
		fimDeJogo('vitoria');
		eliminaPalavraAcertada(palavraString);
	}
};

function eliminaPalavraAcertada(pala){
	var palavrasAcertadas = JSON.parse(localStorage.getItem(jogador));
	palavrasAcertadas.palavras.push(pala);
}

function getDica(){
	var index = parseInt(Math.random() * palavra.length);
	$('#dicaModal').append($('<a>').html('A palavra contém a letra: ' + palavra[index]));
};

function fimDeJogo(tipo){
	atualizarUser(user);

	if (tipo === 'vitoria'){
		location.replace('home.html?nome='+user.nome+'&dificuldade='+dificuldadeAtual+'&id='+user.id+'&pontos='+user.pontos);
		threadSleepAfeterRedirect('home.html');
	}

	if (tipo === 'derrota'){
		threadSleepAfeterRedirect('gameOver.html');
	}
};

var audio;
function playMusic(url){
	audio = new Audio();
	audio.src = url;
	audio.loop = true;
	audio.play();
};

function mute(){
	if (muted === true){
		muted = false;
		audio.muted = false;
	}
	else{
		muted = true;
		audio.muted = true;
	}
};

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
			if(muted !== true)
				audio.play();
			dificuldadeAtual === 'nunez' ? user.pontos += 20 : user.pontos += 10;
			fimDeJogo('vitoria');
		}else{
			audio.src = 'resources/chutefail.mp3';
			if(muted !== true)
				audio.play();
			fimDeJogo('derrota');
		}
	}
})

$('#btnDica').click(function(){ if(muted !== true) btnSound(); });
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
