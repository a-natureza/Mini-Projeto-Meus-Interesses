// Função para recuperar interesses do localStorage e exibir na lista
function loadInterests() {
  const interestList = document.getElementById('interest-list');
  interestList.innerHTML = '';

  // Recuperar interesses do localStorage
  const interests = JSON.parse(localStorage.getItem('meus-interesses')) || [];

  // Exibir interesses na lista
  interests.forEach((interest, index) => {
      const listItem = document.createElement('li');

      // Criar checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `interest-${index}`;
      checkbox.checked = interest.completed; // Define o estado inicial do checkbox
      checkbox.addEventListener('change', () => {
          // Marcar interesse como concluído ou não concluído
          interest.completed = checkbox.checked;
          if (checkbox.checked) {
              textSpan.style.textDecoration = 'line-through'; // Aplica riscado no texto
          } else {
              textSpan.style.textDecoration = 'none'; // Remove riscado do texto
          }
          // Salvar estado de conclusão no localStorage
          localStorage.setItem('meus-interesses', JSON.stringify(interests));
      });

      // Adicionar checkbox ao item da lista
      listItem.appendChild(checkbox);

      // Adicionar texto do interesse
      const textSpan = document.createElement('span');
      textSpan.textContent = interest.text;
      if (interest.completed) {
          textSpan.style.textDecoration = 'line-through'; // Aplica riscado se estiver concluído
      }
      listItem.appendChild(textSpan);

      // Adicionar botão de editar
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.addEventListener('click', () => {
          const newText = prompt('Digite o novo texto para este interesse:');
          if (newText !== null && newText.trim() !== '') {
              interest.text = newText.trim();
              textSpan.textContent = interest.text;
              // Atualizar no localStorage
              localStorage.setItem('meus-interesses', JSON.stringify(interests));
          }
      });
      listItem.appendChild(editBtn);

      // Adicionar botão de deletar
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Deletar';
      deleteBtn.addEventListener('click', () => {
          interests.splice(index, 1);
          listItem.remove();
          // Atualizar no localStorage
          localStorage.setItem('meus-interesses', JSON.stringify(interests));
      });
      listItem.appendChild(deleteBtn);

      interestList.appendChild(listItem);
  });
}

// Função para adicionar um novo interesse
function addInterest(event) {
  event.preventDefault();

  // Recuperar valor do input
  const interestInput = document.getElementById('interest-input');
  const interestText = interestInput.value.trim();

  // Verificar se o interesse não está vazio
  if (interestText === '') {
      alert('Por favor, digite um interesse ou hobbie.');
      return;
  }

  // Recuperar interesses do localStorage
  const interests = JSON.parse(localStorage.getItem('meus-interesses')) || [];

  // Adicionar novo interesse ao array
  interests.push({ text: interestText, completed: false });

  // Salvar interesses no localStorage
  localStorage.setItem('meus-interesses', JSON.stringify(interests));

  // Limpar input
  interestInput.value = '';

  // Recarregar lista de interesses
  loadInterests();
}

// Função para limpar todos os interesses
function clearInterests() {
  // Limpar interesses do localStorage
  localStorage.removeItem('meus-interesses');

  // Recarregar lista de interesses
  loadInterests();
}

// Adicionar evento ao botão de adicionar
document.querySelector('.button-add').addEventListener('click', addInterest);

// Adicionar evento ao botão de limpar lista
document.querySelector('.button-clear').addEventListener('click', clearInterests);

// Carregar interesses ao iniciar a página
window.addEventListener('load', loadInterests);

// Atualizar lista a cada segundo
setInterval(loadInterests, 1000);

// Função para buscar notícias do dia e atualizar a seção de notícias
function fetchNews() {
  fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release')
      .then(response => response.json())
      .then(data => {
          // Verificar se existem notícias na lista de items
          if (data.items && data.items.length > 0) {
              const firstNews = data.items[0]; // Pegar a primeira notícia da lista
              const newsTitle = firstNews.titulo; // Pegar o título da notícia

              // Atualizar o DOM com o título da primeira notícia
              document.querySelector('.title-news-today').textContent = newsTitle;
          }
      })
      .catch(error => {
          console.error('Erro ao buscar notícias:', error);
      });
}

// Chamar a função para buscar e exibir a notícia do dia ao carregar a página
window.addEventListener('load', fetchNews);