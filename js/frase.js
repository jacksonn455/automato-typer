$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function buscaFrase() {

    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();

    var dados = {id : fraseId}; //criacao do objeto JS que guarda a id

    //passando objeto como segundo parâmetro
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

function fraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },1500);
    }).always(function() {  // se der certo ou errado ele esconde o spinner apos a requisição
        $("#spinner").toggle();
    })
}

function trocaFrase(data) {

    console.log(data);

    var frase = $(".frase");
    frase.text(data.texto); //cuidado, texto com "o" no final 
    atualizaFrase();
    atualizaTempoInicial(data.tempo);
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length); // consulta o tamanho do array
    frase.text(data[numeroAleatorio].texto);
    atualizaFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}