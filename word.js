var checkWord = function(word, correctGuesses) {
	this.chosenAnimal = word;
	this.correct = correctGuesses;
	this.displayString = "";
	this.youWin = false;

	// This determines how many blanks are needed
	this.displayWord = function() {
		var numBlanks = "";
		if (this.correct === undefined) {
			for (var i = 0; i < this.chosenAnimal.length; i++) {
				numBlanks += "_";
			}
		} else {
			// If any letters are in the word, fill in all instances of the letter's occurrence.
			for (var i = 0; i < this.chosenAnimal.length; i++) {
				var letterInWord = false;
				for (var j = 0; j < this.correct.length; j++) {
					if (this.chosenAnimal[i] === this.correct[j]) {
						numBlanks += this.correct[j];
						letterInWord = true;

					}
				}
				// If the guessed letter isn't in the word, change nothing.
				if (!letterInWord) {
					numBlanks += "_";
				}
			}
		}
		// Log the display String (which has the blanks hiding the answer)
		this.displayString = numBlanks;
		console.log(this.displayString);

		// If the display string is the same as the chosen animal, you win!
		if (this.displayString === this.chosenAnimal) {
			this.youWin = true;
		}
	}
};
// Export to use throughout the files
module.exports = checkWord;
