
var oneScore = document.getElementById("score1").innerHTML;
var twoScore = document.getElementById("score2").innerHTML;
//variables for paddles
//paddle1
var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
//paddle 2
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
//general
const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;
//variables for gameboard
const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

//Variables for the first ball
const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;
const ballHeight = document.getElementById("ball").offsetHeight;
var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

//variables for the second ball
const startTopPositionOfBall2 = document.getElementById("ball2").offsetTop;
const startLeftPositionOfBall2 = document.getElementById("ball").offsetLeft;
const ballHeight2 = document.getElementById("ball2").offsetHeight;
var topPositionOfBall2 = startTopPositionOfBall2;
var leftPositionOfBall2 = startLeftPositionOfBall2;
var topSpeedOfBall2 = 0;
var leftSpeedOfBall2 = 0;
//variables for score
var levelCounter = 1;
var scoreSound = new sound("score.mp3");
var bounceSound = new sound("bounce.mp3");
var winCounter1 = 0;
var winCounter2 = 0;
var controlPlay;
var finish = document.getElementById("finish");
//variables for speed
const speedRange = 2;
const speedMinStart = 5;
var speedMin = speedMinStart;
let message1 = "Welcome to pong";
let message2 = "You and your rival will face off in three levels ";
var headingText = ["How to play","How to play","How to play","How to play", "Level 1", "Level 2", "Level 3", "Player 1 wins!", 
"Player 2 wins!"];
var instructionText = [ "Player 1, use the W key to move your paddle up, and the S key to move it down.", 
	"Player 2, use the up arrow key to move your paddle up, and the down arrow key to move it down.",
	"To begin, hit the start button","Remember, you can pause the game at any time.",
	"Are you ready?", "Buckle up, it's going to be a bumpy ride!", "Last game; make it count!", "Player 2 lost", "Player 1 lost"];
var levelText = ["", "Level 1 - getting started", "Level 2 - picking up speed", "Level 3 - double trouble"];


window.addEventListener('load', function(){
	startBall();
	startSecondBall();
	
});

window.addEventListener('load', function(){
	showLightBox(message1,message2);
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("resume").style.visibility = "hidden";
	document.getElementById("pause").style.visibility = "hidden";

});


var con = document.querySelector("button");
var text = document.querySelector("h1");
var instructions = document.querySelector("p");
var counter = 0;
var bck = document.getElementById("back");

con.addEventListener("click", function(){
		if (counter === 1) {
			changeVisibility("back");
			
		}else if(counter === 4){
			changeVisibility("finish");
			changeVisibility("continue");
			changeVisibility("back");
		}else if(counter === 5 ){
			changeVisibility("finish");
			changeVisibility("continue");
		}else if(counter === 6){
			changeVisibility("finish");
			changeVisibility("continue");

		}

		if(levelCounter == 4){
			if(winCounter1 > winCounter2){
				document.getElementById("message1").innerHTML = headingText[7];
				document.getElementById("message2").innerHTML = instructionText[7];
				changeVisibility("x");
				changeVisibility("startNewGame");
				changeVisibility ("continue");
			}else if (winCounter2 > winCounter1) {
				document.getElementById("message1").innerHTML = headingText[8];
				document.getElementById("message2").innerHTML = instructionText[8];
				changeVisibility("x");
				changeVisibility("startNewGame");
				changeVisibility ("continue");
			}
		}else{
			document.getElementById("message1").innerHTML = headingText[counter];
			document.getElementById("message2").innerHTML = instructionText[counter];
		}
		counter = counter + 1;
});
bck.addEventListener("click", function(){
		 
		document.getElementById("message1").innerHTML = headingText[--counter];
		document.getElementById("message2").innerHTML = instructionText[--counter];
		counter = counter - 1;
		
		counter++;
});

