var buttonColors= ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userClickedPattern= [];
var level = 0;
let started = false;

start(started=true);

function start(started){
    if(started){
        $(document).on('keydown',function () { 
            nextSequence();
        });
    }else{
        $(document).off('keydown');
    }
}

function nextSequence(){
    console.log("called");
    start(started=false);
    level++;
    $("#level-title").html("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    showSequence(randomChoosenColor);
}

function showSequence(color){
    $("#"+color).fadeOut(100).fadeIn(100);
    playSound(color);
}

function checkAnswer(ind){
    if(gamePattern[ind] === userClickedPattern[ind]){
        console.log("True");
    }else{
        console.log("False");
        gameOver();
    }
    if((ind+1) === level){
        userClickedPattern = [];
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}

function gameOver(){
    $("body").addClass("game-over");
    $("#level-title").html("Game Over, Press Any Key to Restart");
    playSound("wrong");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    start(started=true);
    startOver();
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


$(".btn").on("click", function(e){
    var userChosenColor = e.target.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor)
    checkAnswer(userClickedPattern.length-1);
})

function playSound(color){
    switch(color)
    {
        case "blue":
            var blue = new Audio("/sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("/sounds/green.mp3");
            green.play();
            break; 
        case "red":
            var red = new Audio("/sounds/red.mp3");
            red.play();
            break; 
        case "yellow":
            var yellow = new Audio("/sounds/yellow.mp3");
            yellow.play();
            break; 
        case "wrong":
            var wrong = new Audio("/sounds/wrong.mp3");
            wrong.play();
            break;  
        default : console.error();
    }
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}