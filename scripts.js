// api url
"https://pokeapi.co/api/v2/pokemon/{id or name}/";

// DEFINEING VARIABLES

//display variables
const playerPokeCard = document.querySelector("#playerPokeCard")
const playerPokeName = document.querySelector("#playerPokeName");
const playerSprite = document.querySelector("#playerSprite");
const playerAttack = document.querySelector("#playerAttack");
const playerDefense = document.querySelector("#playerDefense");
const playerSpeed = document.querySelector("#playerSpeed");
const playerSpecialAttack = document.querySelector("#playerSpecialAttack");
const playerSpecialDefense = document.querySelector("#playerSpecialDefense");


const computerPokeCard = document.querySelector("#computerPokeCard")
const computerPokeName = document.querySelector("#computerPokeName");
const computerSprite = document.querySelector("#computerSprite");
const computerAttack = document.querySelector("#computerAttack");
const computerDefense = document.querySelector("#computerDefense");
const computerSpeed = document.querySelector("#computerSpeed");
const computerSpecialAttack = document.querySelector("#computerSpecialAttack");
const computerSpecialDefense = document.querySelector("#computerSpecialDefense");


let gameRound = document.querySelector("#gameRound");
let gameRoundNumber = 0;


//choice variables
let playerPokemonChoice = document.querySelector("#playerPokemonChoice");
let playerStatChoice = document.querySelector("#playerStatChoice")
let computerChoice = Math.floor(Math.random() * 1009);
let playerChoice;
let playerStat;


// result variables
let resultsBox = document.querySelector("#resultsBox")
let totalPlayerPower = document.querySelector("#totalPlayerPower")
let totalComputerPower = document.querySelector("#totalComputerPower")
let result = document.querySelector("#result");
let totals = document.querySelector("#totals")
let playerScore;
let computerScore;
let win = 0;
let lose = 0;


//EVENT LISTENERS
playerPokemonChoice.addEventListener("keydown", handlePlayerPokemon);
playerStatChoice.addEventListener("keydown", handlePlayerStat);

//FUNCTIONS

//function creates the fight when the player presses enter
function handlePlayerPokemon(e) {
    if (e.key == `Enter`) {
        playerChoice = playerPokemonChoice.value;
        playerPokeCard.removeAttribute("hidden");
        playerStatChoice.removeAttribute("hidden")
        displayPlayerPokemon(playerChoice);
    }
};

function handlePlayerStat(e) {
    if (e.key == "Enter") {
        playerStat = playerStatChoice.value;
        computerPokeCard.removeAttribute("hidden");
        fight();
    }
}


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
        computerChoice = Math.floor(Math.random() * 1009);
        let computerData = await getPokemonData(computerChoice);
        let playerScore;
        let computerScore;

        if (playerStat == "attack") {
            playerScore = playerData.attack;
            computerScore = computerData.attack;
        } else if (playerStat == "defense") {
            playerScore = playerData.defense;
            computerScore = computerData.defense;
        } else if (playerStat == "special attack") {
            playerScore = playerData.specialAttack;
            computerScore = computerData.specialAttack;
        } else if (playerStat == "special defense") {
            playerScore = playerData.specialDefense;
            computerScore = computerData.specialDefense;
        } else if (playerStat == "speed") {
            playerScore = playerData.speed;
            computerScore = computerData.speed;
        } else if (playerStat != "attack" || playerStat != "defense" || playerStat != "special attack" || playerStat != "special defense" || playerStat != "speed") {
            computerPokeCard.setAttribute("hidden", true)
            alert("please spell the stat correctly and in lower case")

            return
        }

        totalPlayerPower.innerHTML = `your ${playerStat} is ${playerScore}`;
        totalComputerPower.innerHTML = `the computer's ${playerStat}  is ${computerScore}`;

        displayComputerPokemon(computerChoice)
        if (playerScore >= computerScore) {
            result.innerHTML = "you win this round"
            gameRoundNumber++
            gameRound.innerHTML = `Game round: ${gameRoundNumber}`
            win++
            totals.innerHTML = `Win: ${win} Loses:${lose}`

        } else {
            result.innerHTML = "you lost this round"
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
        playerStatChoice.setAttribute("hidden", true)
        win = 0;
        lose = 0;
        totals.innerHTML = `Win: ${win} Loses:${lose}`
    }
}



//plan
// allow player to choose a stat
// add checkboc to each stat
// when checkbox is ticked and enter pressed
// compare that stat to computer sta
