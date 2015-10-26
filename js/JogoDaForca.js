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
var tempo;
var user = {};

function inicializar(){
	palavraString = palavra;
	pontos = 0;
	erros = 0;
	insert = '';
	jogavel = false;
	numJogadas = 0;
	letrasJogadas = [];
	muted = false;
	getDica();
	palavra = palavra.split('');
	user.nome = getURLParameter('nome');
	dificuldadeAtual = getURLParameter('dificuldade');
	user = obterJogador(user.nome);

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
	setTimeout(function(){jogavel = true;}, 1000);
	dificuldadeAtual === 'normal' ? tempo = 60000 : tempo = 30000;
	correrTempo();
};

function jogada (letra) {
	var i = 0;
	var erro = true;
	var music = new Audio();
	letrasJogadas[numJogadas] = letra;
	palavra = palavra.split('');
	insert = insert.split('');

	palavra.forEach(function (letraPalavra) {
		if (letraPalavra === letra){
			user.pontos += dificuldadeAtual === 'nunez' ? 2 : 1;
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
	}
};

function eliminaPalavraAcertada(pala){
	var palavrasAcertadas = JSON.parse(localStorage.getItem(user.nome));
	palavrasAcertadas.palavras.push(pala);
	localStorage.setItem(user.nome, JSON.stringify(palavrasAcertadas));
}

function getDica(){
	var index = parseInt(Math.random() * palavra.length);
	$('#dicaModal').append($('<a>').html('A palavra contém a letra: ' + palavra[index]));
};

function correrTempo(){
	if (tempo >= 0){
		segundos = (tempo / 1000) % 60;
		if (segundos < 10){
			segundos = '0' + segundos;
		}

		tempo -= 1000;
		$('.label').html(segundos);
		if (tempo === 0){	
			audio.src = 'resources/youlose.mp3';
			if(muted !== true)
				audio.play();
			alert('Time out! Você perdeu!');
			fimDeJogo('derrota');
		}
	}

	setTimeout('correrTempo()', 1000);
}

function fimDeJogo(tipo){
	atualizarUser(user.id, { "pontos":user.pontos });

	if (tipo === 'vitoria'){
		eliminaPalavraAcertada(palavra);
		setTimeout(function(){
			location.replace('home.html?nome='+user.nome+'&dificuldade='+dificuldadeAtual+'&id='+user.id+'&pontos='+user.pontos);
			threadSleepAfeterRedirect('home.html');
		}, 1000);
	}

	if (tipo === 'derrota'){
		localStorage.setItem(user.nome, JSON.stringify({"palavras":[]}));
		threadSleepAfeterRedirect('gameOver.html');
	}
};

$('#btnChute').click(function(){
	var chute = $('#txtChute').val();
	var audio = new Audio();
	if (chute !== ''){
		if (chute === palavra){
			user.pontos += dificuldadeAtual === 'nunez' ? 20 : 10;
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
