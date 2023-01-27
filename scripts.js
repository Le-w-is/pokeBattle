// api url
"https://pokeapi.co/api/v2/pokemon/{id or name}/";

// DEFINEING VARIABLES

//display variables
let playerSprite = document.querySelector("#playerSprite");
let computerSprite = document.querySelector("#computerSprite");
let playerPokeName = document.querySelector("#playerPokeName");
let playerAttack = document.querySelector("#playerAttack");
let playerDefense = document.querySelector("#playerDefense");
let playerSpeed = document.querySelector("#playerSpeed");
let playerSpecialAttack = document.querySelector("#playerSpecialAttack");
let playerSpecialDefense = document.querySelector("#playerSpecialDefense");

let computerPokeName = document.querySelector("#computerPokeName");
let computerAttack = document.querySelector("#computerAttack");
let computerDefense = document.querySelector("#computerDefense");
let computerSpeed = document.querySelector("#computerSpeed");
let computerSpecialAttack = document.querySelector("#computerSpecialAttack");
let computerSpecialDefense = document.querySelector("#computerSpecialDefense");
let computerPokemonChoice = document.querySelector("#computerPokemonChoice");
let gameRoundNumber = 0;
let gameRound = document.querySelector("#gameRound");
let playerPokeCard = document.querySelector("#playerPokeCard")
let computerPokeCard = document.querySelector("#computerPokeCard")


//choice variables
let playerPokemonChoice = document.querySelector("#playerPokemonChoice");
let computerChoice = Math.floor(Math.random() * 1009);


// result variables
let resultsBox = document.querySelector("#resultsBox")
let totalPlayerPower = document.querySelector("#totalPlayerPower")
let totalComputerPower = document.querySelector("#totalComputerPower")
let result = document.querySelector("#result");
let totals = document.querySelector("#totals")
let win = 0;
let lose = 0;


//EVENT LISTENERS
playerPokemonChoice.addEventListener(`keydown`, handlePlayerPokemon);

//FUNCTIONS

//function creates the fight when the player presses enter
function handlePlayerPokemon(e) {
    if (e.key == `Enter`) {
        playerChoice = playerPokemonChoice.value;
        computerChoice = Math.floor(Math.random() * 1009)
        playerPokeCard.removeAttribute("hidden")
        computerPokeCard.removeAttribute("hidden")
        displayPlayerPokemon(playerChoice);
        displayComputerPokemon(computerChoice);
        fight();
    }
};


// fetch function to get the promise from the api and set the date that is needed to a variable
async function getPokemonData(pokeRef) {
    let pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokeRef}/`;
    const res = await fetch(pokeURL);
    data = await res.json();
    const pokeData = { name: data.forms[0].name, hp: data.stats[0].base_stat, attack: data.stats[1].base_stat, defense: data.stats[2].base_stat, specialAttack: data.stats[3].base_stat, specialDefense: data.stats[4].base_stat, speed: data.stats[5].base_stat, sprite: data.sprites.front_shiny };
    return pokeData;
};


// Player function unpacks the data and assigns it to the variables linked to html divs 
async function displayPlayerPokemon() {
    let data = await getPokemonData(playerChoice);
    playerSprite.src = data.sprite;
    playerPokeName.innerHTML = data.name;
    playerAttack.innerHTML = `Attack: ${data.attack}`;
    playerDefense.innerHTML = `Defense: ${data.defense}`;
    playerSpeed.innerHTML = `Speed: ${data.speed}`;
    playerSpecialAttack.innerHTML = `Special Attack: ${data.specialAttack}`;
    playerSpecialDefense.innerHTML = `Special Defense: ${data.specialDefense}`;
};

// Computer function unpacks the data and assigns it to the variables linked to html divs 
async function displayComputerPokemon() {
    let data = await getPokemonData(computerChoice);
    computerSprite.src = data.sprite;
    computerPokeName.innerHTML = data.name;
    computerAttack.innerHTML = `Attack: ${data.attack}`;
    computerDefense.innerHTML = `Defense: ${data.defense}`;
    computerSpeed.innerHTML = `Speed: ${data.speed}`;
    computerSpecialAttack.innerHTML = `Special Attack: ${data.specialAttack}`;
    computerSpecialDefense.innerHTML = `Special Defense: ${data.specialDefense}`;
};


// function that tallies up the total score for each pokemon, compares the two, then provides the result

async function fight() {
    if (gameRoundNumber < 6) {
        let playerData = await getPokemonData(playerChoice);
        let computerData = await getPokemonData(computerChoice);
        let playerScore = playerData.hp + playerData.attack + playerData.defense + playerData.specialAttack + playerData.specialDefense + playerData.speed
        let computerScore = computerData.hp + computerData.attack + computerData.defense + computerData.specialAttack + computerData.specialDefense + computerData.speed
        totalPlayerPower.innerHTML = `your player score is ${playerScore}     `;
        totalComputerPower.innerHTML = `the computer score is ${computerScore}     `;


        if (playerScore >= computerScore) {
            result.innerHTML = "win"
            gameRoundNumber++
            gameRound.innerHTML = `Game round: ${gameRoundNumber}`
            win++
            totals.innerHTML = `Win: ${win} Loses:${lose}`

        } else {
            result.innerHTML = "lose"
            gameRoundNumber++
            gameRound.innerHTML = `Game round: ${gameRoundNumber}`
            lose++
            totals.innerHTML = `Win: ${win} Loses:${lose}`
        }
    } else if (gameRoundNumber >= 6) {
        gameRoundNumber = 0;
        result.innerHTML = ""
        gameRound.innerHTML = `Choose another pokemon to play again`
        playerChoice = ""
        computerChoice = ""
        totalPlayerPower.innerHTML = ""
        totalComputerPower.innerHTML = ""
        playerPokeCard.setAttribute("hidden", true)
        computerPokeCard.setAttribute("hidden", true)
    }

}


//plan tourny
// create game round variable
// after each round add 1 to ther variable
// after 6 rounds give the final score
// reset the variable and the scores
