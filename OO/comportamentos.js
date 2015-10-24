$('#btnChute').click(function(){
	var chute = $('#txtChute').val();

	if (chute === game.palavra){
		alert('Jogador ganhou! ' + chute);
		redirectPage('index.html');
	}else{
		alert('Jogador perdeu!');
		redirectPage('index.html');
	}
})


$('#btnSubmit').click(function() {
  var nome = $('#userName').val();
  var dif = $('input[name="radioOptions"]:checked').val();
  if ((nome !== 'undefined' || nome !== '') && dif !== 'undefined'){
    inserirUsuario(nome, dif, 0);
    console.log($('input[name=RadioOptions]:checked').val());
    $("body").fadeOut(2000, redirectPage('jogo.html'));
  }
});

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