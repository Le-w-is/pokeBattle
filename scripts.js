// api url
"https://pokeapi.co/api/v2/pokemon/{id or name}/"

let pokeRef = 1
let sprite = document.querySelector("#sprite")
let pokeName = document.querySelector("#pokeName")
let attack = document.querySelector("#attack")
let defense = document.querySelector("#defense")
let speed = document.querySelector("#speed")
let specialAttack = document.querySelector("#specialAttack")
let specialDefense = document.querySelector("#specialDefense")

async function getPokemonData(pokeRef) {
    let pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokeRef}/`;
    const res = await fetch(pokeURL)
    data = await res.json();
    const pokeData = { name: data.forms[0].name, hp: data.stats[0].base_stat, attack: data.stats[1].base_stat, defense: data.stats[2].base_stat, specialAttack: data.stats[3].base_stat, specialDefense: data.stats[4].base_stat, speed: data.stats[5].base_stat, sprite: data.sprites.front_shiny }
    return pokeData
}

async function displayPokemon() {
    let data = await getPokemonData(pokeRef)
    console.log(data)
    sprite.src = data.sprite;
    pokeName.innerHTML = data.name;
    attack.innerHTML = `Attack: ${data.attack}`
    defense.innerHTML = `Defense: ${data.defense}`
    speed.innerHTML = `Speed: ${data.speed}`
    specialAttack.innerHTML = `Special Attack: ${data.specialAttack}`
    specialDefense.innerHTML = `Special Defense: ${data.specialDefense}`
}


displayPokemon()

//plan
// write a fetch request to the pokemon api endpoint above ✅
// display the pokemon sprite on the screen ✅
// display the pokemon stats on the screen ✅

// enable the player to choose the pokemon they want
// 1. By typing in a number
//1a. make an input form in the html
//1b. capture the value from that form
//1c. store that value in a variable
//1d. attach the variable to the pokeapi url


// 2. By typing in a name
// 3. A button for random selection