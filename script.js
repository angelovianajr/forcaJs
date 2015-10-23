$('#btnSubmit').click(function() {
  inserirUsuario($('#userName').val(), $('input[name="RadioOptions"]:checked').val(), 0);
  console.log($('input[name=RadioOptions]:checked').val());
  pegarPalavra();
});

function pegarPalavra(){
  palavra =
  $.get('http://localhost:3000/palavras').done(function(data){
    console.log(data[parseInt(Math.random()  *10)].texto);
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
