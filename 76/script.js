const settings = {
    "coinSize": 5,
    "lineWidth": 0.0001,
    "lineStartOffset": true,
    "decimalPlaces": 2,
    "coinOutline": 1,
    "drawnLineWidth": 1,
    "drawnLineColor": "#ffffff",
    "spawnSpeed": 1 // higher = slower, must be a int and >= 1
};
// Don't change below this

document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click", clickHandler, false);
document.addEventListener("mousemove", getMousePos, false);

function keyDownHandler(e) {
    switch (e.key) {
        case "Enter":
            if (screen == "welcome") screen = "simulation";
            else reset();
            break;
    }
    inputMode = "key";
}
// function keyUpHandler(e) {
//     switch (e.key) {
//         case "w": case "ArrowUp": wDown = false; break;
//         case "s": case "ArrowDown": sDown = false; break;
//         case "a": case "ArrowLeft": aDown = false; break;
//         case "d": case "ArrowRight": dDown = false; break;
//         case "q": case "1": qDown = false; break;
//         case "e": case "2": eDown = false; break;
//         case "r": case "3": rDown = false; break;
//     }
// }
function clickHandler(event) {
    if (screen == "welcome") screen = "simulation";
    else reset();
}
function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    let mousePos = new Vector(event.clientX - rect.left - 6, event.clientY - rect.top - 6);
    cursorHB = new HitBox(mousePos, 10, 10);
}


function drawWelcome() {
    context.textAlign = "center";
    context.fillStyle = "#ffffff";
    context.font = 1/15 * canvas.height + "px " + font;
    context.fillText("Problem 76", canvas.width/2, canvas.height * 1/3);

    context.fillStyle = "rgba(255,255,255," + textOpacity + ")";
    context.font = 1/30 * canvas.height + "px " + font;
    context.fillText("Touch to Start", canvas.width/2, canvas.height * 1/3 + 1/15 * canvas.height);
    

    // directionsButton.draw();
    // scoresButton.draw();
}

function drawSimulation() {
    if (simFrame % settings.spawnSpeed == 0) {
        coins.push(new Coin());
        total++;
    }
    
    for (var i in coins) coins[i].draw();
    for (var i in lines) lines[i].draw();

    let percent = (noTouching/total) * 100;
    percent = percent.toFixed(settings.decimalPlaces);

    context.font = 1/20 * canvas.height + "px " + font;
    context.fillStyle = "#ffffff";
    context.textAlign = "left";
    context.fillText(percent + "%", 20, canvas.height/40 + 20);
    context.fillText(noTouching + "/" + total, 20, canvas.height/20 + 40);

    simFrame++;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let value = Math.floor(Math.random() * (max - min) + min); //The max is exclusive and the min is inclusive
    return value;
}

function reset() {
    location.reload(); // reloads the webpage
}

function drawAll() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (screen == "welcome") drawWelcome();
    else if (screen == "simulation") drawSimulation();
    

    if (textOpacity > 1) opacityDir = -0.04;
    else if (textOpacity < 0) opacityDir = 0.04;
    textOpacity += opacityDir;

    window.requestAnimationFrame(drawAll);
}

function setUpContext() {
    console.log("Window is %d by %d", window.innerWidth, window.innerHeight);
    canvas = document.getElementById("mainCanvas");
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    context = canvas.getContext("2d");
    return context;
}

var context = setUpContext();

var lines = [];
// vertical
for (var i = 0; i < canvas.width/(settings.coinSize * 8); i++) {
    let x = i * (settings.coinSize * 8) + (settings.lineStartOffset ? (settings.coinSize * 8)/2 : 0);
    lines.push(new Line(x, 0, settings.lineWidth, canvas.height));
}
for (var i = 0; i < canvas.height/(settings.coinSize * 15); i++) {
    let y = i * (settings.coinSize * 15) + (settings.lineStartOffset ? (settings.coinSize * 15)/2 : 0);
    lines.push(new Line(0, y, canvas.width, settings.lineWidth));
}


const font = "monospace";

var screen = "welcome";

var noTouching = 0;
var total = 0;
var simFrame = 0;

var textOpacity = 1;
var opacityDir = -0.04;

var coins = [];

console.log("Current Settings (change at the top of 'game.js'):" + JSON.stringify(settings));

// Fire up the animation engine
window.requestAnimationFrame(drawAll);