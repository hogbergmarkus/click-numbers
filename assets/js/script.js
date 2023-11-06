/*
This piece of code was helped by the Love Maths walkthrough project
https://github.com/Code-Institute-Solutions/love-maths-2.0-sourcecode/blob/master/05-tidying-up/01-a-few-last-things/assets/js/script.js
Add event listeners to Start and Reset buttons on DOM load
Add event listeners to number divs with clickableDivs function
Functions to start and reset the game will be attached
 */
document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByTagName('button');
    let secondsInterval;

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'start') {
                secondsInterval = setInterval(setTimer, 1000); //Start timer function
                timerRunning = true;
            } else if (this.getAttribute('data-type') === 'reset') {
                clearInterval(secondsInterval);
                second = 0; //Set "second" cariable back to 0
                let timer = document.getElementById('timer');
                timer.innerHTML = `Timer: ${second}`; //Reset the html to 0
                timerRunning = false;
                firstNumber = 1;
                resetDivs();
                addNumToDiv();
            } else {
                alert('No game is running, please press "Start"');
            }
        });
    }
    //Add eventlisteners to the divs with numbers inside, that are used to play game
    //Main game function
    //click in correct order, and collor correct clicks green
    let timerRunning = false;
    let firstNumber = 1;
    function clickableDivs() {
        let divs = document.getElementsByClassName('number-div');

        for (let div of divs) {
            div.addEventListener('click', function () {
                if (timerRunning === true) {
                    let divNumber = parseInt(div.textContent); //Get number from clicked div
                    if (divNumber === firstNumber) {
                        div.style.backgroundColor = 'green'; //If number is 1, color background green
                        firstNumber++; //Increment firstNumber by 1
                    } else if (divNumber !== firstNumber) {
                        alert('Gameover');
                    }
                } else {
                    alert('No game is currently running, please press Start!');
                }
            });
        }
    }
    clickableDivs();
    addNumToDiv();
});

//Creates an array and fills it randomly with numbers 1-16
function randomArray() {
    let array = []; //Create an empty array
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
    numbers = randomArray(); //Function that generats array with random, unique numbers 1-16

    for (let i = 0; i < divs.length; i++) {
        divs[i].textContent = numbers[i]; //Add the numbers from randomArray to each number-div in the html
    }
}

/*
Timer function, starts when Start button is pressed
I used the documentation from the link below to help with this
https://www.w3schools.com/jsref/met_win_setinterval.asp
*/
let second = 0;
function setTimer() {
    let timer = document.getElementById('timer');
    timer.innerHTML = `Timer: ${second}`;
    second++;
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