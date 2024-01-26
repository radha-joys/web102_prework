/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const game of games) {

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name} Image" class="game-img" />
            <h3>${game.name}</h3>
            <p>Description: ${game.description}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers}</p>
        `;
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// Assuming you have already declared the addGamesToPage function and the gamesContainer variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
let totalRaised;
totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
const filterUnfundedButton = document.getElementById("unfunded-btn");
filterUnfundedButton.addEventListener("click", filterUnfundedOnly);
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    console.log("Number of unfunded games:", unfundedGames.length);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

const filterfundedButton = document.getElementById("funded-btn");
filterfundedButton.addEventListener("click", filterFundedOnly);
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    // Log the number of games in the array returned by filterFundedOnly
    console.log("Number of funded games:", fundedGames.length);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}
const allbtn = document.getElementById("all-btn");
allbtn.addEventListener("click", showAllGames);
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
// Get the number of unfunded games
const numberOfUnfundedGames = unfundedGames.length;

console.log("Number of unfunded games:", numberOfUnfundedGames);

// create a string that explains the number of unfunded games using the ternary operator
const totalRaisedFormatted = totalRaised.toLocaleString();
const totalGames = GAMES_JSON.length;
const totalUnfundedGames = numberOfUnfundedGames;

const displayStr = `A total of $${totalRaisedFormatted} has been raised for ${totalGames} game${totalGames > 1 ? 's' : ''}. Currently, ${
    totalUnfundedGames > 0
        ? `${totalUnfundedGames} game${totalUnfundedGames > 1 ? 's' : ''} remains unfunded.`
        : 'all games are funded.'
} We need your help to fund these amazing games!`;

console.log(displayStr);


// create a new DOM element containing the template string and append it to the description container
// Create a new paragraph element
const summaryParagraph = document.createElement("p");

// Set the inner HTML using the template string
summaryParagraph.innerHTML = `
    A total of $${totalRaisedFormatted} has been raised for ${totalGames} game${totalGames > 1 ? 's' : ''}. Currently, ${
        totalUnfundedGames > 0
            ? `${totalUnfundedGames} game${totalUnfundedGames > 1 ? 's' : ''} remains unfunded.`
            : 'all games are funded.'
    } We need your help to fund these amazing games!
`;

// Append the paragraph to the descriptionContainer
descriptionContainer.appendChild(summaryParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
// Destructuring the top two games using the spread operator
const [firstGame, secondGame, ...restOfGames] = sortedGames;

// Create a function to generate the HTML for a game card
function createGameCard(game) {
    return `
        <div class="game-card">
            <img src="${game.img}" alt="${game.name} Image" class="game-img" />
            <h3>${game.name}</h3>
            <p>Description: ${game.description}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers}</p>
        </div>
    `;
}

// Create new elements to hold the names of the top two funded games
const topGameNameElement = document.createElement("h2");
topGameNameElement.textContent = firstGame.name;

const secondGameNameElement = document.createElement("h2");
secondGameNameElement.textContent = secondGame.name;

// Append the elements to their respective containers
firstGameContainer.appendChild(topGameNameElement);
secondGameContainer.appendChild(secondGameNameElement);



// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item