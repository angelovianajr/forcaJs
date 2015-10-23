var erros = 0;
var palavra = '';
var insert = '';
var jogavel = true;


function inicializar(){
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
	}

	insert = insert.join('');
	palavra = palavra.join('');
	$('h2').empty();
	$('body').append($('h2').html(insert));
	verifica();
};

function verifica () {
	if(erros === limiteErros){
		alert('Jogador perdeu!' + erros + ' erros');
		window.location.href = 'index.html';
	}

	if (palavra === insert){
		alert('Jogador venceu!');
		window.location.href = 'index.html';
	}
};

$('#btnChute').click(function(){
	var chute = $('#txtChute').val();

	if (chute === palavra){
		alert('Jogador ganhou! ' + chute);
		window.location.href = 'index.html';
	}else{
		alert('Jogador perdeu!');
		window.location.href = 'index.html';
	}
})

$('#txtChute').focus(function(){jogavel = false;});
$('#txtChute').blur(function(){jogavel = true;});

$('body').keypress(function(e){
	if(jogavel === true){
		var letra = String.fromCharCode(e.which);
		jogada(letra);
	}
});
$('body').keyup(function(e){
    console.log('keyup', String.fromCharCode( e.which ));
});