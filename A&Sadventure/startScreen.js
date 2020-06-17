var headerText = ["Albert", "Simon", "Enemy","Archer","How to play","How to play", "How to play","Level 1"];
var smallText = [
"This is Albert. He is an elite horse who is responsible for training Simon. He has been Simon's companion since he was a little boy. Before that, Albert was a famous show horse who performed every year in the Cavalia, an equestrian ballet. After he retired from his illustrious career, Simon's family adopted him to look after and help their son.", 
"This is Simon. He is the son of a wealthy family, who expects him to take over their business. To prepare him for this challenge, his father sends him and Albert on a journey to gain experience. Simon is smart and kind, but quite absent-minded. This often lands him in sticky situations...... which Albert has to get him out of. ",
 "This is the enemy. He is from a rival family which seeks to sabotage Simon's at every opportunity. He follows the duo on their journey, hoping that he can take advantage of Simon's absent-mindedness and end him once and for all.",
  "This is the archer. A lack of attention at home and frustration over his family's high expectations of him led to his proficiency with the bow and arrow. The enemy hires him as a sniper, which he agrees to because he wants to impress his parents.",
   "The goal of the game is to rescue Simon and to capture the flag without getting killed by the enemy or shot by one of the archer's arrows. To pick up Simon, go over to his square. Albert cannot jump a fence without Simon."," Look out for the enemy. If you run into him, you'll lose a life. You will meet the same fate if you get hit by the archer's arrows. There is also an ever-ticking timer. If you fail to capture the flag before it reaches 0, you will lose the game and have to restart.","Are you ready?"];
var storyPics = ["images/AlbertTitle.png","images/SimonTitle.png","images/enemyTitle.png","images/archerTitle.png","images/instructions1.png","images/instructions2.png","",""];
var con = document.querySelector("button");
var image = document.getElementById("image");
var	counter = 0;
con.addEventListener("click", function(){
	document.getElementById("instructionMessage1").innerHTML = headerText[counter];
	document.getElementById("instructionMessage2").innerHTML = smallText[counter];
	if (counter == 0) {
		changeVisibility("welcome");
		changeVisibility("instructions");
		changeVisibility("image");
	}
	image.src = storyPics[counter];
	counter = counter + 1;
	if(counter === 7){
		changeVisibility("finish");
		changeVisibility("continue");
	}
});

function changeVisibility(divID){
	var element = document.getElementById(divID);
	if(element){
		element.className = (element.className == 'hidden')? 'unhidden':'hidden';
	}//if
}//changeVisibility

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