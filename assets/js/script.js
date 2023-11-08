/*
This piece of code to add eventlisteners on DOM loaded using "data-type",
was helped by the Love Maths walkthrough project.
https://github.com/Code-Institute-Solutions/love-maths-2.0-sourcecode/blob/master/05-tidying-up/01-a-few-last-things/assets/js/script.js
Add event listeners to Start and Reset buttons on DOM load.
Add event listeners to number divs with clickableDivs function
Start and reset game.
 */
document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByTagName('button');
    let secondsInterval; //Keep track of timer count
    let second = 0; //Set displaying time on page
    let timerRunning = false; //Game stopped
    let firstNumber = 1; //Keep count of what number is clicked

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'start') {
                secondsInterval = setInterval(setTimer, 1000); //Start timer function
                timerRunning = true; //Starts game

            } else if (this.getAttribute('data-type') === 'reset') {
                clearInterval(secondsInterval);
                second = 0; //Set "second" variable back to 0
                let timer = document.getElementById('timer');
                timer.innerHTML = `Timer: ${second}`; //Reset the html to 0
                timerRunning = false; //Stops game
                firstNumber = 1;

                //Button control found at: https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
                document.getElementById('start-button').disabled = false; //Enables startbutton when game is reset

                resetDivs();
                addNumToDiv();

            } else {
                alert('No game is running, please press "Start"');
            }

        });
    }

    /*
    Main game function
    Add eventlisteners to the divs with numbers inside, that are used to play game
    Click in correct order, and collor if clicked correct, green
    If clicked in wrong order, red, and game over
    Game complete
    */
    function clickableDivs() {
        let divs = document.getElementsByClassName('number-div');

        for (let div of divs) {
            div.addEventListener('click', function () {
                if (timerRunning === true) {
                    let divNumber = parseInt(div.textContent); //Get number from clicked div
                    if (divNumber === firstNumber && firstNumber < 16) {
                        div.style.backgroundColor = 'green'; //If number is 1, color background green
                        firstNumber++; //Increment firstNumber by 1
                    } else if (divNumber !== firstNumber) {

                        /*
                        setTimeout function was helped by documentation at link below:
                        https://www.w3schools.com/jsref/met_win_settimeout.asp
                        Waits 0.5 sec before displaying alert message.
                        Had to use this so div would color red before alert displays.
                        */
                        setTimeout(function () {
                            alert('Game Over! Press Reset and then Start, to start a new game.');
                        }, 100);

                        div.style.backgroundColor = 'red';
                        timerRunning = false; //Stops game
                        clearInterval(secondsInterval); //Stop timer

                        //Button control found at: https://www.w3schools.com/jsref/prop_pushbutton_disabled.asp
                        document.getElementById('start-button').disabled = true; //Disable start button on game over

                        //Game complete functionality
                    } else {
                        if (firstNumber === 16) {

                            setTimeout(function () {
                                alert('Congratulations, you completetd the game');
                            }, 100);

                            div.style.backgroundColor = 'green';
                            timerRunning = false;
                            clearInterval(secondsInterval);
                            document.getElementById('start-button').disabled = true;
                            bestTime();
                        }
                    }

                } else {
                    alert('No game is currently running, please press Start!');
                }

            });
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
