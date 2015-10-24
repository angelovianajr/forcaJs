var game;
var jogador;
/*===============
		Index.html
=================*/

$('#btnSubmit').click(function() {
  var nome = $('#userName').val();
  var dif = $('input[name="radioOptions"]:checked').val();

  if ((nome !== 'undefined' || nome !== '') && dif !== 'undefined'){

		var limiteErros;

		dif === 'nunez' ? limiteErros = 2 : limiteErros = 5;

		jogador = new Jogador({"nome":nome});

		game = new Jogo({"jogador":jogador, "limiteErros":limiteErros, "dificuldade":dif});


    $("body").fadeOut(2000, redirectPage('home.html'));
  }
});
//======================================

/*==============
		Jogo.html
================*/

$('#btnChute').click(function(){
	var chute = $('#txtChute').val();

	if (chute === game.palavra){
		alert('Jogador ganhou! ' + chute);
		redirectPage('home.html');
	}else{
		alert('Jogador perdeu!');
		redirectPage('index.html');
	}
})


$('#txtChute').focus(function(){game.jogavel = false;});
$('#txtChute').blur(function(){game.jogavel = true;});

$('body').keypress(function(e){
	if(game.jogavel === true){
		var letra = String.fromCharCode(e.which);
		game.jogada(letra);
	}
});

$('body').keyup(function(e){
    console.log('keyup', String.fromCharCode( e.which ));
});

$(document).ready(function() {
	$("body").css("display", "none");
	$("body").fadeIn(1000);
});
