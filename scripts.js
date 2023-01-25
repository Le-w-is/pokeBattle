// api url
"https://pokeapi.co/api/v2/pokemon/{id or name}/"

let pokeRef = 1
let sprite = document.querySelector("#sprite")
console.log(sprite)

async function getPokemonData(pokeRef) {
    let pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokeRef}/`;
    const res = await fetch(pokeURL)
    data = await res.json();
    const pokeData = { name: data.forms[0].name, hp: data.stats[0].base_stat, attack: data.stats[1].base_stat, defense: data.stats[2].base_stat, specialAttack: data.stats[3].base_stat, specialDefense: data.stats[4].base_stat, speed: data.stats[5].base_stat, sprite: data.sprites.front_shiny }
    return pokeData
}

async function displayPokemon() {
    let data = await getPokemonData(pokeRef)
    sprite.src = data.sprite;
}


displayPokemon()

//plan
// write a fetch request to the pokemon api endpoint above ✅
// display the pokemon sprite on the screen ✅
// display the pokemon stats on the screen