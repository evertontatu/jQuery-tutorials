$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
$("#botao-sync").click(sincronizaPlacar);

function fraseAleatoria(){
  $("#spinner").toggle();
  $(".frase").hide();
  $.get("http://localhost:3000/frases", trocaFraseAleatoria)
  .fail(function(){
    $("#erro").toggle();
    setTimeout(function(){
      $("#erro").toggle();
    },2000);
  })
  .always(function(){
    $("#spinner").toggle();
    $(".frase").show();
  });
}

function trocaFraseAleatoria(data){
  var frase = $(".frase");
  let numeroAleatorio = Math.floor(Math.random() * data.length);
  frase.text(data[numeroAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
  $("#spinner").toggle();

  let fraseId = $("#frase-id").val();
  let dados = {id:fraseId};

  $.get("http://localhost:3000/frases", dados, trocaFrase)
  .fail(function(){
    $("#erro").toggle();
    setTimeout(function(){
      $("#erro").toggle();
    },2000);
  })
  .always(function(){
    $("#spinner").toggle();
  });
}

function trocaFrase(data) {
  let frase = $(".frase");
  frase.text(data.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo);
}

function sincronizaPlacar(){
  let placar = [];

  let linhas = $("tbody>tr");

  linhas.each(function(){
    let usuario = $(this).find("td:nth-child(1)").text();
    let palavras = $(this).find("td:nth-child(1)").text();

    let score = {
      usuario: usuario,
      pontos: palavras
    };

    placar.push(score);

    let dados = {
      placar:placar
    };

    $.post("http://localhost:3000/placar", dados, function(){
      console.log("Placar sincronizado com sucesso");
    });


  });
}
