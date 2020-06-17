const level = [
//level 0
	["flag", "rock","","","rider",
	"fence", "archer", "shoot","shoot","shoot",
	"","tree","animate","animate","animate",
	"","water","","horseup","",
	"","fenceside","","",""],
	//level 1
	["flag","water","","","rider",
	"fence","bridge archer","shoot","shoot","shoot",
	"animate", "bridge animate", "animate","animate","animate",
	"","water","","","",
	"","water","horseup","",""],

	["tree","tree","flag","tree","tree",
	"animate","animate","animate","animate","animate",
	 "water","bridge","water","water","water",
	"archer","shoot","shoot","shoot","rock",
	"horseup","","rider","rock","tree"],

	 ["wallside","wall", "wall", "wall", "wallside",
	 "wallside", "","animate","fenceside" , "horseleft",
	 "wallside","","animate","wallside", "rider",
	 "archer","shoot","shoot","shoot","wall",
	 "flag","","","",""]
];



const obstacles = ["rock", "tree", "water","wall","wallside","archer","archer bridge"];

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0;
var riderOn = false;
var currentLocationOfHorse = 0;
var currentAnimation;//allows for one animation/level
var archerAnimation;
var widthOfBoard = 5;
var heightOfBoard = 5;
//sound
var lose = new sound("lose.mp3");
var thud = new sound("thud.mp3");
var jump = new sound("jump.mp3");
var step = new sound("step.mp3");
var fanfare = new sound("fanfare.mp3");
let enemyClass = "";
//lives 
var live1 = document.getElementById("live1");
var	live2 = document.getElementById("live2");
var	live3 = document.getElementById("live3");
var	lostLife = 0;
var seconds = 0;
var countDown = 0;
var locationOfEnemy = 0;
var locationOfEnemy2 = 0;
var locationOfEnemy3 = 0;

let levelMap = 0;
let animateBoxes;
let animateShoot;
var controlPlay;
var paused = 0;
	//load board
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("load", function(){
	setTimer(currentLevel);
	loadLevel();
	clearInterval(countDown);
	if (currentLevel >= 1) {
		clearInterval(countDown);
	}
});


document.addEventListener("keydown", function(e){

	if(seconds != 0 && lostLife != 3){
		switch(e.keyCode){
			case 37:
				if (currentLocationOfHorse % widthOfBoard !== 0) {
					tryToMove("left");
				}
				break;
			case 38:
				if (currentLocationOfHorse - widthOfBoard >= 0) {
					tryToMove("up");
				}
				break;
			case 39: 
				if (currentLocationOfHorse % widthOfBoard < widthOfBoard - 1) {
					tryToMove("right");
				}
				break;
			case 40:
				if (currentLocationOfHorse + widthOfBoard < 25) {
					tryToMove("down");
				}
				break;		
		}//switch	
	}	
});

function tryToMove(direction){
	let oldLocation = currentLocationOfHorse;
	let oldClassName = gridBoxes[oldLocation].className;
	let nextLocation = 0; //where we move next
	let nextClass = "";
	let nextLocation2 = 0; //where we move next
	let nextClass2 = "";//nlocation we want to move o
	let newClass = "";//if move is succssful, mpve

	switch(direction){
		case "left":
			nextLocation = currentLocationOfHorse - 1;
			break;
		case "right":
			nextLocation = currentLocationOfHorse + 1;
			break;
		case "up":
			nextLocation = currentLocationOfHorse - widthOfBoard;
			break;
		case "down":

			nextLocation = currentLocationOfHorse + widthOfBoard;
			break;
	}//switch

	nextClass = gridBoxes[nextLocation].className;
	if (obstacles.includes(nextClass)) {return;}
	//fence, but no rider

	if(!riderOn && nextClass.includes("fence")){return;}
	//if fence, move two spaces
	if(nextClass.includes("fence")){

		//rider must be on to jump
		if(riderOn){
			gridBoxes[currentLocationOfHorse].className = "";
			oldClassName = gridBoxes[nextLocation].className;
			if (direction == "left") {
				jump.play();
				nextClass = "jumpleft";
				nextClass2 = "horseriderleft";
				nextLocation2  = nextLocation - 1;
			}else if(direction == "right"){
				jump.play();
				nextClass = "jumpright";
				nextClass2 = "horseriderright";
				nextLocation2  = nextLocation + 1;
			}else if (direction == "up") {
				jump.play();
				nextClass = "jumpup";
				nextClass2 = "horseriderup";
				nextLocation2 = nextLocation - widthOfBoard;
			}else if (direction == "down") {
				jump.play();
				nextClass = "jumpdown";
				nextClass2 = "horseriderdown";
				nextLocation2 = nextLocation + widthOfBoard;
			}

			//show jumping horse

			gridBoxes[nextLocation].className = nextClass;
			setTimeout(function(){
				gridBoxes[nextLocation].className = oldClassName;
				currentLocationOfHorse = nextLocation2;
				nextClass = gridBoxes[currentLocationOfHorse].className;
				//show them after fence
				gridBoxes[currentLocationOfHorse].className = nextClass2;
				levelUp(nextClass);
			}, 350);
			return;
		}//rideron
	}//if class has fence
	//if there is a rider, move forwards and add rider
	if (nextClass == "rider") {
		step.play();
		riderOn = true;
	}
	
	//if there is a bridge in the old location keep it.
	if (oldClassName.includes("bridge")) {
		gridBoxes[oldLocation].className = "bridge";
	}else{
		gridBoxes[oldLocation].className = "";
	}
	// build name of new class
	newClass = (riderOn)? "horserider": "horse";
	newClass = newClass + direction;
	//if there is a bridge keep it
	if (gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";
	}
	//move one space
	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass;
	//if the space is the enemy end game.
	if (nextClass.includes("enemy") || nextClass.includes("arrow")){
		thud.play();
		lose.play();
		lostLife++;
		life(lostLife);
		clearTimeout(currentAnimation);
		clearInterval(countDown);
		loadLevel();
		riderOn = false;
		return;
	}
	//If there is a flag, move up a level.

		levelUp(nextClass);
		clearInterval(countDown);
	
}//tryToMove

