<<<<<<< HEAD
const cardContainer = document.getElementById('Garrafas-grid');
const searchInput = document.getElementById('busca');
const btnComprar = document.getElementById('btn-comprar');
const quantidadeInput = document.getElementById('numero');
const statTotal = document.getElementById('stat-total');
const statDisp = document.getElementById('stat-disp');
const statVend = document.getElementById('stat-vend');
const toast = document.getElementById('toast');

let bottles = [];
let selectedQuantity = 1;

function showToast(message) {
    toast.textContent = message;
    toast.style.opacity = '1';
    setTimeout(() => {
        if (toast.textContent === message) {
            toast.style.opacity = '0';
        }
    }, 2800);
}

function updateStats() {
    const disponiveis = bottles.filter(item => item.status === 'disponivel').length;
    const vendidos = bottles.filter(item => item.status === 'esgotado').length;

    statTotal.textContent = bottles.length;
    statDisp.textContent = disponiveis;
    statVend.textContent = vendidos;
}

function renderBottles(filter = '') {
    const query = filter.trim().toLowerCase();
    const filtered = bottles.filter(item => {
        return Object.values(item).some(value => {
            if (value === null || value === undefined) return false;
            return String(value).toLowerCase().includes(query);
        });
    });

    if (!filtered.length) {
        cardContainer.innerHTML = '<div class="empty-state">Nenhuma garrafa encontrada.</div>';
        return;
    }

    cardContainer.innerHTML = filtered.map(item => {
        const extraFields = Object.entries(item)
            .filter(([key]) => !['id', 'title', 'body'].includes(key))
            .map(([key, value]) => {
                const display = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
                return `<div><strong>${key}:</strong> ${display}</div>`;
            })
            .join('');

        return `
        <article id="card_${item.id}" class="card">
            <h3>${item.title ?? 'Sem título'}</h3>
            <p>${item.body ?? ''}</p>
            <div class="card-meta">
                <span>ID: ${item.id}</span>
                ${item.userId ? `<span>UserId: ${item.userId}</span>` : ''}
            </div>
            ${extraFields ? `<div class="card-meta">${extraFields}</div>` : ''}
            <div class="card-actions">
                <button type="button" class="btn btn-secondary" onclick="deleteCard('card_${item.id}')">Remover</button>
            </div>
        </article>
    `;
    }).join('');
}

function deleteCard(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }

    if (id.startsWith('card_')) {
        const numericId = Number(id.replace(/[^0-9]/g, ''));
        bottles = bottles.filter(item => item.id !== numericId);
        renderBottles(searchInput.value);
        updateStats();
    }
}

window.deleteCard = deleteCard;

function mostrarNumero() {
    const value = Number(quantidadeInput.value);
    if (!value || value < 1) {
        showToast('Informe uma quantidade válida entre 1 e 100');
        return;
    }

    selectedQuantity = value;
    showToast(`Quantidade selecionada: ${value}`);
}

function addNewBottle() {
    const modelo = document.getElementById('f-modelo').value.trim();
    const cor = document.getElementById('f-cor').value.trim();
    const preco = Number(document.getElementById('f-preco').value);
    const status = document.getElementById('f-status').value;

    if (!modelo || !cor || !preco || preco <= 0) {
        showToast('Preencha marca, cor e preço corretamente.');
        return;
    }

    const newBottle = {
        id: Date.now(),
        title: modelo,
        body: `${selectedQuantity} unidade(s) adicionada(s) ao estoque`,
        cor,
        preco,
        status,
        quantidade: selectedQuantity,
    };

    bottles.unshift(newBottle);
    renderBottles(searchInput.value);
    updateStats();
    showToast('Garrafa adicionada ao estoque');

    document.getElementById('f-modelo').value = '';
    document.getElementById('f-cor').value = '';
    document.getElementById('f-preco').value = '';
    quantidadeInput.value = '';
    selectedQuantity = 1;
}

searchInput.addEventListener('input', () => renderBottles(searchInput.value));
btnComprar.addEventListener('click', addNewBottle);

fetch('https://jsonplaceholder.typicode.com/posts?_limit=12')
    .then(response => response.json())
    .then(data => {
        bottles = data;
        renderBottles();
        updateStats();
    })
    .catch(() => {
        cardContainer.innerHTML = '<div class="empty-state">Falha ao carregar estoque. Atualize a página.</div>';
    });
=======
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
>>>>>>> 1ac04dd (quase pronto)
