var dificuldade = localStorage.getItem('dificuldade');
var limiteErros;

$('#btnSubmit').click(function() {
  inserirUsuario($('#userName').val(), $('input[name="radioOptions"]:checked').val(), 0);
  console.log($('input[name=RadioOptions]:checked').val());
  pegarPalavra();
  window.location.href = 'jogo.html';
});


function inserirUsuario(nome, radio, valor){

  localStorage.setItem('dificuldade', radio);

  limiteErros = ( dificuldade === 'nunez' ) ? 2 : 5;

  $.post('http://localhost:3000/usuarios',
    {
      "nome": nome,
      "dificuldade":radio,
      "pontos":valor
    }
  );
}

function pegarPalavra(){
  $.get('http://localhost:3000/palavras').done(function(data){
    palavra = data[parseInt(Math.random() * data.length)].texto;
  })
}
