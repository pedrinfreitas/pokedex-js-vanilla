const pokemonList = document.getElementById("pokemon-list");
const loadMoreButton = document.getElementById("load-more-button");

const maxRecord = 151;
const limit = 12;
let offset = 0;

const loadPokemonItems = (offset, limit) => {
  pokeApi.getPokemon(offset, limit).then(
    (pokemons = []) =>
      (pokemonList.innerHTML += pokemons
        .map(
          (pokemon) =>
            `<li class="pokemon ${pokemon.bgColor}">
              <span class="number">#${pokemon.number}</span>
              <span class="name"> ${pokemon.name}</span>
              <div class="detail">
                <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="types ${type}">${type}</li>`)
                  .join("")}
                </ol>
                <img
                  src="${pokemon.image}"
                  alt="${pokemon.name}"
                />
              </div>
            </li>`
        )
        .join(""))
  );
};

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdeRecord = offset + limit;

  if (qtdeRecord >= maxRecord) {
    loadPokemonItems(offset, maxRecord - offset);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});
