let level = 0;
let colors = ["red", "blue", "green", "yellow"];
let game = [];
let user = [];
let audio;

function nextSequence() {
    let index = Math.floor(Math.random() * 4);
    let color = colors[index];
    game.push(color);
    let button = $("#"+color);
    button.fadeOut(100).fadeIn(100);
    playSound(color);
}

$(".btn").click(function () {
    let userColor = $(this).attr("id");
    user.push(userColor);
    animatePress(userColor);
    playSound(userColor);
    if (user[user.length - 1] == game[game.length - 1])
    {
        setTimeout(start, 500);
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over"), 200
        });
        restart();
    }
})

function playSound(name) {
    audio = new Audio("sounds/"+name+".mp3").play();
}

function animatePress(color) {
    $("#"+color).addClass("pressed");
    setTimeout(function () {
        $("#"+color).removeClass("pressed"), 100
    })
}

function start() {
    level++;
    $("h1").text("Level " + level);
    nextSequence();
}

function restart() {
    $("h1").text("Game over. Press any key to restart.");
    game = [];
    user = [];
    level = 0;
}

$(document).on("keydown", function () {
    if (level == 0) {
        start();
    }
})