/*
This piece of code to add event listeners on DOM loaded using "data-type",
was helped by the Love Maths walkthrough project.
https://github.com/Code-Institute-Solutions/love-maths-2.0-sourcecode/blob/master/05-tidying-up/01-a-few-last-things/assets/js/script.js
*/
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.getElementsByTagName("button");
  let divs = document.getElementsByClassName("number-div");
  let secondsInterval; //Keep track of timer count
  let second = 0; //Set displaying time on page
  let timerRunning = false; //Game stopped
  let firstNumber = 1; //Keep count of what number is clicked
  let gameMode = "numbers"; //Current game mode: 'numbers' or 'colors'
  let gameOver = false; //Track if game is over
  let gameWon = false; //Track if game is won

  //Game mode selector
  const modeButtons = document.querySelectorAll(".mode-button");
  for (let modeButton of modeButtons) {
    modeButton.addEventListener("click", handleModeSelect);
  }

  function handleModeSelect(event) {
    gameMode = event.target.getAttribute("data-mode");

    //Update active button styling
    modeButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");

    //Show game section
    document.getElementById("game-section").style.display = "block";
    document.getElementById("mode-selector").style.display = "none";
    document.getElementById("back-button-container").style.display = "block";

    //Reset game
    clearInterval(secondsInterval);
    second = 0;
    firstNumber = 1;
    timerRunning = false;
    gameOver = false;
    gameWon = false;
    document.getElementById("start-button").disabled = false;
    document.getElementById("timer").innerHTML = "Timer: 0";

    //Update game title based on mode
    let gameTitle = document.getElementById("game-title");
    if (gameMode === "numbers") {
      gameTitle.textContent =
        "Hit the numbers 1-16 in order, as fast as you can!";
    } else {
      gameTitle.textContent =
        "Click the colors from lightest (white) to darkest (black), as fast as you can!";
    }

    resetDivs();
    if (gameMode === "numbers") {
      addNumToDiv();
    } else {
      addColorsToDiv();
    }
  }

  //Add event listeners to Start and Reset buttons.
  for (let button of buttons) {
    button.addEventListener("click", handleClick);
  }

  //Functions for Start and Reset Buttons
  function handleClick(event) {
    if (event.target.getAttribute("data-type") === "start") {
      if (gameOver) {
        showModal(
          "Game Over!",
          "You lost! Please press Reset to start a new game.",
        );
        return;
      }
      if (gameWon) {
        showModal(
          "Game Won!",
          "You already completed this game! Please press Reset to play again.",
        );
        return;
      }
      secondsInterval = setInterval(setTimer, 1000); //Start timer
      timerRunning = true; //Start game
      document.getElementById("start-button").disabled = true;
    } else if (event.target.getAttribute("data-type") === "reset") {
      clearInterval(secondsInterval);
      second = 0;
      let timer = document.getElementById("timer");
      timer.innerHTML = `Timer: ${second}`; //Reset timer in HTML
      timerRunning = false; //Stop game
      firstNumber = 1;
      gameOver = false;
      gameWon = false;

      //Button control found at: https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
      document.getElementById("start-button").disabled = false;

      resetDivs();
      if (gameMode === "numbers") {
        addNumToDiv();
      } else {
        addColorsToDiv();
      }
    } else if (event.target.getAttribute("data-type") === "back") {
      clearInterval(secondsInterval);
      document.getElementById("game-section").style.display = "none";
      document.getElementById("mode-selector").style.display = "block";
      document.getElementById("back-button-container").style.display = "none";

      //Reset all game variables
      second = 0;
      firstNumber = 1;
      timerRunning = false;
      gameOver = false;
      gameWon = false;
      document.getElementById("timer").innerHTML = "Timer: 0";
      document.getElementById("start-button").disabled = false;
      resetDivs();
    }
  }

  //Add event listeners to game divs with numbers inside
  for (let div of divs) {
    div.addEventListener("click", handleDivClick);
  }

  /*
    Main game function
    Click in correct order, and color if clicked correct, green.
    If clicked in wrong order, red, and game over.
    Game complete.
    */
  function handleDivClick() {
    if (timerRunning === true) {
      let divNumber;

      if (gameMode === "numbers") {
        divNumber = parseInt(this.textContent);
      } else {
        divNumber = parseInt(this.getAttribute("data-color-order"));
      }

      if (divNumber === firstNumber && firstNumber < 16) {
        this.style.backgroundColor = "green"; //If number/color is correct, color background green
        firstNumber++;
      } else if (divNumber !== firstNumber) {
        this.style.backgroundColor = "red";
        timerRunning = false;
        gameOver = true;
        clearInterval(secondsInterval); //Stop timer
        showModal(
          "Game Over!",
          "Wrong number! Press Reset and then Start to try again.",
        );

        //Game complete functionality
      } else {
        if (firstNumber === 16) {
          this.style.backgroundColor = "green";
          timerRunning = false;
          gameWon = true;
          clearInterval(secondsInterval);
          bestTime();
          showModal(
            "Congratulations!",
            "You completed the game! Press Reset to play again.",
          );
        }
      }
    } else if (gameOver) {
      showModal(
        "Game Over!",
        "Please press Reset and then Start to begin the game!",
      );
    } else if (gameWon) {
      showModal("Game Won!", "Please press Reset to play again.");
    } else {
      showModal("Game Not Started", "Please press Start to begin the game!");
    }
  }

  /**
   * Timer function, starts when Start button is pressed.
   * I used the documentation from the link below to help with this.
   * https://www.w3schools.com/jsref/met_win_setinterval.asp.
   */
  function setTimer() {
    let timer = document.getElementById("timer");
    timer.innerHTML = `Timer: ${second}`;
    second++;
  }

  /**
   * Show custom modal with title and message
   */
  function showModal(title, message) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-message").textContent = message;
    document.getElementById("modal-overlay").classList.add("show");
    document.getElementById("modal").classList.add("show");
  }

  /**
   * Hide modal
   */
  function hideModal() {
    document.getElementById("modal-overlay").classList.remove("show");
    document.getElementById("modal").classList.remove("show");
  }

  //Modal button event listener
  document.getElementById("modal-button").addEventListener("click", hideModal);
  document.getElementById("modal-overlay").addEventListener("click", hideModal);

  addNumToDiv();
});

