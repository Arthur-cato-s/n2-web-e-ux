let posts = [];
let users = [];

function renderizarPosts(){
    const lista = document.getElementById('lista-posts');
    lista.innerHTML = '';
    posts.forEach((post, indice) => {
        const autor = users.find(user => user.id === post.userId);
        const nomeAutor = autor ? autor.name : 'Desconhecido';
        const emailAutor = autor ? autor.email : '';
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
<span class="autor"> ${nomeAutor} — ${emailAutor}</span>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button class="btn-editar" onclick="editarPost(${indice})">Editar</button>
      <button class="btn-remover" onclick="removerPost(${indice})">Remover</button>
`;
        lista.appendChild(card);
    });
}

Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
    fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json())
])
.then(([dadosPosts, dadosUsers]) => {
    posts = dadosPosts.slice(0, 10);
    users = dadosUsers;
    renderizarPosts();
});
document.getElementById('btn-adicionar').addEventListener('click', () => {
    const titulo = prompt('titulo do novo post:');
    const corpo = prompt('conteudo do post');
    if(titulo && corpo){
        posts.push({ title: titulo, body: corpo, userId: null});
        renderizarPosts();
    }
});

function editarPost(indice) {
  const novoTitulo = prompt('Novo título:', posts[indice].title);
  const novoCorpo  = prompt('Novo conteúdo:', posts[indice].body);

  if (novoTitulo && novoCorpo) {
    posts[indice].title = novoTitulo;
    posts[indice].body  = novoCorpo;
    renderizarPosts();
  }
}

function removerPost(indice) {
  posts.splice(indice, 1);
  renderizarPosts();
}
