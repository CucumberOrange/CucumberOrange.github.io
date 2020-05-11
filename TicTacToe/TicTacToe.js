
let currentPlayer = "X";
let gameStatus = "";
let numTurns = 0; 
function playerTakeTurn(e){
	if(e.innerHTML == ""){
		e.innerHTML= currentPlayer;
		checkGameStatus();
	}else{
		showLightBox("This box is already selected."," Please try again.");
		return;
	}//ifElse

	if(gameStatus!= ""){
		showLightBox(gameStatus,"Game over!");
	}//if
}//player take turn

function checkGameStatus(){
	numTurns++;
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
	}//if
	if(numTurns === 9){
		gameStatus = "It's a tie!";
	}//if
	currentPlayer = (currentPlayer == "X"? "O":"X");
}//checkGameStatus

function checkWin(){
	let cb = [];//current board
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	//top
	if((cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3])|| (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6])||
		(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9])||(cb[1] !="" && cb[1] == cb[4]&& cb[4] == cb[7])||
		(cb[2] != "" && cb[2] == cb[5]&& cb[5] == cb[8])||(cb[3] !="" && cb[3] == cb[6]&& cb[6] == cb[9])||
		(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9])|| (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7])){
		return true;
	}//if
}//checkWin

function changeVisibility(divID){
	var element = document.getElementById(divID);
	if(element){
		element.className = (element.className == 'hidden')? 'unhidden':'hidden';
	}//if
}//changeVisibility

function showLightBox(message,message2){
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}//showLightBox

function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}//continueGame
