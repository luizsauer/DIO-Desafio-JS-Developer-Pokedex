
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.stats = pokeDetail.stats.map((base_stats)=>base_stats.base_stat)
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => { //requisitando os detalhes do pokemon
    return fetch(pokemon.url)
        .then((response) => response.json())  //fazendo uma nova requisiçao da lista de detalhes e convertendo o response para JSON
        .then(convertPokeApiDetailToPokemon) //convertendo os detalhes do pokemon para um objeto Pokemon
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) //fazendo a requisiçao http para buscar a lista
        .then((response) => response.json()) // Convertendo o response para JSON
        .then((jsonBody) => jsonBody.results) // pegando os resultandos q tem na lista
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // mapeando a lista de pokemon para uma lista de promessas para uma nova lista com mais detalhes
        .then((detailRequests) => Promise.all(detailRequests)) //aguarda todos as requisicoes terminarem
        .then((pokemonsDetails) => pokemonsDetails) //retorna a lista de pokemons com os detalhes

        
}