function levelUp(nextClass){
	
	if (nextClass == "flag" && riderOn){
		currentLevel++;
		riderOn = false;
		if(currentLevel == 4){
				window.location.href = "endScreen.html";
		}else if (currentLevel == 3) {
			currentLevel++;
			document.getElementById("levelUp").innerHTML = 
			"This is the last level, and the hardest. Succeed or die trying!";
			document.getElementById("levelUp").style.display = "block";
			currentLevel--;
		}else{
			currentLevel++;
			document.getElementById("levelUp").innerHTML = 
			"Brace yourself for level " + currentLevel + "!"; 
			document.getElementById("levelUp").style.display = "block";
			currentLevel--;
		}


		
		//document.getElementById("seconds").innerHTML = seconds;
		clearTimeout(currentAnimation);
		clearTimeout(archerAnimation);
		setTimeout(function(){
			clearInterval(countDown);
			if(currentLevel == 4 ){
				fanfare.play();
				window.location.href = "endScreen.html";

			}else{
					clearTimeout(archerAnimation);
			document.getElementById("levelUp").style.display = "none";
				loadLevel();
			}
		}, 1000);
	}//if
}//levelUp

function loadLevel(){
	levelMap = level[currentLevel];
	animateBoxes;
	animateShoot;
	//load board
	for (var i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
		if(levelMap[i].includes("animate")) { locationOfEnemy = i}
	}//for
	if(lostLife == 0 && paused == 0){
		setTimer(currentLevel);
	}


	animateBoxes = document.querySelectorAll(".animate");
	animateShoot = document.querySelectorAll(".shoot");
	

	if (currentLevel >= 3) {
		animateEnemy(animateBoxes, 0, "down");
	}else{
		animateEnemy(animateBoxes, 0, "right");
	}
	animateArcher(animateShoot, 0, "right");
}//loadLevel
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
}//sound

