/*
This piece of code was helped by the Love Maths walkthrough project
https://github.com/Code-Institute-Solutions/love-maths-2.0-sourcecode/blob/master/05-tidying-up/01-a-few-last-things/assets/js/script.js
Add event listeners to Start and Reset buttons on DOM load
Add event listeners to number divs with clickableDivs function
Functions to start and reset the game will be attached
 */
document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'start') {
                alert('You hit the Start button');
            } else if (this.getAttribute('data-type') === 'reset') {
                alert('You hit the reset button');
            } else {
                alert('No game is running, please press "Start"');
            }
        });
    }
    clickableDivs();
});

//Add eventlisteners to the divs with numbers inside, that are used to play game
function clickableDivs() {
    let divs = document.getElementsByClassName('number-div');

    for (let div of divs) {
        div.addEventListener('click', function () {
            let divNumber = parseInt(div.textContent); //Gets the number inside the div clicked
            alert(`You clicked ${divNumber}`);
        });
    }
}

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