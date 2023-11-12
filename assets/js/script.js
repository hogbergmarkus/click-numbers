/*
This piece of code to add eventlisteners on DOM loaded using "data-type",
was helped by the Love Maths walkthrough project.
https://github.com/Code-Institute-Solutions/love-maths-2.0-sourcecode/blob/master/05-tidying-up/01-a-few-last-things/assets/js/script.js
*/
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.getElementsByTagName('button');
    let divs = document.getElementsByClassName('number-div');
    let secondsInterval; //Keep track of timer count
    let second = 0; //Set displaying time on page
    let timerRunning = false; //Game stopped
    let firstNumber = 1; //Keep count of what number is clicked

    //Add eventlisteners to Start and Reset buttons.
    for (let button of buttons) {
        button.addEventListener('click', handleClick);
    }

    //Functions for Start and Reset Buttons
    function handleClick(event) {
        if (event.target.getAttribute('data-type') === 'start') {
            secondsInterval = setInterval(setTimer, 1000); //Start timer
            timerRunning = true; //Start game
            document.getElementById('start-button').disabled = true;

        } else if (event.target.getAttribute('data-type') === 'reset') {
            clearInterval(secondsInterval);
            second = 0;
            let timer = document.getElementById('timer');
            timer.innerHTML = `Timer: ${second}`; //Reset timer in HTML
            timerRunning = false; //Stop game
            firstNumber = 1;

            //Button control found at: https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
            document.getElementById('start-button').disabled = false;

            resetDivs();
            addNumToDiv();

        } else {
            alert('No game is running, please press "Start"');
        }
    }

    //Add eventlisteners to game divs with numbers inside
    for (let div of divs) {
        div.addEventListener('click', handleDivClick);
    }

    /*
    Main game function
    Click in correct order, and color if clicked correct, green.
    If clicked in wrong order, red, and game over.
    Game complete.
    */
    function handleDivClick() {
        if (timerRunning === true) {
            let divNumber = parseInt(this.textContent);//Get number from clicked div
            if (divNumber === firstNumber && firstNumber < 16) {
                this.style.backgroundColor = 'green';//If number is correct, color background green
                firstNumber++;

            } else if (divNumber !== firstNumber) {

                /*
                setTimeout function was helped by documentation at link below:
                https://www.w3schools.com/jsref/met_win_settimeout.asp
                Waits 0.1 sec before displaying alert message.
                Had to use this so div would color red before alert displays.
                */
                setTimeout(function () {
                    alert('Game Over! Press Reset and then Start, to start a new game.');
                }, 100);

                this.style.backgroundColor = 'red';
                timerRunning = false;
                clearInterval(secondsInterval);//Stop timer

                //Game complete functionality
            } else {
                if (firstNumber === 16) {
                    setTimeout(function () {
                        alert('Congratulations, you completed the game!');
                    }, 100);
                    this.style.backgroundColor = 'green';
                    timerRunning = false;
                    clearInterval(secondsInterval);
                    bestTime();
                }
            }

        } else {
            alert('No game is currently running, please press Start! If game is completed, or game over, press Reset and then Start.');
        }
    }

    /**
     * Timer function, starts when Start button is pressed.
     * I used the documentation from the link below to help with this.
     * https://www.w3schools.com/jsref/met_win_setinterval.asp.
     */
    function setTimer() {
        let timer = document.getElementById('timer');
        timer.innerHTML = `Timer: ${second}`;
        second++;
    }

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
 * Uses the function randomArray to get random numbers.
 * Then pupulates number-div in html with those numbers.
 * Used on DOM load, and when reset button is used.
*/
function addNumToDiv() {
    let divs = document.getElementsByClassName('number-div');
    let numbers = randomArray(); //Function that generats array with random, unique numbers 1-16

    for (let i = 0; i < divs.length; i++) {
        divs[i].textContent = numbers[i]; //Add the numbers from randomArray to each number-div in the html
    }
}

/**
 * Set divs back to their original color when game is reset
 */
function resetDivs() {
    let divs = document.getElementsByClassName('number-div');

    for (let div of divs) {
        div.style.backgroundColor = 'rgb(40, 40, 40)';
    }
}

/**
 * Get the time on timer when game is completed.
 * Add it to Your best time if time is shorter, or if it is 0.
 * Found slice method in notes from the javascript course.
 */
function bestTime() {
    let time = document.getElementById('timer').textContent;
    let newTime = parseInt(time.slice(7)); //Extract the number of seconds from timer
    let bestTime = document.getElementById('best-time');
    let bestTimeValue = parseInt(bestTime.textContent.slice(16)); //Extract number from best time

    //Compare extracted numbers and update Your best time
    if (newTime < bestTimeValue || bestTimeValue === 0) {
        bestTime.textContent = `Your best time: ${newTime} seconds`;
    }
}