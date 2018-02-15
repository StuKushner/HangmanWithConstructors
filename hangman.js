var inquirer = require("inquirer");
var isLetter = require("is-letter");

// Take from the other files
var animals = require("./game.js");
var checkWord = require("./word.js");
var checkLetter = require("./letter.js");

// Correct and wrong guesses
var guessedLetters = [];
var correctLetters = [];
var playHangman;

// The hangman game with all the logic
// You have 10 guesses. An animal will be chosen at random
// The number of blanks will be displayed and the user will be prompted.
var hangman = {
	possibleChoices: animals,
	numGuesses: 10,
	chosenWord: null,

	startGame: function() {
		this.numGuesses = 10;
		var randAnimal = Math.floor(Math.random() * this.possibleChoices.length);
		this.chosenWord = this.possibleChoices[randAnimal];

		console.log("Welcome to Animal Hangman! See if you can guess the animal!");

		playHangman = new checkWord(this.chosenWord);
		playHangman.displayWord();
		console.log("**********************");
		console.log("You have " + hangman.numGuesses + " guesses remaining");
		console.log("**********************");
		promptUser();
	}
};

// The user has to guess a letter provided he or she has any guesses left
function promptUser() {
	if (hangman.numGuesses > 0) {
		inquirer.prompt([
			{
				type: "input",
				name: "letter",
				message: "Guess a letter!",
				// Is what the person put in a letter? If so, go on. If not, it won't go through.
				validate: function(value) {
					if (isLetter(value)) {
						return true;
					} else {
						return false;
					}
				}
			}
		]).then(function(guess){
			// The letter will be lower case
			var userGuess = guess.letter.toLowerCase();
			// If the person already guessed that letter, he or she will be prompted to guess again.
			// The repeated letter won't go through.
			if (isLetter && guessedLetters.indexOf(userGuess) != -1) {
				console.log("**********************");
				console.log("You already guessed that letter. Please guess again.");
				console.log("**********************");
				promptUser();
			} else {
				// Push all the guessed letters to the userGuess array
				guessedLetters.push(userGuess);
				// Check to see if a correct letter was guessed. If it was,
				// the appropriate blanks will be filled in.
				var letterPresent = checkLetter(userGuess, hangman.chosenWord);
				if (letterPresent) {
					console.log("Correct!");
					correctLetters.push(userGuess);
					playHangman = new checkWord(hangman.chosenWord, correctLetters);
					// If the person filled in the letter, he or she wins.
					playHangman.displayWord();
					if (playHangman.youWin) {
						console.log("Congratulations! You Win!");
						console.log("**********************");
						return;
					} else {
						// Decrease the number of guesses
						console.log("**********************");
						console.log("You have " + hangman.numGuesses + " guesses remaining");
						console.log("**********************");
						promptUser();
					}
				} else {
					// If a wrong guess was made, the number of guesses goes down.
					console.log("Wrong!");
					hangman.numGuesses--;
					console.log("**********************");
					console.log("You have " + hangman.numGuesses + " guesses remaining");
					console.log("**********************");
					promptUser();
				}
			}
		});
		// If the person ran out of guesses, reveal the answer. The game ends.
	} else {
		console.log("**********************");
		console.log("You ran out of allowed guesses.");
		console.log("The correct answer was " + hangman.chosenWord);
		console.log("**********************");
	}
}
// Start game
hangman.startGame();