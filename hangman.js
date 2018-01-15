var inquirer = require("inquirer");
var isLetter = require("is-letter");

var animals = require("./game.js");
var checkWord = require("./word.js");
var checkLetter = require("./letter.js");

var guessedLetters = [];
var correctLetters = [];
var playHangman;

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
		console.log("You have " + hangman.numGuesses + " remaining");
		promptUser();
	}
};

function promptUser() {
	if (hangman.numGuesses > 0) {
		inquirer.prompt([
			{
				type: "input",
				name: "letter",
				message: "Guess a letter!",
				validate: function(value) {
					if (isLetter(value)) {
						return true;
					} else {
						return false;
					}
				}
			}
		]).then(function(guess){
			var userGuess = guess.letter.toLowerCase();
			if (isLetter && guessedLetters.indexOf(userGuess) != -1) {
				console.log("You already guessed that letter. Please guess again.");
				promptUser();
			} else {
				guessedLetters.push(userGuess);
				var letterPresent = checkLetter(userGuess, hangman.chosenWord);
				if (letterPresent) {
					console.log("Correct!");
					correctLetters.push(userGuess);
					playHangman = new checkWord(hangman.chosenWord, correctLetters);
					playHangman.displayWord();
					if (playHangman.youWin) {
						console.log("Congratulations! You Win!");
						return;
					} else {
						console.log("You have " + hangman.numGuesses + " remaining");
						promptUser();
					}
				} else {
					console.log("Wrong!");
					hangman.numGuesses--;
					console.log("You have " + hangman.numGuesses + " remaining");
					promptUser();
				}
			}
		});
	} else {
		console.log("You ran out of allowed guesses.");
		console.log("The correct answer was " + hangman.chosenWord);
	}
}

hangman.startGame();