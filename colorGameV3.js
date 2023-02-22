var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var master = document.getElementById("master");

init();

function init() {
    //mode buttons event listeners
    setupResetButton();
    setupModeButtons();
    setupSquares();
    reset();
}

function setupResetButton() {
    resetButton.addEventListener("click", function () {
        reset();
    });
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            modeButtons[3].classList.remove("selected");
            modeButtons[4].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else if (this.textContent === "Medium") {
                numSquares = 6;
            } else if (this.textContent === "Hard") {
                numSquares = 12;
            } else {
                numSquares = 36;
            }
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener("click", function () {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;

            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset() {
    //generate all new colors
    if (master.classList.contains('selected')) {
        colors = generateRandomMasterColors(numSquares);
    } else {
        colors = generateRandomColors(numSquares);
    }
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if (numSquares === 12) {
            squares[i].classList.remove("square");
            squares[i].classList.add("hard");
            squares[i].classList.remove("pro");
        } else if (numSquares === 36) {
            squares[i].classList.remove("square");
            squares[i].classList.remove("hard");
            squares[i].classList.add("pro");
        } else {
            squares[i].classList.add("square");
            squares[i].classList.remove("hard");
            squares[i].classList.remove("pro");
        }

        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.background = "rgb(70, 130, 180)";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
}

function changeColors(color) {
    //loop through all squares
    for (var i = 0; i < squares.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = [];
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256)
    //pick a "green" from 0 - 255
    var g = Math.floor(Math.random() * 256)
    //pick a "blue" from 0 - 255
    var b = Math.floor(Math.random() * 256)
    //return "rgb(r, g, b)
    return "rgb(" + r + ", " + g + ", " + b + ")";
}


function generateRandomMasterColors(num) {
    //make an array
    var arr = [];
    //generate first totally random color
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
    arr.push(rgb);
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomMasterColor(r, g, b));
    }
    //return that array
    return arr;
}

function randomMasterColor(r, g, b) {
    //pick a "red" from 0 - 255
    if (r < 86){
        r = Math.floor(Math.random() * 86);
    } else if (r > 171) {
        r = Math.floor(Math.random() * (256 - r) + r);
    } else {
        r = Math.abs(Math.floor(Math.random() * ((r + 86) - ( r - 86)) + r - 86));
    }
    //pick a "green" from 0 - 255
    if (g < 86){
        g = Math.floor(Math.random() * 86);
    } else if (g > 171) {
        g = Math.floor(Math.random() * (256 - g) + g);
    } else {
        g = Math.abs(Math.floor(Math.random() * ((g + 86) - ( g - 86)) + g - 86));
    }
    //pick a "blue" from 0 - 255
    if (b < 86){
        b = Math.floor(Math.random() * 86);
    } else if (r > 171) {
        b = Math.floor(Math.random() * (256 - b) + b);
    } else {
        b = Math.abs(Math.floor(Math.random() * ((b + 86) - ( b - 86)) + b - 86));
    }
    //return "rgb(r, g, b)
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
