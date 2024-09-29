let selectedWord = '';
let guessedLetters = [];
let wrongLetters = [];
let maxAttempts = 6; // Maximum allowed incorrect guesses
let attempts = 0;

// DOM Elements
const wordContainer = document.getElementById('word-container');
const wrongLettersContainer = document.getElementById('wrong-letters-container');
const statusText = document.getElementById('status');
const hangmanImage = document.getElementById('hangman');
const letterInput = document.getElementById('letter-input');
const guessButton = document.getElementById('guess-button');
const resetButton = document.getElementById('reset-button');

// Fetch a random word from the API
async function fetchRandomWord() {
    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    const data = await response.json();
    return data[0]; // Return the first word
}

// Start a new game
async function startGame() {
    selectedWord = await fetchRandomWord(); // Fetch a word from the API
    guessedLetters = [];
    wrongLetters = [];
    attempts = 0;
    setMaxAttempts(selectedWord.length); // Set max attempts based on word length
    updateWordDisplay();
    updateWrongLettersDisplay();
    statusText.textContent = `You have ${maxAttempts} attempts remaining.`;
    hangmanImage.src = `hangman${attempts}.png`; // Ensure you have hangman0.png to hangman6.png images
}

// Set max attempts based on word length
function setMaxAttempts(wordLength) {
    maxAttempts = Math.max(10, Math.ceil(wordLength / 3)); // Minimum 6 attempts
}

// Update the word display with guessed letters
function updateWordDisplay() {
    wordContainer.innerHTML = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

// Update the wrong letters display
function updateWrongLettersDisplay() {
    wrongLettersContainer.textContent = `Wrong letters: ${wrongLetters.join(', ')}`;
}

// Handle letter guess
guessButton.addEventListener('click', () => {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (!letter || guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
        return; // Ignore if invalid input
    }

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();
        if (!selectedWord.split('').some(letter => !guessedLetters.includes(letter))) {
            statusText.textContent = 'Congratulations! You guessed the word!';
            guessButton.disabled = true;
        }
    } else {
        wrongLetters.push(letter);
        attempts++;
        updateWrongLettersDisplay();
        hangmanImage.src = `hangman${attempts}.png`;
        const remainingAttempts = maxAttempts - attempts;
        statusText.textContent = `You have ${remainingAttempts} attempts remaining.`;
        if (attempts >= maxAttempts) {
            statusText.textContent = `Game Over! The word was "${selectedWord}".`;
            guessButton.disabled = true;
        }
    }
});

// Reset the game
resetButton.addEventListener('click', startGame);

// Initialize the game
startGame();
