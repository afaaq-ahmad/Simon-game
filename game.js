
let userClickedPAttern = [];
let gamePattern = [];
let ButtonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let index = 0;
let caller = 0;
let count = true;

$(".btn").click(function(){
    caller++;
    var userChosenColor = $(this).attr("id");
    userClickedPAttern.push(userChosenColor);
    console.log(userClickedPAttern);
    animatePress(userChosenColor);
    index = gamePattern.length;
    if(caller === index){
        caller = 0;
        if(checkInputs()){
            playSound(userChosenColor);
            userClickedPAttern.splice(0,userClickedPAttern.length);
            setTimeout(() =>{
                nextSequence();
            }, 1000);
        }
        else{
            caller = 0;
            userClickedPAttern.splice(0,userClickedPAttern.length);
            gamePattern.splice(0,gamePattern.length);
            failed();
            count = true;
            level = 0;
            playSound("wrong");
       }
    }
    else if(checkInputs()){
        playSound(userChosenColor);
    }
    else{
        userClickedPAttern.splice(0,userClickedPAttern.length);
        gamePattern.splice(0,gamePattern.length);
        failed();
        caller = 0;
        count = true;
        level = 0;
        playSound("wrong");
    }

});

function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    var randomNumber  = Math.floor(Math.random()*4);
    let randomChosenColor = ButtonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(clicked){

    $("#" + clicked).addClass("pressed");
    setTimeout(function(){
        $("#" + clicked).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    if(count){
        $("h1").text("Level " + level);
        nextSequence();
        count = false;
    }
    
});


function checkInputs(){
    for(let i = 0; i<userClickedPAttern.length;  i++){
        if(userClickedPAttern[i] === gamePattern[i]){
        }
        else{
            return false;
        }
    }
    return true;
}

function failed(){
    $("body").addClass("failed");
    setTimeout(() =>{
        $("body").removeClass("failed");
    }, 200);
    $("h1").text("Failed at level " + level + " . Press any key to restart");
}
