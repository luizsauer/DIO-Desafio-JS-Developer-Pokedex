const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/`;

async function createPokemonDetails(pokemonClicked) {

    const pokeName = pokemonClicked.querySelector('.name').textContent;
    const pokemon = await getPokemon(pokeName);
    console.log(pokemon);
    
    let modal = document.querySelector('.modal');
    let content = document.querySelector('.modal-content');
    modal.style.display = 'flex';

    let btn = document.createElement('button');
    btn.className = "btnclose";
    btn.innerHTML = '✖';
    btn.addEventListener('click', ()=>{
        modal.style.display = 'none'; // Esconde o modal
    });

    content.innerHTML = "";
    content.appendChild(btn);
    content.appendChild(createPokemonDetailsContent(pokemon));

}

function createPokemonDetailsContent(pokemon) {
    let caixalta = pokemon.name.toUpperCase();
    let container = document.createElement('div');
    container.className = "pokemon-ul";
    container.innerHTML = `
        <img src="${pokemon.image}" class="imagepokemon">
        <h2>${caixalta}</h2>
        <div class="stat-section">
            <div class="stat-row">
                <div class="left">
                    <ul class="stat-list">
                        <li>❤️ HP: ${pokemon.hp}</li>
                        <li>💨 Speed: ${pokemon.speed}</li>
                    </ul>
                </div>
                <div class="right">
                    <ul class="stat-list">
                        <li>⚔️ Attack: ${pokemon.attack}</li>
                        <li>🛡️ Defense: ${pokemon.defense}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="stat-section">
            <ul class="stat-list">
                <li>🔥 Special Attack: ${pokemon.specialAttack}</li>
                <li>🧊 Special Defense: ${pokemon.specialDefense}</li>
            </ul>
        </div>
    `;
    return container;
}

async function getPokemon(pokemon) {
    let data = await fetch(pokemonUrl + `${pokemon}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const pokemon = {
                name: data.name,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                specialAttack: data.stats[3].base_stat,
                specialDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
                image: data.sprites.front_default
            }
            console.log(pokemon);
            return pokemon;
        })
        .catch((error) => console.log(error));
    return data;
}