document.addEventListener('keydown', function(e){
	//console.log("key down " + e.keyCode);

	if(e.keyCode == 87 || e.which == 87){
		speedOfPaddle1 = -10;

	}
	if(e.keyCode == 83 || e.which == 83){
		speedOfPaddle1 = 10;
	}

	if(e.keyCode == 38 || e.which == 38){
		speedOfPaddle2 = -10;

	}
	if(e.keyCode == 40 || e.which == 40){
		speedOfPaddle2 = 10;
	}
});

document.addEventListener('keyup', function(e){
	//console.log("key up " + e.keyCode);
	if(e.keyCode == 83 || e.which == 83){
		speedOfPaddle1 = 0;
	}
	//console.log("key up " + e.keyCode);
	if(e.keyCode == 40 || e.which == 40){
		speedOfPaddle2 = 0;
	}
});
https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function startBall(){
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;

	if (Math.random() < 0.5) {
		direction = 1;
	}else{
		direction = -1;
	}//if

	if(levelCounter == 1){
		topSpeedOfBall = Math.random() *2 + 3;
		leftSpeedOfBall = direction *(Math.random()*2 + 3);
	}else if(levelCounter == 2){
		topSpeedOfBall = (Math.random() * speedRange + speedMin);
		leftSpeedOfBall = direction *(Math.random() * speedRange + speedMin);
		if(oneScore >= 5 || twoScore >= 5){
			speedMin++;
		}//if
	}else if(levelCounter == 3){
		topSpeedOfBall = (Math.random() * speedRange + speedMin);
		leftSpeedOfBall = direction *(Math.random() * speedRange + speedMin);
		if(oneScore >= 3 || twoScore >= 3){
			speedMin++;
		}//if
	}
	
}//startBall

function startSecondBall(){
	let direction2 = 1;
	topPositionOfBall2 = startTopPositionOfBall2;
	leftPositionOfBall2 = startLeftPositionOfBall2;

	if (Math.random() < 0.5) {
		direction2 = 1;
	}else{
		direction2 = -1;
	}

	if(levelCounter == 3){
		topSpeedOfBall2 = (Math.random() * speedRange + speedMin);
		leftSpeedOfBall2 = direction2 *(Math.random() * speedRange + speedMin);
		if(oneScore >= 3 || twoScore >= 3){
			speedMin++;
		}//if
	}
	
}//startBall

function show (){

	positionOfPaddle1 += speedOfPaddle1; 
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	if(levelCounter == 3){
		topPositionOfBall2 += topSpeedOfBall2;
		leftPositionOfBall2 += leftSpeedOfBall2;
	}//if
	
	
	if(positionOfPaddle1 <= 0){
		positionOfPaddle1 = 0;
	}//if
	if(positionOfPaddle2 <= 0){
		positionOfPaddle2 = 0;
	}//if

	if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	}
	if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	}

	if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
		topSpeedOfBall *= -1;
	}
	if (topPositionOfBall2 <= 0 || topPositionOfBall2 >= gameboardHeight - ballHeight2) {
		topSpeedOfBall2 *= -1;
	}
	
		if (leftPositionOfBall <= paddleWidth) { 
			if(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
				bounceSound.play();
				leftSpeedOfBall *= -1;
			}else{
				scoreSound.play();
				startBall();
				twoScore++;
				document.getElementById("right").innerHTML = "Player 2: " + twoScore;
			}//else
		}//if
		if (leftPositionOfBall2 <= paddleWidth) { 
			if(topPositionOfBall2 > positionOfPaddle1 && topPositionOfBall2 < positionOfPaddle1 + paddleHeight){
				bounceSound.play();
				leftSpeedOfBall2 *= -1;
			}else{
				scoreSound.play();
				startSecondBall();
				twoScore++;
				document.getElementById("right").innerHTML = "Player 2: " + twoScore;
			}//else
		}//if



		if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) { 
			if(topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
				bounceSound.play();
				leftSpeedOfBall *= -1;
			}else{
				scoreSound.play();
				startBall();
				oneScore++;
				document.getElementById("left").innerHTML = "Player 1: " + oneScore;
			}//else
		}//if
		if (leftPositionOfBall2 >= gameboardWidth - paddleWidth - ballHeight2) { 
			if(topPositionOfBall2 > positionOfPaddle2 && topPositionOfBall2 < positionOfPaddle2 + paddleHeight){
				bounceSound.play();
				leftSpeedOfBall2 *= -1;
			}else{
				scoreSound.play();
				startSecondBall();
				oneScore++;
				document.getElementById("left").innerHTML = "Player 1: " + oneScore;
			}//else
		}//if

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
	document.getElementById("ball2").style.top = topPositionOfBall2 + "px";
	document.getElementById("ball2").style.left = leftPositionOfBall2 + "px";


	if(twoScore == 11|| oneScore == 11){
		stopGame();
	}
}//show

