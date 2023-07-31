let simonSteps = [];
let num = 1;
let count = 0;
let gameOverBool = true;
$(".cube").click((event) => {
    let clickColor = event.target.getAttribute("id");
    playSound(clickColor);
    glowEffect(clickColor);

    if($("#title").html() != "Game Over, Press Any Key to Restart"){
        gameOverBool = true;
    }

    setTimeout(() => {
        if (simonSteps.length === num && clickColor === simonSteps[count] && gameOverBool) {
                if($("#gameLevel").text() == (count+1)){
                    fadeEffect();
                    $("#gameLevel").text(num+1);
                    count = 0;
                } else {
                    count++;
                    num--;
                }
                num++;  
            } else if (gameOverBool) {
                gameOver();
                gameOverBool = false;
            } else {
                $("body").addClass("bg-red");
                playSound("wrong");
                setTimeout(() => {
                    $("body").removeClass("bg-red");
                }, 200);
            }
    }, 100);
    
});

$(document).one("keydown", () => {
    $("span").html("Level <span id='gameLevel'>1</span>");
    fadeEffect();
});

function fadeEffect() {
    let colorArray = ["green", "red", "yellow", "blue"];
    randomNum = Math.round(Math.random() * 3);

    $("#" + colorArray[randomNum]).fadeOut(100);
    $("#" + colorArray[randomNum]).fadeIn(100);

    simonSteps.push(colorArray[randomNum]);
}

function glowEffect(clickColor) {
    $("#" + clickColor).addClass("glow");
    setTimeout(() => {
        $("#" + clickColor).removeClass("glow");
    }, 50);
}

function playSound(sound) {
    var audio = new Audio("./sounds/" + sound + ".mp3");
    audio.play();
}

function gameOver() {
    $("#title").html("Game Over, Press Any Key to Restart");
        
        $("body").addClass("bg-red");
        playSound("wrong");
        setTimeout(() => {
            $("body").removeClass("bg-red");
        }, 200);

        if (simonSteps != 0){
            $(document).one("keydown", () => {
                simonSteps = [];
                num = 1;
                count = 0;

                $("span").html("Level <span id='gameLevel'>1</span>");
                fadeEffect();
            });
        }       
}
