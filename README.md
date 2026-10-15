# Hangman — JavaScript Game Prototype

A small word-guessing game exploring asynchronous API calls, browser events and game state in vanilla JavaScript.

## What the implementation explores

- Fetching a random word from an external API.
- Displaying hidden letters and correct guesses.
- Tracking incorrect guesses and remaining attempts.
- Detecting a win or a loss and starting a new round.

## Stack

HTML · CSS · JavaScript · Fetch API

## Run locally

No package installation or build step is required. With Python 3 installed:

```bash
git clone https://github.com/Feraz-hub/hangman.git
cd hangman
python -m http.server 8000
```

Open [localhost:8000](http://localhost:8000). On Windows, use `py -m http.server 8000` if `python` is not available.

## Project map

- `index.html` — game interface.
- `script.js` — word fetching and game logic.
- `styles.css` — visual styling.

## Prototype status

This is an early learning experiment, not a finished showcase demo. The script expects a `#hangman` image element and `hangman*.png` assets that are not present in the current interface. Resetting after a completed round also needs to re-enable the Guess button. These should be addressed before presenting the game as complete.

The external random-word service requires an internet connection; request failures are not yet handled in the UI.

## Author

[Feranmi Adenaya](https://feraz-hub.github.io/) · [GitHub](https://github.com/Feraz-hub)
