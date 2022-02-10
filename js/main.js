document.addEventListener("DOMContentLoaded", function (event) {
  createSquares();

  const wordToGuess = "snail";
  let guessedWords = [[]];

  const keys = document.querySelectorAll(".keyboard-row button");

  function getCurrentWordArr() {
    return guessedWords[guessedWords.length - 1];
  }

  function isValidWord(word) {
    return true;
  }

  function checkAnswer(word) {
    let elementIndex = (guessedWords.length - 1) * 5 + 1;
    for (let i = 0; i < 5; i++) {
      const squareElement = document.getElementById(String(elementIndex + i));

      if (word[i] === wordToGuess[i]) {
        squareElement.setAttribute("data-state", "correct");
        continue;
      }
      if (wordToGuess.includes(word[i])) {
        squareElement.setAttribute("data-state", "present");
        continue;
      }
      squareElement.setAttribute("data-state", "wrong");
    }
  }

  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length < 5) {
      window.alert("Word must be 5 letters.");
      return;
    }

    const currentWord = currentWordArr.join("");
    if (currentWord === wordToGuess) {
      window.alert("You Won!");
      return;
    }

    if (!isValidWord(currentWord)) {
      window.alert("This is not a valid word.");
      return;
    }

    checkAnswer(currentWord);

    if (guessedWords.length >= 6) {
      //Out of guesses
      window.alert("You Lost!");
      return;
    }
    guessedWords.push([]); //Start a new word
  }

  function handleDelteLetter() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length === 0) return;

    currentWordArr.pop();
  }

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);
    }
  }

  function updateCurrentWordDisplay() {
    const currentWordArr = getCurrentWordArr();
    let elementIndex = (guessedWords.length - 1) * 5 + 1;

    for (let i = 0; i < 5; i++) {
      const squareElement = document.getElementById(String(elementIndex + i));
      if (currentWordArr.length > i) {
        squareElement.textContent = currentWordArr[i];
        squareElement.setAttribute("data-state", "filled");
      } else {
        squareElement.textContent = "";
        squareElement.setAttribute("data-state", "empty");
      }
    }
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter === "enter") {
        handleSubmitWord();
      } else if (letter === "del") {
        handleDelteLetter();
      } else {
        updateGuessedWords(letter);
      }

      updateCurrentWordDisplay();
    };
  }
});
