// api url
"https://pokeapi.co/api/v2/pokemon/{id or name}/"

let pokeRef = 1


async function getPokemonData(pokeRef) {
    let pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokeRef}/`;
    const response = await fetch(pokeURL);
    let data = await response.json();
    console.log(data.forms[0].name, data.stats[0].stat.name, data.stats[0].base_stat, data.stats[1].stat.name, data.stats[1].base_stat,
        data.stats[2].stat.name, data.stats[2].base_stat,
        data.stats[3].stat.name, data.stats[3].base_stat,
        data.stats[4].stat.name, data.stats[4].base_stat,
        data.stats[5].stat.name, data.stats[5].base_stat,
    )
    return data
}

getPokemonData(pokeRef)
//plan
// write a fetch request to the pokemon api endpoint above