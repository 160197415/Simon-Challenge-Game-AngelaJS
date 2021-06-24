var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;



$(document).keypress(function(){

    if(!started){
        $("#level-title").text("level" +  level);
        nextSequence();
        started = true;


    }
});

function checkingAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        console.log("Success!!")

    
    if (userClickedPattern.length === gamePattern.length){

        setTimeout(function(){
            nextSequence();}
        , 1000);
    }

} else {
    console.log("Wrong!!!");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    
    
    }

}


function animatePress(currentColour){
    


    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    
    }


$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkingAnswer(userClickedPattern.length-1)
    
});


function nextSequence(){
    /**8.6. Once nextSequence() is triggered,
     *reset the userClickedPattern to an empty array 
     ready for the next level.
     this one is for checking answer */
    userClickedPattern = [];

    /*the part below was added when the level + keypress function was made*/
    level ++;

    $("#level-title").text("Level " + level);

    /* ------------------------------------------------*/


    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    console.log(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}



function playSound(name){

    
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();

}



function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    
}

