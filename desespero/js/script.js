var dificuldade;
var limiteErros;
var jogador;
var dif;
var erros;
var palavra;
var insert;
var jogavel;
var numJogadas;
var letrasJogadas;
var muted;
var pontos;

//===========================================================
$('#btnSubmit').click(function() {
  var nome = $('#userName').val();
  dif = $('input[name="radioOptions"]:checked').val();
  if (nome !== '' && typeof dif !== 'undefined'){
    btnSound();
    inserirUsuario(nome, dif, 0);
    threadSleepAfeterRedirect('jogo.html', 1000);
  }

    limiteErros = ( dificuldade === 'nunez' ) ? 2 : 5;
});

$('#btnCont').click(function(){
  btnSound();
  threadSleepAfeterRedirect('index.html', 1000);
});

$('#btnLeader').click(function(){ btnSound(); })
$('#btnComoJogar').click(function(){ btnSound(); });


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

$('#btnMute').click(function(){
	mute();
});

//============================================================

function inicializar(){
  pegarPalavra();
	pontos = 0;
	erros = 0;
	insert = '';
	jogavel = true;
	numJogadas = 0;
	letrasJogadas = [];
	muted = false;
  dif === 'nunez' ? limiteErros=2 : limiteErros=5;
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
			dif === 'nunez' ? pontos+=2 : pontos++;
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
window.addEventListener('load', playMusic('resources/MainTheme.mp3'));

function redirectPage(linkLocation, num) {
  if(!num){
    $('body').fadeOut(num);
  }
  window.location = linkLocation;
};

function inserirUsuario(nome, dif, valor){

  localStorage["usuarios"] = JSON.stringify({
    "nome": nome,
    "pontos":valor
  });

   $.post('http://localhost:3000/usuarios',
    {
      "nome": nome,
      "dificuldade":dif,
      "pontos":valor
    });

   location.replace('home.html?nome='+nome+'&dificuldade='+dif);
};

function pegarPalavra(){
  $.get('http://localhost:3000/palavras').done(function(data){
    var palavrasDisponiveis;
    if( dificuldade === 'nunez' ){
      palavrasDisponiveis = data.filter(function(elem){
        return elem.texto.length >= 12;
      });
    }else{
      palavrasDisponiveis = data;
    }
    var index = parseInt(Math.random() * palavrasDisponiveis.length);
    palavra = palavrasDisponiveis[index].texto;
  });
};

function getLeaderboard(){
  var users = [];
  var top;
  $.get('http://localhost:3000/usuarios').done(function(data){
     users = data;
  });

  users.sort(function(a, b){
      return a.pontos < b.pontos;
  });

  users.forEach(function(user){
     $('#leaderModal').append($('<h2>').html(user.nome + ' - ' + user.pontos));
  });

};

function threadSleepAfeterRedirect(url, milsec){
  setTimeout(function(){
    redirectPage(url, 2000);
  }, milsec || 1500);
};

function btnSound(){
  var audio = new Audio();
  audio.src = 'resources/btn.mp3';
  audio.play();
}

$(document).ready(function() {
  $("body").css("display", "none");
  $("body").fadeIn(1000);
});
