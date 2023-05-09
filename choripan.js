async function fetchChampions() {
    const url = "https://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion.json";
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  }
  
  async function renderChampionCards(champions) {
    const cardsContainer = document.getElementById("cards-container");
  
    // Limpiar contenido anterior del contenedor
    cardsContainer.innerHTML = "";
  
    for (const champion in champions) {
      const { id, name, title, blurb } = champions[champion];
      const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.9.1/img/champion/${id}.png`;
  
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-3");
      card.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${imageUrl}" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-title">${title}</h6>
            <p class="card-text">${blurb}</p>
          </div>
        </div>
      `;
  
      cardsContainer.appendChild(card);
    }
  }
  
  // Envolver todo el código en una función que se ejecute después de que se haya cargado la página
  document.addEventListener("DOMContentLoaded", async () => {
    // Escuchar evento de búsqueda
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", async () => {
      const searchInput = document.getElementById("search-input");
      const searchTerm = searchInput.value.toLowerCase();
  
      const champions = await fetchChampions();
      const filteredChampions = Object.values(champions).filter(
        (champion) =>
          champion.name.toLowerCase().includes(searchTerm) ||
          champion.title.toLowerCase().includes(searchTerm)
      );
  
      renderChampionCards(filteredChampions);
    });
  
    // Renderizar todas las cartas al cargar la página
    renderChampionCards(await fetchChampions());
  });
  