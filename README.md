# clickNumbers

## Introduction

[clickNumbers](https://hogbergmarkus.github.io/click-numbers/)
is a website aimed at people that want some light entertainment,

while also getting exercise for their mind and a chance to compete against themselves.

The game provided is easy to understand, it is fun, and can also form a small

amount of addiction as you are trying to beat your best time.

## Table of contents

- [clickNumbers](#clicknumbers)
  - [Introduction](#introduction)
  - [Table of contents](#table-of-contents)
  - [Website owner and user goals](#website-owner-and-user-goals)
    - [Goals of the website owner](#goals-of-the-website-owner)
    - [Goals of the user](#goals-of-the-user)
  - [Website owner and user stories](#website-owner-and-user-stories)
    - [Website owner story](#website-owner-story)
    - [User story](#user-story)
  - [Design](#design)
    - [Wireframes](#wireframes)
    - [Fonts](#fonts)
    - [Colors](#colors)
  - [Features](#features)
    - [Start button](#start-button)
    - [Reset button](#reset-button)
    - [Cursor](#cursor)
    - [Game numbers](#game-numbers)
    - [Timer](#timer)
    - [Best time](#best-time)
  - [Features to add](#features-to-add)
  - [Deployment](#deployment)
  - [Languages](#languages)
  - [Technologies used](#technologies-used)
  - [Testing](#testing)
    - [Validation](#validation)

## Website owner and user goals

### Goals of the website owner

1. The goal is to attract people to the website using a fun and interactive game.
2. The owner wants people to stay on the website.
3. People should come back to play more games.

### Goals of the user

1. The user wants an easily accessible game to play on a device of their choosing.
2. The game should provide some challenge so it does not get boring.
3. It has to be simple to pick up and play whenever they want to kill some time.

## Website owner and user stories

### Website owner story

For the owner it is important that people want to stay on the website, as well

as that the users come back to play more games.

Using a timer or other similar game element, should provide a competitive touch

that will help achieve those goals.

With enough traffic and retention on the website, add revenue would be possible.

### User story

The user is looking for something to pass time, and that something should also

provide a challenge. It has to be fast and easy to pick up and play wherever they are.

If the game lets them compete against themselves they are sure to come back for more.

## Design

### Wireframes

Here you will find the link to my wireframes from the design phase:

[Wireframes](https://github.com/hogbergmarkus/click-numbers/tree/main/documentation/wireframes)

### Fonts

1. Playpen Sans was chosen as the main font. I liked it for its playful looks,

    and felt it was well suited to give a joyful style to the pages otherwise
    simple styling.

2. Lato was chosen as a backup, because of its wide compatibility, readability,
    and modern style.

### Colors

I chose to keep the colors muted an simple, because I didnt want to distract the

player, while they try to find the correct numbers.

Also, the gray background with white text reminds me of sitting in my IDE,
which I quite enjoy.

## Features

### Start button

- The start button has to be pressed for game to start, otherwise an alert will tell

    you that no game is running, please press start.

- Button has a hover effect
- When the game is completed, or you hit Game Over, button is disabled to stop players
  
  from just starting from where game over was hit, or starting game without resetting the board.
  
- Starts the game and the timer.
  
### Reset button

- Reset button has a hover effect.
- The button has multiple functions build into itself:
  
1. It resets the board, filling the divs with new randomly placed numbers.
2. It resets the colors of the divs, wich were colored by clicks in previous game.
3. It resets the timer to 0.
4. It stops the game, so start has to be pressed again to play a new game.
5. It also resets the order of which numbers are to be clicked.

- At the en of the game, or game over, Reset has to be pressed before a new game can start.

### Cursor

The cursor will change shape when hovered above the clickable numbers.

### Game numbers

- The numbers placement is randomized, and will change position each game.
- When clicked in correct order, background will color green.
- When clicked incorrectly, background will color red.
- If clicked wile no game is running, an alert will prompt you to start a game.

### Timer

- Timer will start when game starts.
- It stops when game is completed or game over.
- Resets when reset button us pressed.

### Best time

The first game completed will be logged to the screen, so the coming attempts will

have something to be compared to.

The best time feature will look at the time on the timer when game is completed,

and if you beat your previous time, it will log your new best time to the screen.

## Features to add

- The game when fully developed, would have multiple difficulty levels.

    Each harder level would have an increased amount of numbers to click through.

- For the hardest setting, the colors could be removed from numbers that are clicked,

    that way it would be harder to keep track of numbers already clicked.

    It would also be harder to find the numbers you are looking for, since there would

    be no visual cues.

- There could be a login, to be able to save your score.

- Sounds can be added.

- There can be an option to change the numbers for colors instead.

## Deployment

1. From my [Github](https://github.com/hogbergmarkus/click-numbers) repository for the project.
2. Click the settings icon in the top navigation menu.
3. In the lefthand side menu, click Pages.
4. Choose deploy from branch.
5. Select "main" and "/(root)".
6. Click Save.

Here is a link to my deployed wedsite: [clickNumbers](https://hogbergmarkus.github.io/click-numbers/)

## Languages

Languages used during this project:

1. JavaScript
2. HTML
3. CSS
4. Markdown

## Technologies used

- [CodeAnywhere](https://codeanywhere.com/solutions/collaborate), cloud based IDE.
- [Github](https://github.com/), for documentation and deployment.
- [Slack](https://slack.com/), for cummunication and community
- [Balsamiq](https://balsamiq.com/), for creating wireframes.
- [Google Fonts](https://fonts.google.com/), for text styling.
- [Google](https://www.google.com/), search tool.
- Chrome developer tools.

## Testing

### Validation

HTML was validated using [W3C Markup Validation Service](https://validator.w3.org/#validate_by_input)
with no errors or warnings.

CSS was validated using [W3C CSS Validation Service (Jigsaw)](https://jigsaw.w3.org/css-validator/#validate_by_input)
with no errors or warnings.
