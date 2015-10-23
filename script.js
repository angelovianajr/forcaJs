$('#btnSubmit').click(function() {
  inserirUsuario($('#userName').val(), $('input[name="radioOptions"]:checked').val(), 0);
  console.log($('input[name=RadioOptions]:checked').val());
  pegarPalavra();
});

function pegarPalavra(){
  $.get('http://localhost:3000/palavras').done(function(data){
    palavra = data[parseInt(Math.random()  *10)].texto.split('');
  })
}

function inserirUsuario(nome, radio, valor){
  $.post('http://localhost:3000/usuarios',
    {
      "nome": nome,
      "dificuldade":radio,
      "pontos":valor
    }
  );
}
