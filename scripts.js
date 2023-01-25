// api url
"https://pokeapi.co/api/v2/pokemon/{id or name}/"


// DEFINEING VARIABLES
let sprite = document.querySelector("#sprite")
let pokeName = document.querySelector("#pokeName")
let attack = document.querySelector("#attack")
let defense = document.querySelector("#defense")
let speed = document.querySelector("#speed")
let specialAttack = document.querySelector("#specialAttack")
let specialDefense = document.querySelector("#specialDefense")
let playerPokemonChoice = document.querySelector("#pokemonChoice")
let playerChoice = Math.floor(Math.random() * 1009);
let computerChoice = Math.floor(Math.random() * 1009);


//EVENT LISTENERS
playerPokemonChoice.addEventListener(`keydown`, handlePlayerPokemon);


//FUNCTIONS
function handlePlayerPokemon(e) {
    if (e.key == `Enter`) {
        playerChoice = playerPokemonChoice.value;
    }
    displayPokemon(playerChoice)
}

async function getPokemonData(pokeRef) {
    let pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokeRef}/`;
    const res = await fetch(pokeURL)
    data = await res.json();
    const pokeData = { name: data.forms[0].name, hp: data.stats[0].base_stat, attack: data.stats[1].base_stat, defense: data.stats[2].base_stat, specialAttack: data.stats[3].base_stat, specialDefense: data.stats[4].base_stat, speed: data.stats[5].base_stat, sprite: data.sprites.front_shiny }
    return pokeData
}


async function displayPokemon() {
    let data = await getPokemonData(playerChoice)
    sprite.src = data.sprite;
    pokeName.innerHTML = data.name;
    attack.innerHTML = `Attack: ${data.attack}`
    defense.innerHTML = `Defense: ${data.defense}`
    speed.innerHTML = `Speed: ${data.speed}`
    specialAttack.innerHTML = `Special Attack: ${data.specialAttack}`
    specialDefense.innerHTML = `Special Defense: ${data.specialDefense}`
}

displayPokemon(playerChoice)