function animateArcher(boxes,index, direction){
	if(boxes.length <= 0){
		return;
	}//if
	if (direction == "right") {
		boxes[index].classList.add("arrow");
	}else if (direction == "left"){
		boxes[index].classList.add("arrow");
	}
		
	
	//remove images
	for (var i = 0; i < boxes.length; i++) {
		if (i != index) {
			boxes[i].classList.remove("arrow");
		}
		if (i == boxes.length - 2 && direction == "left") {
			boxes[i].classList.remove("arrow");
		}
	}//for	

	if (direction == "right") {
		if (index == boxes.length - 1) {
			index--;
			direction = "left";
		}else{
			index++;
		}//ifElseinner
	}else if(direction == "left"){
		if (index == 0) {
			index++;
			direction = "right";
		}else{
			index--;
		}//else
	}

	if(currentLevel == 0){
		if (currentLocationOfHorse == 7 && gridBoxes[7].className.includes("arrow") || 
			(currentLocationOfHorse == 8 && gridBoxes[8].className.includes("arrow"))
			|| (currentLocationOfHorse == 9 && gridBoxes[9].className.includes("arrow"))) {
			thud.play();
			lose.play();
			lostLife++;
			riderOn = false;
			life(lostLife);
			clearTimeout(currentAnimation);
			clearInterval(countDown);
			loadLevel();
			return;
		}

	}else if(currentLevel == 1){
		if (currentLocationOfHorse == 7 && gridBoxes[7].className.includes("arrow") || 
			(currentLocationOfHorse == 8 && gridBoxes[8].className.includes("arrow"))
			|| (currentLocationOfHorse == 9 && gridBoxes[9].className.includes("arrow"))) {
			thud.play();
			lose.play();
			lostLife++;
			riderOn = false;
			life(lostLife);
			clearTimeout(currentAnimation);
			clearInterval(countDown);
			loadLevel();
			return;
		}
	}else if (currentLevel == 2) {
		if (currentLocationOfHorse == 16 && gridBoxes[16].className.includes("arrow") || 
			(currentLocationOfHorse == 17 && gridBoxes[17].className.includes("arrow"))
			|| (currentLocationOfHorse == 18 && gridBoxes[18].className.includes("arrow"))) {
			thud.play();
			lose.play();
			lostLife++;
			riderOn = false;
			life(lostLife);
			clearTimeout(currentAnimation);
			clearInterval(countDown);
			loadLevel();
			return;
		}
	}else if (currentLevel == 3) {
		if (currentLocationOfHorse == 16 && gridBoxes[16].className.includes("arrow") || 
			(currentLocationOfHorse == 17 && gridBoxes[17].className.includes("arrow"))
			|| (currentLocationOfHorse == 18 && gridBoxes[18].className.includes("arrow"))) {
			thud.play();
			lose.play();
			lostLife++;
			riderOn = false;
			life(lostLife);
			clearTimeout(currentAnimation);
			clearInterval(countDown);
			loadLevel();
			return;
		}
	}

	archerAnimation = setTimeout(function(){
		animateArcher(boxes,index,direction);
	}, 500);
}
function animateEnemy(boxes,index, direction){
	if(boxes.length <= 0){
		return;	}//if


	//update the images
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
	}else if (direction == "left"){
		boxes[index].classList.add("enemyleft"); 
	}else if (direction == "down"){
		boxes[index].classList.add("enemydown"); 
	}else if (direction == "up"){
		boxes[index].classList.add("enemyup"); 
	}//ifElse
	//remove images
	for (var i = 0; i < boxes.length; i++) {
		if (i != index) {
			boxes[i].classList.remove("enemyleft");
			boxes[i].classList.remove("enemyright");
			boxes[i].classList.remove("enemyup");
			boxes[i].classList.remove("enemydown");
		}//if
	}//for
	if (direction == "right") {
		if (index == boxes.length - 1) {
			index--;
			direction = "left";
		}else{
			index++;
		}//ifElseinner
	}else if(direction == "left"){
		if (index == 0) {
			index++;
			direction = "right";
		}else{
			index--;
		}//else
	}else if (direction == "up") {
		if (index == 0) {
			index++;
			direction = "down";
		}else{
			index--;
		}//else
	}else if (direction == "down") {
		if (index == boxes.length - 1) {
			index--;
			direction = "up";
		}else{
			index++;
		}//else
	}//ifElse
	if (currentLevel == 0) {
		if (currentLocationOfHorse == 14 && gridBoxes[14].className.includes("enemyright") || 
			(currentLocationOfHorse == 13 && (gridBoxes[13].className.includes("enemyright") || gridBoxes[13].className.includes("enemyleft")))
			|| (currentLocationOfHorse == 12 && gridBoxes[12].className.includes("enemyleft"))) {
			thud.play();
			lose.play();
			lostLife++;
			riderOn = false;
			life(lostLife);
			clearTimeout(currentAnimation);
			clearInterval(countDown);
			loadLevel();
			return;
		}
	}else if (currentLevel == 1) {
		if (currentLocationOfHorse == 14 && gridBoxes[14].className.includes("enemyright") || 
			(currentLocationOfHorse == 13 && (gridBoxes[13].className.includes("enemyright") || gridBoxes[13].className.includes("enemyleft")))
			|| (currentLocationOfHorse == 12 && (gridBoxes[12].className.includes("enemyright") || gridBoxes[12].className.includes("enemyleft"))) || 
		(currentLocationOfHorse == 11 && (gridBoxes[11].className.includes("enemyright") || gridBoxes[11].className.includes("enemyleft"))) 
		|| currentLocationOfHorse == 10 && gridBoxes[10].className.includes("enemyleft")) {
			thud.play();
			lose.play();
			lostLife++;
			riderOn = false;
			life(lostLife);
			clearTimeout(currentAnimation);
			clearInterval(countDown);
			loadLevel();
			return;
		}	
	}else if (currentLevel == 2) {
		if (currentLocationOfHorse == 5 && gridBoxes[5].className.includes("enemyleft") || 
			(currentLocationOfHorse == 6 && (gridBoxes[6].className.includes("enemyright") || gridBoxes[6].className.includes("enemyleft")))
			||(currentLocationOfHorse == 7 && (gridBoxes[7].className.includes("enemyright") || gridBoxes[7].className.includes("enemyleft")))
			||(currentLocationOfHorse == 8 && (gridBoxes[8].className.includes("enemyright") || gridBoxes[8].className.includes("enemyleft")))
			|| (currentLocationOfHorse == 9 && gridBoxes[9].className.includes("enemyright")) ) {
			thud.play();
			lose.play();
			lostLife++;
			riderOn = false;
			life(lostLife);
			clearTimeout(currentAnimation);
			clearInterval(countDown);
			loadLevel();
			return;
		}
	}else if(currentLevel == 3){
		if ((currentLocationOfHorse == 7 && gridBoxes[7].className.includes("enemyup")) || 
			(currentLocationOfHorse == 12 && (gridBoxes[12].className.includes("enemyup") || gridBoxes[11].className.includes("enemydown")))
			||(currentLocationOfHorse == 17 && gridBoxes[17].className.includes("enemyup"))) {
			thud.play();
			lose.play();
			lostLife++;
			riderOn = false;
			life(lostLife);
			clearTimeout(currentAnimation);
			clearInterval(countDown);
			loadLevel();
			return;
		}
	}
	currentAnimation = setTimeout(function(){
		animateEnemy(boxes,index,direction);
	}, 750);
}//currentAnimation

