fetch("https://jsonplaceholder.typicode.com/users?utm_source")
    .then(function (API_retorno1) {
        return API_retorno1.json()
    }).then(dados_tratados1)

function dados_tratados1(coisa1) {
    const elementoPesquisado = document.getElementById('escreve-aqui1')
    for (let loop = 0; loop < coisa1.length; loop++) {
        const dado1 = coisa1[loop];
        elementoPesquisado.innerHTML += `
         <article id="card1_${dado1.id}" class="card">
         <h2> ${dado1.name} </h2>
         <div> ${dado1.email} </div>
         <div> ${dado1.company?.name || ""} </div>
         <div> <button onclick="deletar('card1_${dado1.id}')"> Escolher </button> </div>
         </article>
        `
    }
}

function deletar(id) {
    const elementoQueVamosDeletar = document.getElementById(id)
    if (elementoQueVamosDeletar) {
        elementoQueVamosDeletar.remove()
    }
}