//Creates an array and fills it randomly with numbers 1-16
function randomArray() {
  const array = []; //Create an empty array

  while (array.length < 16) {
    let number = Math.floor(Math.random() * 16) + 1; //Random numbers 1-16

    if (array.includes(number)) {
      continue; //If number already exists in array, skip this iteration
    } else {
      array.push(number); //Push unique number into array
    }
  }
  return array;
}

/**
 * Creates an array with random color orders 1-16
 * and assigns grayscale colors to each div based on the random order.
 */
function addColorsToDiv() {
  let divs = document.getElementsByClassName("number-div");
  let colorOrders = randomArray(); //Reuse randomArray function for color order

  for (let i = 0; i < divs.length; i++) {
    // Create grayscale colors from white (1) to black (16)
    // White is 255, 255, 255 (order 1)
    // Black is 0, 0, 0 (order 16)
    let order = colorOrders[i];
    let grayValue = 255 - Math.floor((order - 1) * (255 / 15));
    let color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;

    divs[i].style.backgroundColor = color;
    divs[i].setAttribute("data-color-order", order);
    divs[i].textContent = ""; // Remove text for color mode
  }
}

/**
 * Uses the function randomArray to get random numbers.
 * Then populates number-div in html with those numbers.
 * Used on DOM load, and when reset button is used.
 */
function addNumToDiv() {
  let divs = document.getElementsByClassName("number-div");
  let numbers = randomArray(); //Function that generates array with random, unique numbers 1-16

  for (let i = 0; i < divs.length; i++) {
    divs[i].textContent = numbers[i]; //Add the numbers from randomArray to each number-div in the html
  }
}

/**
 * Set divs back to their original color when game is reset
 */
function resetDivs() {
  let divs = document.getElementsByClassName("number-div");

  for (let div of divs) {
    div.style.backgroundColor = "rgb(40, 40, 40)";
  }
}

/**
 * Get the time on timer when game is completed.
 * Add it to Your best time if time is shorter, or if it is 0.
 * Found slice method in notes from the javascript course.
 */
function bestTime() {
  let time = document.getElementById("timer").textContent;
  let newTime = parseInt(time.slice(7)); //Extract the number of seconds from timer
  let bestTime = document.getElementById("best-time");
  let bestTimeValue = parseInt(bestTime.textContent.slice(16)); //Extract number from best time

  //Compare extracted numbers and update Your best time
  if (newTime < bestTimeValue || bestTimeValue === 0) {
    bestTime.textContent = `Your best time: ${newTime} seconds`;
  }
}
