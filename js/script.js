"use strict";

const sectionMain = document.getElementById("section-main");

const againBtn = document.getElementById("btn-again");
const resetHS = document.getElementById("btn-reset-hs");
const checkGuess = document.getElementById("check");

const guessHeading = document.getElementById("guess-heading");
const responseMsg = document.getElementById("message");
const numRange = document.getElementById("num-range");
const revealNum = document.getElementById("reveal-num");

const inputGuess = document.getElementById("input-guess");

const currScore = document.getElementById("score");
const highScore = document.getElementById("highscore");

const secretNum = Math.trunc(Math.random() * 20) + 1;

if (localStorage.getItem("highscore")) {
  highScore.textContent = localStorage.getItem("highscore");
}

resetHS.addEventListener("click", function () {
  highScore.textContent = 0;
  localStorage.removeItem("highscore");
});

checkGuess.addEventListener("click", function () {
  const guessNum = Number(inputGuess.value);
  let currScoreNum = Number(currScore.textContent);
  const highScoreNum = Number(highScore.textContent);

  if (
    !inputGuess ||
    typeof guessNum !== "number" ||
    guessNum < 1 ||
    guessNum > 20
  ) {
    responseMsg.textContent = "Pick a number from 1 to 20...";
  } else if (guessNum < secretNum && currScoreNum > 1) {
    responseMsg.textContent = "Try a higher number...";
    currScoreNum--;
    currScore.textContent = currScoreNum;
  } else if (guessNum > secretNum && currScoreNum > 1) {
    responseMsg.textContent = "Try a lower number...";
    currScoreNum--;
    currScore.textContent = currScoreNum;
  } else if (
    guessNum === secretNum &&
    currScoreNum <= highScoreNum &&
    currScoreNum > 0
  ) {
    responseMsg.textContent = "You guessed it!";
    guessHeading.textContent = "You guessed the number!";
    inputGuess.disabled = true;
    checkGuess.disabled = true;
    revealNum.textContent = secretNum;
    numRange.textContent = "Way to go!";
  } else if (
    guessNum === secretNum &&
    currScoreNum > highScoreNum &&
    currScoreNum > 0
  ) {
    responseMsg.textContent = "You guessed it!";
    highScore.textContent = String(currScoreNum);
    guessHeading.textContent = "You guessed the number!";
    inputGuess.disabled = true;
    checkGuess.disabled = true;
    revealNum.textContent = secretNum;
    numRange.textContent = "New high score!";

    localStorage.setItem("highscore", highScore.textContent);
  } else {
    currScoreNum--;
    currScore.textContent = currScoreNum;
    inputGuess.disabled = true;
    checkGuess.disabled = true;
    checkGuess.setAttribute("opacity", "0");
    guessHeading.textContent = "No more Guesses left";
    responseMsg.textContent = "You ran out of guesses.";
    revealNum.textContent = secretNum;
  }

  if (inputGuess.disabled) {
    responseMsg.textContent = `⬆️Play 'Again'⬆️`;
  }
  inputGuess.value = "";
});

againBtn.addEventListener("click", function () {
  location.reload();
  currScore.textContent = 20;
  inputGuess.value = "";
});
