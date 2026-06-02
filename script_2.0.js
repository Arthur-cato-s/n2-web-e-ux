fetch('https://jsonplaceholder.typicode.com/users?utm_source')
    .then(response => response.json())
    .then(renderVendedores)
    .catch(() => {
        const element = document.getElementById('escreve-aqui1');
        element.innerHTML = '<div class="empty-state">Falha ao carregar vendedores.</div>';
    });

function renderVendedores(users) {
    const elementoPesquisado = document.getElementById('escreve-aqui1');
    elementoPesquisado.innerHTML = users.map(user => `
        <article id="card1_${user.id}" class="card">
            <h3>${user.name}</h3>
            <div class="card-meta">
                <span>Telefone: ${user.phone}</span>
            </div>
            <div class="card-actions">
                <button type="button" class="btn btn-secondary" onclick="deleteCard('card1_${user.id}')">Remover</button>
            </div>
        </article>
    `).join('');
}
