var erros;
var palavra;
var insert;
var jogavel;
var jog;
var letrasJogadas;


function inicializar(){
	erros = 0;
	insert = '';
	jogavel = true;
	jog = 0;
	letrasJogadas = [];
	palavra = 'shimbalaie'//pegarPalavra();
	palavra = palavra.split('');
			
	palavra.forEach(function(char) {
		if (char !== ' '){
			insert += '*';
		}else{
			insert += ' - ';
		}	
	});

	palavra = palavra.join('');
	$('body').append($('h2').html(insert));
};

function jogada (letra) {
	var i = 0;
	var erro = true;
	letrasJogadas[jog] = letra;
	palavra = palavra.split('');
	insert = insert.split('');

	palavra.forEach(function (let) {
		if (let === letra){
			insert[i] = letra;
			erro = false;
		}

		i++;
	});

	if(erro === true){
	    erros++;
	  	$('p').append($('span').html(erros));
	}

	jog++;
	insert = insert.join('');
	palavra = palavra.join('');
	$('h2').empty();
	$('body').append($('h2').html(insert));
	$('label').append($('h1').html(letrasJogadas + ''));
	verifica();
};

function verifica () {
	if(erros === limiteErros){
		alert('Jogador perdeu!' + erros + ' erros');
		redirectPage('index.html');
	}

	if (palavra === insert){
		alert('Jogador venceu!');
		redirectPage('index.html');
	}
};

$('#btnChute').click(function(){
	var chute = $('#txtChute').val();

	if (chute === palavra){
		alert('Jogador ganhou! ' + chute);
		redirectPage('index.html');
	}else{
		alert('Jogador perdeu!');
		redirectPage('index.html');
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

$(document).ready(function() {
	$("body").css("display", "none");
	$("body").fadeIn(1000);
});