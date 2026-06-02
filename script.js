fetch("https://jsonplaceholder.typicode.com/posts")
    .then(function (API_retorno) {
        return API_retorno.json()
    }).then(dados_tratados)

function dados_tratados(coisa) {
    const elementoPesquisado = document.getElementById('escreve-aqui')
    for (let loop = 0; loop < coisa.length; loop++) {
        // regra
        const dado = coisa[loop];
        elementoPesquisado.innerHTML += `
         <article id="card_${dado.id}" class="card">
         <h2> ${dado.title} </h2>
         <div> ${dado.body} </div>
         <div> <button onclick="deletar('card_${dado.id}')"> Deletar </button> </div>
         </article>
        `
     // fim de regra
    }
}

function deletar(id) {
    const elementoQueVamosDeletar = document.getElementById(id)
    elementoQueVamosDeletar.remove()
}a