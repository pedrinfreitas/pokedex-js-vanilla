const convertPokeApi = (pokemonApi) => {
  const types = pokemonApi.types.map((typeSlot) => typeSlot.type.name);
  return {
    name: pokemonApi.name,
    number: pokemonApi.id,
    types,
    image: pokemonApi.sprites.other["official-artwork"].front_default,
    bgColor: types[0],
  };
};

const responseJson = (response) => response.json();
const responseDetails = (pokemon) =>
  fetch(pokemon.url).then(responseJson).then(convertPokeApi);

const pokeApi = {
  getPokemon: (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
      .then(responseJson)
      .then(({ results }) => results)
      .then((pokemons) => pokemons.map(responseDetails))
      .then((detailRequest) => Promise.all(detailRequest))
      .then((pokemonDetails) => pokemonDetails)
      .catch((error) => console.error(error));
  },
};
