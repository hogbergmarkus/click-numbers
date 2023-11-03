/**
 * This piece of code was helped by the Love Maths walkthrough project
 * https://github.com/Code-Institute-Solutions/love-maths-2.0-sourcecode/blob/master/05-tidying-up/01-a-few-last-things/assets/js/script.js
 * Add event listeners to Start and Reset buttons on DOM load
 * Functions to start and reset the game will be attached
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
});

//Creates an array and fills it randomly with numbers 1-16
function randomArray() {
    let array = [];
    while (array.length < 16) {
        let number = Math.floor(Math.random() * 16) + 1;
        if (array.includes(number)) {
            continue;
        } else {
            array.push(number);
        }
    }
    return array;
}