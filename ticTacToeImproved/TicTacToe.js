let currentPlayer = "X";
let gameStatus = "";
let numTurns = 0; 
let idNames = ["one","two","three","four","five","six","seven","eight","nine"];
let cornerCut1 = ["three","seven","nine"];




function playerTakeTurn(e){
	if(e.innerHTML == ""){
		e.innerHTML= currentPlayer;
		checkGameStatus();

		if (gameStatus == "") {
			setTimeout(function(){
				computerTakeTurn();
				checkGameStatus();
				}, 500
			);
		}//if
	}//if
	else{
		showLightBox("This box is already selected."," Please try again.");
	
		return;
	}//ifElse

	
}//player take turn

function newGame(){
	for (var i = 0;i < idNames.length; i++) {
		document.getElementById(idNames[i]).innerHTML = "";
	}//for

	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";
	changeVisibility("controls");
}//newGame

function computerTakeTurn(){
	
	let idName = "";
	let one = document.getElementById(idNames[0]).innerHTML;
	let two = document.getElementById(idNames[1]).innerHTML;
	let three = document.getElementById(idNames[2]).innerHTML;
	let four = document.getElementById(idNames[3]).innerHTML;
	let five = document.getElementById(idNames[4]).innerHTML;
	let six = document.getElementById(idNames[5]).innerHTML;
	let seven = document.getElementById(idNames[6]).innerHTML;
	let eight = document.getElementById(idNames[7]).innerHTML;
	let nine = document.getElementById(idNames[8]).innerHTML;

	do{
		if(one == ""){	
			if (two == "O" && two == three || four == "O" && four == seven || five == "O" && five == nine) {
				document.getElementById(idNames[0]).innerHTML = currentPlayer;
				break;
			}//innerIf
		}//ifElse

		if (two == "") {	
			if(one == "O" && one == three || five == "O" && five == eight) {
				document.getElementById(idNames[1]).innerHTML = currentPlayer;
				break;
			}//ifElse2
		}//if
		if (three == "") {
			if(one == "O" && one == two || six == "O" && six == nine || five == "O" && five == seven){
				document.getElementById(idNames[2]).innerHTML = currentPlayer;
				break;
			}
		}//if
		if (four == "") {
			if(one == "O" && one == seven || six == "O" && six == five){
				document.getElementById(idNames[3]).innerHTML = currentPlayer;
				break;
			}
		}//if
		if (five == "") {
			if (four == "O" && four == six || one == "O" && one == nine || 
				three == "O" && three == seven || two == "O" && two == eight) {
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}
		}//if
		if (six == "") {
			if(three == "O" && three == nine || four == "O" && four == five){
				document.getElementById(idNames[5]).innerHTML = currentPlayer;
				break;
			}
		}//if
		if (seven == "") {
			if(one == "O" && one == four || eight == "O" && eight == nine || five == "O" && five == three){
				document.getElementById(idNames[6]).innerHTML = currentPlayer;
				break;
			}//if
		}//if
		if (eight == "") {
			if(two == "O" && two == five || seven == "O" && seven == nine){
				document.getElementById(idNames[7]).innerHTML = currentPlayer;
				break;
			}
		}
		if (nine == "") {
			if(one == "O" && one == five || seven == "O" && seven == eight ||three == "O" && three == six){
				document.getElementById(idNames[8]).innerHTML = currentPlayer;
				break;
			}
		}

		if(one == ""){	
			if (two == "X" && two == three || four == "X" && four == seven || five == "X" && five == nine) {
				document.getElementById(idNames[0]).innerHTML = currentPlayer;
				break;
			}//innerIf
		}//ifElse

		if (two == "") {	
			if(one == "X" && one == three || five == "X" && five == eight) {
				document.getElementById(idNames[1]).innerHTML = currentPlayer;
				break;
			}//ifElse2
		}//if
		if (three == "") {
			if(one == "X" && one == two || six == "X" && six == nine || five == "X" && five == seven){
				document.getElementById(idNames[2]).innerHTML = currentPlayer;
				break;
			}
		}//if
		if (four == "") {
			if(one == "X" && one == seven || six == "X" && six == five){
				document.getElementById(idNames[3]).innerHTML = currentPlayer;
				break;
			}
		}//if
		if (five == "") {
			if (four == "X" && four == six || one == "X" && one == nine || 
				three == "X" && three == seven || two == "X" && two == eight) {
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}
		}//if
		if (six == "") {
			if(three == "X" && three == nine || four == "X" && four == five){
				document.getElementById(idNames[5]).innerHTML = currentPlayer;
				break;
			}
		}//if
		if (seven == "") {
			if(one == "X" && one == four || eight == "X" && eight == nine || five == "X" && five == three){
				document.getElementById(idNames[6]).innerHTML = currentPlayer;
				break;
			}//if
		}//if
		if (eight == "") {
			if(two == "X" && two == five || seven == "X" && seven == nine){
				document.getElementById(idNames[7]).innerHTML = currentPlayer;
				break;
			}
		}
		if (nine == "") {
			if(one == "X" && one == five || seven == "X" && seven == eight ||three == "X" && three == six){
				document.getElementById(idNames[8]).innerHTML = currentPlayer;
				break;
			}
		}

		if(one == "X"){
			if (five == "") {
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}else if(four == ""){
				document.getElementById(idNames[3]).innerHTML = currentPlayer;
				break;
			}else if(two == ""){
				document.getElementById(idNames[1]).innerHTML = currentPlayer;
				break;
			}//ifElse
		}//ifElse

		if(two == "X"){
			if (one == "") {
				document.getElementById(idNames[0]).innerHTML = currentPlayer;
				break;
			}else if(five == ""){
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}else if(three == ""){
				document.getElementById(idNames[2]).innerHTML = currentPlayer;
				break;
			}//ifElse
		}//ifElse

		if(three == "X"){
			if (two == "") {
				document.getElementById(idNames[1]).innerHTML = currentPlayer;
				break;
			}else if(six == ""){
				document.getElementById(idNames[5]).innerHTML = currentPlayer;
				break;
			}else if(five == ""){
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}//ifElse
		}//ifElse

		if(four == "X"){
			if (one == "") {
				document.getElementById(idNames[0]).innerHTML = currentPlayer;
				break;
			}else if(seven == ""){
				document.getElementById(idNames[6]).innerHTML = currentPlayer;
				break;
			}else if(five == ""){
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}//ifElse
		}//ifElse
		
		if(five == "X"){
			if (one == "") {
				document.getElementById(idNames[0]).innerHTML = currentPlayer;
				break;
			}else if (two == "") {
				document.getElementById(idNames[1]).innerHTML = currentPlayer;
				break;
			}else if(seven == ""){
				document.getElementById(idNames[6]).innerHTML = currentPlayer;
				break;
			}else if (three == "") {
				document.getElementById(idNames[2]).innerHTML = currentPlayer;
				break;
			}else if(four == ""){
				document.getElementById(idNames[3]).innerHTML = currentPlayer;
				break;
			}else if (six == "") {
				document.getElementById(idNames[5]).innerHTML = currentPlayer;
				break;
			}else if (eight == "") {
				document.getElementById(idNames[7]).innerHTML = currentPlayer;
				break;
			}else if (nine == "") {
				document.getElementById(idNames[8]).innerHTML = currentPlayer;
				break;
			}
		}//ifElse

		if(six == "X"){
			if (three == "") {
				document.getElementById(idNames[2]).innerHTML = currentPlayer;
				break;
			}else if(nine == ""){
				document.getElementById(idNames[8]).innerHTML = currentPlayer;
				break;
			}else if(five == ""){
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}
		}//ifElse
		
		if(seven == "X"){
			if (four == "") {
				document.getElementById(idNames[3]).innerHTML = currentPlayer;
				break;
			}else if(eight == ""){
				document.getElementById(idNames[7]).innerHTML = currentPlayer;
				break;
			}else if(five == ""){
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}
		}//ifElse
		if(eight == "X"){
			if (seven == "") {
				document.getElementById(idNames[6]).innerHTML = currentPlayer;
				break;
			}else if(nine == ""){
				document.getElementById(idNames[8]).innerHTML = currentPlayer;
				break;
			}else if(five == ""){
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}
		}//ifElse

		if(nine == "X"){
			if (six == "") {
				document.getElementById(idNames[5]).innerHTML = currentPlayer;
				break;
			}else if(eight == ""){
				document.getElementById(idNames[7]).innerHTML = currentPlayer;
				break;
			}else if(five == ""){
				document.getElementById(idNames[4]).innerHTML = currentPlayer;
				break;
			}
		}//ifElse

	}while(true);
}//computer take turn

function checkGameStatus(){
	numTurns++;
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
	
	}
	if(numTurns === 9){
		gameStatus = "It's a tie!";
	
	}
	currentPlayer = (currentPlayer == "X"? "O":"X");

	if(gameStatus!= ""){
		setTimeout(function() {showLightBox(gameStatus,"Game over!");}, 500);

	}
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
		(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9])||(cb[1] != "" && cb[1] == cb[4]&& cb[4] == cb[7])||
		(cb[2] != "" && cb[2] == cb[5]&& cb[5] == cb[8])||(cb[3] != "" && cb[3] == cb[6]&& cb[6] == cb[9])||
		(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9])|| (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7])){
		return true;
	}
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
}

function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	if (gameStatus != "") {
		changeVisibility("controls");
	}//if
}//continueGame
