fetch("https://jsonplaceholder.typicode.com/users?utm_source")
    .then(function (API_retorno1) {
        return API_retorno1.json()
    }).then(dados_tratados1)

function dados_tratados1(coisa1) {
    const elementoPesquisado = document.getElementById('escreve-aqui')
    for (let loop = 0; loop < coisa1.length; loop++) {
        // regra
        const dado1 = coisa1[loop];
        elementoPesquisado.innerHTML += `
         <article id="card1_${dado1.id}" class="card">
         <h2> ${dado1.title} </h2>
         <div> ${dado1.body} </div>
         <div> <button onclick="deletar('card_${dado1.id}')"> Deletar </button> </div>
         </article>
        `
     // fim de regra
    }
}

function deletar(id) {
    const elementoQueVamosDeletar = document.getElementById(id)
    elementoQueVamosDeletar.remove()
}a