function setTimer(currentLevel){
	if (currentLevel == 0) {
		seconds = 10;
	}else if (currentLevel == 1) {
		seconds = 15;
		document.getElementById("seconds").innerHTML = seconds;
	}else if (currentLevel == 2) {
		seconds = 20;
		document.getElementById("seconds").innerHTML = seconds;
	}else if(currentLevel == 3){
		seconds = 25;
		document.getElementById("seconds").innerHTML = seconds;
	}

	countDown = setInterval(function(){
		if(seconds == 0){
			document.getElementById("seconds").innerHTML == 0;
			document.getElementById("outoftime").style.display = "block";
			clearTimeout(currentAnimation);
			clearTimeout(archerAnimation);
			return;
		}else if (lostLife == 3) {
			clearTimeout(currentAnimation);
			clearTimeout(archerAnimation);
			document.getElementById("gameOver").style.display = "block";
		}else{
			seconds--;
		document.getElementById("seconds").innerHTML = seconds;
		}
	},1000);
}//setTimer



/*function pauseGame(){
	paused = 1;
	clearTimeout(currentAnimation);
	clearTimeout(archerAnimation);
	//clearInterval(countDown);
	changeVisibility("resume");
}
function resumeGame(){
	paused = 0;
	animateEnemy(animateBoxes, 0, "right");
	animateArcher(animateShoot, 0, "right");
	changeVisibility("resume");
	//setTimer(currentLevel);
}*/

function changeVisibility(divID){
	var element = document.getElementById(divID);
	if(element){
		element.className = (element.className == 'hidden')? 'unhidden':'hidden';
	}//if
}//changeVisibility
function life(lostLife){
	if(lostLife == 1){
		document.getElementById("live1").style.visibility = "hidden";
	}else if (lostLife == 2) {
		document.getElementById("live2").style.visibility = "hidden";
	}else if(lostLife == 3){
		clearTimeout(currentAnimation);
		clearTimeout(archerAnimation);
		
		document.getElementById("live3").style.visibility = "hidden";
		document.getElementById("gameOver").style.display = "block";
	}
}

function replay(){
		window.location.href = "index.html";
		
	const gridBoxes = document.querySelectorAll("#gameBoard div");
	var currentLevel = 0;
	var riderOn = false;
	var currentLocationOfHorse = 0;
	var currentAnimation;//allows for one animation/level
	var widthOfBoard = 5;
	var heightOfBoard = 5;
	let oldLocation = currentLocationOfHorse;
	let oldClassName = gridBoxes[oldLocation].className;
	let nextLocation = 0; //where we move next
	let nextClass = "";
	let nextLocation2 = 0; //where we move next
	let nextClass2 = "";//nlocation we want to move o
	let newClass = "";//if move 

}
