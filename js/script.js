var dificuldade = localStorage.getItem('dificuldade');
var limiteErros;
var jogador;

$('#btnSubmit').click(function() {
  var nome = $('#userName').val();
  var dif = $('input[name="radioOptions"]:checked').val();
  if (nome !== '' && typeof dif !== 'undefined'){
    btnSound();
    var user;
    setTimeout(function(){user = obterJogador(nome);}, 1000);
    console.log(user);
    if(typeof user === 'undefined'){
      inserirUsuario(nome, dif, 0);
    }else{
      location.replace('home.html?nome='+nome+'&dificuldade='+dif+'&id='+user.id+'&pontos='+user.pontos); 
      threadSleepAfeterRedirect('jogo.html', 1000);
    } 
  }
});

$('#btnCont').click(function(){
  btnSound();
  threadSleepAfeterRedirect('index.html', 1000);
});

$('#btnLeader').click(function(){ btnSound(); })
$('#btnComoJogar').click(function(){ btnSound(); });

function redirectPage(linkLocation, num) {
  if(!num){
    $('body').fadeOut(num);
  }
  window.location = linkLocation;
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

    inicializar();
    //Coloquei o inicializar aqui pois ele só
    //pode executar depois da variavel palavra estar definida
  });

};

function getLeaderboard(){
  var i = 0;
  arrayJogadores.sort(function(x, y){
      return x.pontos < y.pontos; 
  });

  arrayJogadores.forEach(function(user){
    if(i < 5){
      $('#leaderModal').append($('<p>').html(i+1 + ' - ' + user.nome + ' - ' + user.pontos));
      i++;
    }
  });
 
};

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

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

