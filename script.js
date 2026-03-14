const lista = document.getElementById('lista');
const titulo = document.getElementById('titulo');
const nota = document.getElementById('nota');
const comentario = document.getElementById('comentario');
const capa = document.getElementById('capa');
const btnAdicionar = document.getElementById('btnAdicionar');
const modoBtn = document.getElementById('modoBtn');

// 🔹 Carregar livros salvos
let livros = JSON.parse(localStorage.getItem('livros')) || [];

// 🔹 Mostrar livros na tela
function renderizarLivros() {
    lista.innerHTML = '';
    livros.forEach((livro, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}">
            <div>
                <strong>${livro.titulo}</strong> - Nota: ${livro.nota}/5
                <p>${livro.comentario}</p>
            </div>
            <button class="excluir-btn" onclick="excluirLivro(${index})">Excluir</button>
        `;
        lista.appendChild(item);
    });
}

// 🔹 Adicionar novo livro
btnAdicionar.addEventListener('click', () => {
    const nomeLivro = titulo.value.trim();
    const notaLivro = nota.value.trim();
    const comentarioLivro = comentario.value.trim();
    const capaLivro = capa.value.trim() || 'https://cdn-icons-png.flaticon.com/512/29/29302.png';

    if (nomeLivro === '' || notaLivro === '') {
        alert('Por favor, preencha o título e a nota!');
        return;
    }

    const novoLivro = {
        titulo: nomeLivro,
        nota: notaLivro,
        comentario: comentarioLivro,
        capa: capaLivro
    };

    livros.push(novoLivro);
    localStorage.setItem('livros', JSON.stringify(livros));
    renderizarLivros();

    // Limpar campos
    titulo.value = '';
    nota.value = '';
    comentario.value = '';
    capa.value = '';
});

// 🔹 Excluir livro
function excluirLivro(index) {
    livros.splice(index, 1);
    localStorage.setItem('livros', JSON.stringify(livros));
    renderizarLivros();
}

// 🔹 Alternar modo escuro/claro
modoBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const modoEscuroAtivo = document.body.classList.contains('dark');
    modoBtn.textContent = modoEscuroAtivo ? '☀ Modo Claro' : '🌙 Modo Escuro';
    localStorage.setItem('modoEscuro', modoEscuroAtivo);
});

// 🔹 Carregar modo salvo
if (localStorage.getItem('modoEscuro') === 'true') {
    document.body.classList.add('dark');
    modoBtn.textContent = '☀ Modo Claro';
}

// Mostrar livros salvos ao abrir
renderizarLivros();