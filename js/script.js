var dificuldade = localStorage.getItem('dificuldade');
var limiteErros;
var jogador;
var palavrasDisponiveis;

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


function carregarPalavras(){
  $.get('http://localhost:3000/palavras').done(function(data){

    if( dificuldade === 'nunez' ){
      palavrasDisponiveis = data.filter(function(elem){
        return elem.texto.length >= 12;
      });
    }else{
      palavrasDisponiveis = data;
    }
      pegarPalavra();

      inicializar();
    //Coloquei o inicializar aqui pois ele só
    //pode executar depois da variavel palavra estar definida
  });
}


function pegarPalavra(){
    var index = parseInt(Math.random() * palavrasDisponiveis.length);
    palavra = palavrasDisponiveis[index].texto;
};

function getLeaderboard(){
  var i = 0;

  if(typeof arrayJogadores !== 'undefined'){
    arrayJogadores.sort(function(jogador1, jogador2){
        return jogador1.pontos - jogador2.pontos; 
    });

    arrayJogadores.reverse();
    arrayJogadores.forEach(function(user){
      if(i < 5){
        $('#leaderModal').append($('<p>').html(i+1 + ' - ' + user.nome + ' - ' + user.pontos));
        i++;
      }
    });
  }
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

