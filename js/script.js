var dificuldade = localStorage.getItem('dificuldade');
var limiteErros;

$('#btnSubmit').click(function() {
  var nome = $('#userName').val();
  var dif = $('input[name="radioOptions"]:checked').val();
  alert(nome + '----' + dif);
  if ((nome !== 'undefined' || nome !== '') && dif !== 'undefined'){
    inserirUsuario(nome, dif, 0);
    console.log($('input[name=RadioOptions]:checked').val());
    window.location.href = 'jogo.html';
  }
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
     return data[parseInt(Math.random() * data.length)].texto;
  })
}
