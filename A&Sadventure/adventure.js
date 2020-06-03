const level = [
//level 0
	["flag", "fenceSide", "","rock","",
	"fence", "rock","","","rider",
	"","tree","animate","animate","animate",
	"","water","","","",
	"","fenceSide","","horseUp",""],
	//level 1
	["flag","water","","","","fenceSide","water","","","rider","animate", 
	"bridge animate", "animate","animate","animate","","water","","","",
	"","water","horseUp","",""],
	["tree","tree","flag","tree","tree","animate","animate","animate",
	"animate","animate", "water","bridge","water","water","water","","","","fence","","rider","rock","","","horseUp"]
];

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0;
var riderOn = false;
var currentLocationOfHorse = 0;
var currentAnimation;//allows for one animation/level

window.addEventListener("load", function(){
	loadLevel();
});
function loadLevel(){
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
	}
	//update the images
	if (direction == "right") {
		boxes[index].classList.add("enemyRight");
	}else {
		boxes[index].classList.add("enemyLeft"); 
	}
	//remove images
	for (var i = 0; i < boxes.length; i++) {
		if (i != index) {
			boxes[i].classList.remove("enemyLeft");
			boxes[i].classList.remove("enemyRight");
		}
	}//for
	if (direction == "right") {
		if (index == boxes.length -1) {
			index--;
			direction = "left"
		}else{
			index++;
		}
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
}//a