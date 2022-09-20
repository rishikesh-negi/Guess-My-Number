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
    responseMsg.style.color = "rgb(250,5,5)";
  } else if (guessNum < secretNum && currScoreNum > 1) {
    responseMsg.textContent = "Try a higher number...";
    responseMsg.style.color = "rgb(234, 88, 12)";
    currScoreNum--;
    currScore.textContent = currScoreNum;
  } else if (guessNum > secretNum && currScoreNum > 1) {
    responseMsg.textContent = "Try a lower number...";
    responseMsg.style.color = "rgb(234, 88, 12)";
    currScoreNum--;
    currScore.textContent = currScoreNum;
  } else if (
    guessNum === secretNum &&
    currScoreNum <= highScoreNum &&
    currScoreNum > 0
  ) {
    numRange.textContent = "Way to go!";
    guessHeading.textContent = "You guessed the number!🎯";
    guessHeading.style.color = "rgb(10, 160, 10)";
    inputGuess.disabled = true;
    checkGuess.disabled = true;
    sectionMain.style.backgroundColor = "rgb(200, 220, 150)";
    revealNum.textContent = secretNum;
    revealNum.style.backgroundColor = "rgb(10, 160, 10)";
  } else if (
    guessNum === secretNum &&
    currScoreNum > highScoreNum &&
    currScoreNum > 0
  ) {
    numRange.textContent = "New high score!🎉";
    highScore.textContent = String(currScoreNum);
    guessHeading.textContent = "You guessed the number!🎯";
    guessHeading.style.color = "rgb(10, 160, 10)";
    currScore.style.color = "rgb(10, 160, 10)";
    inputGuess.disabled = true;
    checkGuess.disabled = true;
    sectionMain.style.backgroundColor = "rgb(200, 220, 150)";
    revealNum.textContent = secretNum;
    revealNum.style.backgroundColor = "rgb(10, 160, 10)";

    localStorage.setItem("highscore", highScore.textContent);
  } else {
    currScoreNum--;
    currScore.textContent = currScoreNum;
    currScore.style.color = "rgb(250,5,5)";
    inputGuess.disabled = true;
    checkGuess.disabled = true;
    sectionMain.style.backgroundColor = "rgb(250, 170 ,150)";
    guessHeading.textContent = "No more Guesses left 🙅🏻‍♂️";
    numRange.textContent = "You lost⛔. ⬆️Try 'Again'⬆️";
    guessHeading.style.color = "rgb(250,5,5)";
    revealNum.textContent = secretNum;
    revealNum.style.backgroundColor = "rgb(250,5,5)";
  }

  if (inputGuess.disabled) {
    responseMsg.textContent = `⬆️Play 'Again'⬆️`;
    responseMsg.style.color = "rgb(14, 116, 144)";
  }
  inputGuess.value = "";
});

againBtn.addEventListener("click", function () {
  location.reload();
  currScore.textContent = 20;
  inputGuess.value = "";
});
