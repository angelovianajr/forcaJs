$('#btnSubmit').click(function() {
  inserirUsuario($('#userName').val(), $('input[name="RadioOptions"]:checked').val(), 0);
  console.log($('input[name=RadioOptions]:checked').val());
});

function inserirUsuario(nome, radio, valor){
  $.post('http://localhost:3000/usuarios',
    {
      "nome": nome,
      "dificuldade":radio,
      "pontos":valor
    }
  );
}
