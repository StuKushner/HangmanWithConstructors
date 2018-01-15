var checkWord = function(word, correctGuesses) {
	this.chosenAnimal = word;
	this.correct = correctGuesses;
	this.displayString = "";
	this.youWin = false;

	this.displayWord = function() {
		var numBlanks = "";
		if (this.correct === undefined) {
			for (var i = 0; i < this.chosenAnimal.length; i++) {
				numBlanks += "_";
			}
		} else {
			for (var i = 0; i < this.chosenAnimal.length; i++) {
				var letterInWord = false;
				for (var j = 0; j < this.correct.length; j++) {
					if (this.chosenAnimal[i] === this.correct[j]) {
						numBlanks += this.correct[j];
						letterInWord = true;

					}
				}
				if (!letterInWord) {
					numBlanks += "_";
				}
			}
		}
		this.displayString = numBlanks;
		console.log(this.displayString);

		if (this.displayString === this.chosenAnimal) {
			this.youWin = true;
		}
	}
};
module.exports = checkWord;