function resumeGame(){
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	}//if
}//resumeGame

function pauseGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
}


function startGame(){
	speedMin = speedMinStart;
	oneScore = 0;
	twoScore = 0;
	document.getElementById("level").innerHTML = levelText[levelCounter];
	document.getElementById("left").innerHTML = "Player 1: " + 0;
	document.getElementById("right").innerHTML = "Player 2: " + 0;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	}//if
	startBall();
	startSecondBall();
	if(levelCounter == 3){
		document.getElementById("ball2").removeAttribute("class");
	}
	document.getElementById("start").style.visibility = "hidden";

}

function stopGame(){
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("resume").style.visibility = "hidden";
	document.getElementById("pause").style.visibility = "hidden";
	window.clearInterval(controlPlay);
	controlPlay = false;
	message1 = "Tie game";
	message2 = "close to continue";


	if (twoScore === 11) {
		message1 = "Player 2 won with 11 points";
		message2 = "Player 1 had " + oneScore + " points";
		winCounter2++;
	}else if(oneScore === 11){
		message1 = "Player 1 won with 11 points";
		message2 = "Player 2 had " + twoScore + " points";
		winCounter1++;
	}
	levelCounter  = levelCounter + 1;

		document.getElementById("startNewGame").className = 'hidden';
	
	showLightBox(message1,message2);
	changeVisibility("finish");
	changeVisibility("continue");
}//


function changeVisibility(divID){
	var element = document.getElementById(divID);
	if(element){
		element.className = (element.className == 'hidden')? 'unhidden':'hidden';
	}//if
}//changeVisibility

function showLightBox(message1,message2){
	document.getElementById("message1").innerHTML = message1;
	document.getElementById("message2").innerHTML = message2;
	changeVisibility("boundaryMessage");
	changeVisibility("positionMessage");
	changeVisibility("lightbox");
}

function continueGame(){
	document.getElementById("start").style.visibility = "visible";
	document.getElementById("resume").style.visibility = "visible";
	document.getElementById("pause").style.visibility = "visible";
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	changeVisibility("positionMessage");
	
}//continueGame

function resetGame(){
	let direction2 = 1;
	topPositionOfBall2 = startTopPositionOfBall2;
	leftPositionOfBall2 = startLeftPositionOfBall2;
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	topSpeedOfBall = Math.random() *2 + 3;
	leftSpeedOfBall = direction *(Math.random()*2 + 3);
	winCounter1 = 0;
	winCounter2 = 0;
	levelCounter = 1;
	speedMin = speedMinStart;
	oneScore = 0;
	twoScore = 0;
	document.getElementById("level").innerHTML = levelText[levelCounter];
	document.getElementById("left").innerHTML = "Player 1: " + 0;
	document.getElementById("right").innerHTML = "Player 2: " + 0;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	changeVisibility("positionMessage");
	changeVisibility("finish");
	changeVisibility("x");
	document.getElementById("start").style.visibility = "visible";
	document.getElementById("resume").style.visibility = "visible";
	document.getElementById("pause").style.visibility = "visible";
	document.getElementById("ball2").setAttribute("class","visibilityhidden");
	counter = 5;
} 

