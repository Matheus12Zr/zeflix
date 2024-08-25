document.addEventListener('DOMContentLoaded', () => {
    // Variáveis globais
    const myListSection = document.querySelector('.mylist-videos');
    const featuredMovieId = 999;
  
    // Funções
    function watchMovie(movieId) {
      window.open(`https://www.youtube.com/watch?v=${movieId}`, "_blank");
    }
  
    function addToMyList(item) {
      let myList = JSON.parse(localStorage.getItem('myList')) || [];
      if (!myList.some(existingItem => existingItem.id === item.id)) {
        myList.push(item);
        localStorage.setItem('myList', JSON.stringify(myList));
        alert(`${item.title} foi adicionado à sua lista!`);
        renderMyList();
      } else {
        alert(`${item.title} já está na sua lista!`);
      }
    }
  
    function renderMyList() {
      myListSection.innerHTML = '';
      const myList = JSON.parse(localStorage.getItem('myList')) || [];
      myList.forEach(item => {
        const listItem = document.createElement('a');
        listItem.href = '#';
        listItem.setAttribute("data-id", item.id);
        listItem.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <p>${item.title}</p>
        `;
        myListSection.appendChild(listItem);
      });
    }
  
    function removeVideoFromList(videoId) {
      const myListVideos = document.querySelector('.mylist-videos');
      const videoElement = myListVideos.querySelector(`a[href="#${videoId}"]`);
      if (videoElement) {
        myListVideos.removeChild(videoElement);
      }
    }
  
    function isVideoInList(videoId) {
      const myListVideos = document.querySelector('.mylist-videos');
      const videoElement = myListVideos.querySelector(`a[href="#${videoId}"]`);
      return videoElement !== null;
    }
  
    // Eventos
    const watchNowButton = document.getElementById('watch-now');
    watchNowButton.addEventListener('click', () => {
      const movieUrl = "https://www.youtube.com/watch?v=gt_fAE1Eg2Q"; // URL do vídeo
      window.open(movieUrl, "_blank"); // Abre em uma nova aba
    });
  
    const addToListButton = document.getElementById('add-to-list');
    addToListButton.addEventListener('click', () => {
      addToMyList({
        id: featuredMovieId,
        title: "Homem-Aranha: Através do Aranhaverso",
        image: "https://img.youtube.com/vi/gt_fAE1Eg2Q/maxresdefault.jpg"
      });
    });
  
    const categories = document.querySelectorAll('.catalog');
    categories.forEach(category => {
      const movies = category.querySelectorAll('a');
      movies.forEach(movie => {
        movie.addEventListener('click', (event) => {
          event.preventDefault();
          const movieId = movie.getAttribute('data-id');
          const movieTitle = movie.querySelector('p').textContent;
          const movieImgUrl = movie.querySelector('img').src;
  
          // Cria o menu de opções
          const optionsMenu = document.createElement('div');
          optionsMenu.className = 'options-menu';
          optionsMenu.style.top = `${event.clientY}px`;
          optionsMenu.style.left = `${event.clientX}px`;
          optionsMenu.innerHTML = `
            <div class="option">
              <button id="watch-${movieId}">Assistir Agora</button>
            </div>
            <div class="option">
              <button id="add-${movieId}">Adicionar à Minha Lista</button>
            </div>
          `;
          document.body.appendChild(optionsMenu);
  
          // Adiciona eventos aos botões
          document.getElementById(`watch-${movieId}`).addEventListener('click', () => {
            watchMovie(movieId);
            document.body.removeChild(optionsMenu);
          });
  
          document.getElementById(`add-${movieId}`).addEventListener('click', () => {
            addToMyList({
              id: movieId,
              title: movieTitle,
              image: movieImgUrl
            });
            document.body.removeChild(optionsMenu);
          });
  
          // Remove o menu ao clicar fora dele
          document.addEventListener('click', (event) => {
            if (!optionsMenu.contains(event.target)) {
              document.body.removeChild(optionsMenu);
            }
          }, { once: true });
        });
      });
    });
  
    const movieImages = document.querySelectorAll('.catalog img');
    movieImages.forEach(image => {
      image.addEventListener('click', (event) => {
        event.preventDefault();
        const movieId = image.parentNode.getAttribute('data-id');
        const movieTitle = image.alt;
        const movieImgUrl = image.src;
  
        // Cria o menu de opções
        const optionsMenu = document.createElement('div');
        optionsMenu.className = 'options-menu';
        optionsMenu.style.top = `${event.clientY}px`;
        optionsMenu.style.left = `${event.clientX}px`;
        optionsMenu.innerHTML = `
        <div class="option">
          <button id="watch-${movieId}">Assistir Agora</button>
        </div>
        <div class="option">
          <button id="add-${movieId}">Adicionar à Minha Lista</button>
        </div>
      `;
      document.body.appendChild(optionsMenu);

      // Adiciona eventos aos botões
      document.getElementById(`watch-${movieId}`).addEventListener('click', () => {
        watchMovie(movieId);
        document.body.removeChild(optionsMenu);
      });

      document.getElementById(`add-${movieId}`).addEventListener('click', () => {
        addToMyList({
          id: movieId,
          title: movieTitle,
          image: movieImgUrl
        });
        document.body.removeChild(optionsMenu);
      });

      // Remove o menu ao clicar fora dele
      document.addEventListener('click', (event) => {
        if (!optionsMenu.contains(event.target)) {
          document.body.removeChild(optionsMenu);
        }
      }, { once: true });
    });
  });

  // Adiciona botão "Remover Tudo" à "Minha Lista"
  const removeAllButton = document.createElement('button');
  removeAllButton.textContent = 'Remover Tudo';
  myListSection.appendChild(removeAllButton);

  // Função para remover todos os itens da lista
  removeAllButton.addEventListener('click', () => {
    localStorage.removeItem('myList');
    myListSection.innerHTML = '';
    alert('Todos os itens foram removidos da sua lista!');
  });

  // Chama a função para renderizar a lista ao carregar a página
  renderMyList();
});



//por que eu nao consingo mais adicionar ou remover um filme a Minha lista quando eu clico no filme 