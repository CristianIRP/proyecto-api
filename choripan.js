async function fetchChampions() {
  const url = "https://ddragon.leagueoflegends.com/cdn/13.9.1/data/en_US/champion.json";
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
}

async function renderChampionCards(champions) {
  const cardsContainer = document.getElementById("cards-container");

  if (!cardsContainer) {
    console.error("El elemento con ID 'cards-container' no se encuentra en el documento HTML.");
    return;
  }

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

document.addEventListener("DOMContentLoaded", async () => {
  const searchForm = document.querySelector("form");
  const searchInput = document.getElementById("search-input");
  const cardsContainer = document.getElementById("cards-container");
  const navbar = document.getElementById("navbar");

  if (!searchForm || !searchInput || !cardsContainer || !navbar) {
    console.error("Los elementos con ID 'search-input', 'cards-container' y 'navbar' no se encuentran en el documento HTML.");
    return;
  }

  let prevScrollPos = window.pageYOffset;

  window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      navbar.style.transform = "translateY(0)";
    } else {
      navbar.style.transform = "translateY(-100%)";
    }

    prevScrollPos = currentScrollPos;
  };

  const champions = await fetchChampions();
  renderChampionCards(Object.values(champions));

  const filterChampions = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredChampions = Object.values(champions).filter(
      (champion) =>
        champion.name.toLowerCase().includes(searchTerm) ||
        champion.title.toLowerCase().includes(searchTerm)
    );
    renderChampionCards(filteredChampions);
  };

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    filterChampions();
  });

  searchInput.addEventListener("input", () => {
    filterChampions();
  });
});
