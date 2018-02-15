// Check if letter is in the word
function checkLetter (letter, word) {
	if (word.indexOf(letter) != -1) {
		return true;
	} else {
		return false;
	}
}

// Export for the other files to use
module.exports = checkLetter;