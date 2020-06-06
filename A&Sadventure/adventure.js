const level = [
//level 0
	["flag", "fenceside", "","rock","",
	"fence", "rock","","","rider",
	"","tree","animate","animate","animate",
	"","water","","horseup","",
	"","fenceside","","",""],
	//level 1
	["flag","water","","","",
	"fence","water","","","rider",
	"animate", "bridge animate", "animate","animate","animate",
	"","water","","","",
	"","water","horseup","",""],

	["tree","tree","flag","tree","tree",
	"animate","animate","animate","animate","animate",
	 "water","bridge","water","water","water",
	 "","","","","rider",
	 "rock","","","horseup", ""]
];

const obstacles = ["rock", "tree", "water"];

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0;
var riderOn = false;
var currentLocationOfHorse = 0;
var currentAnimation;//allows for one animation/level
var widthOfBoard = 5;
var heightOfBoard = 5;

window.addEventListener("load", function(){
	loadLevel();
});

document.addEventListener("keydown", function(e){
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
			console.log("move right");
			break;
		case "up":
			console.log("move up");
			nextLocation = currentLocationOfHorse - widthOfBoard;
			break;
		case "down":
			nextLocation = currentLocationOfHorse + widthOfBoard;
			console.log("move down");
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
				nextClass = "jumpleft";
				nextClass2 = "horseriderleft";
				nextLocation2  = nextLocation - 1;
			}else if(direction == "right"){
				nextClass = "jumpright";
				nextClass2 = "horseriderright";
				nextLocation2  = nextLocation + 1;
			}else if (direction = "up") {
				nextClass = "jumpup";
				nextClass2 = "horseriderup";
				nextLocation2 = nextLocation - widthOfBoard;
			}else if (direction = "down") {
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
	if (nextClass.includes("enemy") || gridBoxes[oldLocation].className.includes("enemy")) {
		document.getElementById("lose").style.display = "block";
		clearTimeout(currentAnimation);
		return;
	}
	//If there is a flag, move up a level.
		levelUp(nextClass);
}//tryToMove

function levelUp(nextClass){
	//alert("riderOn = " + riderOn);
	if (nextClass == "flag" && riderOn){
		riderOn = false;
		document.getElementById("levelUp").style.display = "block";
			clearTimeout(currentAnimation);
			setTimeout(function(){
			document.getElementById("levelUp").style.display = "none";
			currentLevel++;
			loadLevel();
			if(currentLevel == 4){
				document.getElementById("gameOver").style.display = "block";
			}
		}, 1000);
	}//if
}

function loadLevel(){
	//alert("loadLevel() is being called!");
	let levelMap = level[currentLevel];
	let animateBoxes;

	//load board
	for (var i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
		

	}//for
	animateBoxes = document.querySelectorAll(".animate");
	animateEnemy(animateBoxes, 0, "right");



}

function animateEnemy(boxes,index, direction){
	if(boxes.length <= 0){
		return;
	}//if
	//update the images
	if (direction == "right") {
		boxes[index].classList.add("enemyRight");
	}else {
		boxes[index].classList.add("enemyLeft"); 
	}//ifElse
	//remove images
	for (var i = 0; i < boxes.length; i++) {
		if (i != index) {
			boxes[i].classList.remove("enemyLeft");
			boxes[i].classList.remove("enemyRight");
		}//if
	}//for
	if (direction == "right") {
		if (index == boxes.length -1) {
			index--;
			direction = "left"
		}else{
			index++;
		}//ifElseinner
	}else{
		if (index == 0) {
			index++;
			direction = "right"
		}else{
			index--;
		}//else
	}//ifElse
	currentAnimation = setTimeout(function(){
		animateEnemy(boxes,index,direction);
	}, 750);
}//currentAnimation