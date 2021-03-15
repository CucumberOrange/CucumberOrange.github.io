let imgArray;//image array
let dataArray; //Array which holds JSON data
let accessGlobal;//Var which takes on the value of the image's access
let approvalGlobal;//Var which takes on the value of the image's approval status


//fetches the data from the JSON file, and stores it in dataArray
fetch("galleryinfo.json")
	.then(function(resp){
		return resp.json();
	})
	.then(function(data){
		dataArray = data;
		console.log(dataArray);
		console.log(typeof(dataArray));
		
	});
	

//a function which changes the visibility of an element by getting its ID.
function changeVisibility(divID){
	var element = document.getElementById(divID);
	if(element){
		element.className = (element.className == 'hidden')? 'unhidden':'hidden';
	}//if
}//changeVisibility

//A function which displays an image along with the author's name, the description they provided and the people tagged in it.
function displayLightBox(imageFile,alt, isPrev, isNext){

	//creates a ner image object
	var image = new Image();
	var bigImage = document.getElementById("bigImage");
	image.src = "uploadedimages/" + imageFile;
	image.alt = alt;
	let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	//if the imageFile exists, locate its UID within the dataArray and display the author's name, description and tags, providing the fields aren't null as well.
	if(imageFile != ""){
		for (var i = 0; i < dataArray.length; i++) {
			if (imageFile.toLowerCase() == dataArray[i].uid + "." + dataArray[i].imagetype) {

				if (document.getElementById("firstP") != null) 
					document.getElementById("firstP").innerHTML = dataArray[i].fname;

				if (document.getElementById("lastP") != null) 
					document.getElementById("lastP").innerHTML = dataArray[i].lname;

				if (document.getElementById("descP") != null) 
					document.getElementById("descP").innerHTML = dataArray[i].description;
				if (document.getElementById("tagsP") != null) 
					document.getElementById("tagsP").innerHTML = dataArray[i].tag;

				if (document.getElementById("download") != null) 
					document.getElementById("download").href = "uploadedimages/" + dataArray[i].uid + "." + dataArray[i].imagetype;

				if (document.getElementById("delete") != null) 
					document.getElementById("delete").href = window.location.href + "?delete=true&uid=" + dataArray[i].uid;

				if (document.getElementById("approved") != null){
					document.getElementById("approved").href = "AwaitingApproval.php?approved=true&uid=" + dataArray[i].uid;
				}//ifApproved

				if (document.getElementById("save") != null) 
					document.getElementById("save").href = "moderator.php?save=true&uid=" + dataArray[i].uid;
				if (document.getElementById("uid") != null) 
					document.getElementById("uid").value =  dataArray[i].uid;
			}//ifNull
		}//for

	
		//when the image loads, set the width
		image.onload = function(){
			let width = 0;
			if(image.width >= windowWidth){
				width = windowWidth - 100;
				//console.log(width + "yes");
			} else {
				width = image.width;
				//console.log(width + "no");
			}//ifElse
			//console.log(width + "actual");
			document.getElementById("boundaryBigImage").style.width = width + "px";
			bigImage.style.width = width + "px";
		};

		//If isPrev is false (i.e, if theres only one img or it's the first img in the gallery), hide it.Else, show it
		if(isPrev == 0){
			document.getElementById('prev').className = "hidden";
		}else{
			document.getElementById('prev').classList.remove("hidden");
		}//isPrevIfElse

		//If isPrev is false (i.e, it's the last img in the gallery), hide it.Else, show it
		if(isNext == 0){
			document.getElementById('next').className = "hidden";
		}else{
			document.getElementById('next').classList.remove("hidden");
		}//isNextIfElse

		//remove the hidden class from the lightbox and boundaryBigImage
		document.getElementById('lightbox').classList.remove("hidden");
		document.getElementById('boundaryBigImage').classList.remove("hidden");

		//if the page is either AwaitingApproval or moderator, show the download button.
		if (accessGlobal == "all") {
			document.getElementById('download').classList.remove("hidden");
		}//ifAccessGlobal

	}else{
		document.getElementById('next').className = "hidden";
		document.getElementById('prev').className = "hidden";
		document.getElementById('boundaryBigImage').className = "hidden";
		document.getElementById('lightbox').className = "hidden";
		document.getElementById('download').className = "hidden";
	
	}//imageFileIfElse
	
	//transfer image's src and alt to bigimage
	bigImage.src = image.src;
	bigImage.alt = image.alt;

}//displayLightbox

//A function which deals with the previous  and next buttons.
function prev(){

	//get the UID of the image currently in the BigImage tag
	var image = new Image();
	var bigImage = document.getElementById("bigImage").src;
	var s = bigImage.split("/");
	var i = s[6];
	
	var imgname = Number(i[0]); // index is the uid
	var prevImgName;
	var isPrev = 1;//boolean which decides whether or not the prev button should be shown.
	var isNext = 1;//boolean which decides whether or not the next button should be shown.


	for (var j = 0; j < imgArray.length; j++) {
		console.log("imgArray[j]: " + imgArray[j]);
		if (imgArray[j].toLowerCase() == i.toLowerCase()) {
			console.log("j =" + j);
			console.log("imgArray= " + imgArray.length);
			prevImgName = imgArray[j - 1];
			if(j > 0){
				if (j - 1 == 0) {
					isPrev = 0;
				}//if
			}else{
				isPrev = 0;
			}//ifElse
		}//if
	}//for

	bigImage = "uploadedimages/" + prevImgName;
	console.log("prevImgName is " + prevImgName);
	displayLightBox(prevImgName, '', isPrev, isNext);
}//prev

//This function deals with the next button.
function next(){
	console.log(imgArray);
	//imgArray = [];
	var image = new Image();
	var bigImage = document.getElementById("bigImage").src;
	var s = bigImage.split("/");

	var i = s[6];
	
	var nextImgName;
	var isPrev = 1;
	var isNext = 1;

	for (var j = 0; j < imgArray.length; j++) {
		console.log("imgArray[j]: " + imgArray[j]);
		if (imgArray[j].toLowerCase() == i.toLowerCase()) {
			console.log("j =" + j);
			console.log("imgArray= " + imgArray.length);
			nextImgName = imgArray[j + 1];
			if(j > 0){
				isPrev = 1;
				if (j == imgArray.length- 2) {
					isNext = 0;
				}//ifisNext
			}else if (j == 0 ) {
				if (j == imgArray.length- 2) {
					isNext = 0;
				}//if
			}//ifElse
		}//if
	}//for

	bigImage = "uploadedimages/" + nextImgName;
	displayLightBox(nextImgName, '', isPrev, isNext);

}//next


//function which loads images given the access level and approval flag
function loadImages(access,approved){
	accessGlobal = access;
	imgArray = [];
	fetch("readjson.php?access=" + access)
    .then(function(resp){ 
		return resp.json();
    })
    .then(function(data){
		let i = 0;  // counter  
		let j = 0;   
		let main = document.getElementById("main");

      // remove all existing children of main
		while (main.firstChild) {
			main.removeChild(main.firstChild);
		}//while

		for (i in data){
			if(data[i].approved == approved){
				imgArray[j] =  data[i].uid + "." + data[i].imagetype;
				j++;
			}//if
		}//for
      	printThumbnail(imgArray);
    });
} // loadImages


function loadSearch(access, approved){
	accessGlobal = access;
	//var fnameArray = [];imgArray = [];
	approvalGlobal = approved;
	imgArray = [];
	fetch("readjson.php?access=" + access)
    .then(function(resp){ 
      return resp.json();
    })
    .then(function(data){
		let i = 0;
		let j = 0;  // counter     
		let main = document.getElementById("main");

		// remove all existing children of main
		while (main.firstChild) {
			main.removeChild(main.firstChild);
		}//while

		var search = document.getElementById("search").value;

		if (search.length != 0) {
			for (i in data){
				if (data[i].fname.toLowerCase().includes(search.toLowerCase()) || data[i].lname.toLowerCase().includes(search.toLowerCase()) 
					|| data[i].description.toLowerCase().includes(search.toLowerCase()) || data[i].tag.toLowerCase().includes(search.toLowerCase())) {
					if(data[i].approved == approved){
		      
						imgArray[j] = data[i].uid + "." + data[i].imagetype;
						j++;
						console.log(i);
						console.log(imgArray[i]);	
					}//if
				}//if
			}//for
		}//if
      	printThumbnail(imgArray);
   });
	  
}//loadsearch

//Sorts visible images by their first name given their access level and approval flag
function sortByFname(access, approved){
	imgArray = [];
	accessGlobal = access;
	approvalGlobal = approved;
	fetch("readjson.php?access=" + access)
    .then(function(resp){ 
    	return resp.json();
    })
    .then(function(data){

		let main = document.getElementById("main");

		// remove all existing children of main
		while (main.firstChild) {
			main.removeChild(main.firstChild);
		}//while

		var sortArray= [];

		for (var i = 0; i < data.length; i++) {
			sortArray[i] = [];
			sortArray[i][0] = data[i].fname.toLowerCase();
			sortArray[i][1] = data[i].uid + "." + data[i].imagetype;
		}//for
			
		sortArray.sort(sortFunction);
		//fnameArray.sort();
		console.log(sortArray);
		var search = document.getElementById("search").value;

		j = 0;
		var k = 0;

		for (var i = 0; i < sortArray.length; i++) {

			for (k = 0; k < data.length; k++) {
				var img = data[k].uid + "." + data[k].imagetype;
				if (img == sortArray[i][1]) {
					if (search.length != 0) {

						if (data[k].fname.toLowerCase().includes(search) || data[k].lname.toLowerCase().includes(search) 
						|| data[k].description.toLowerCase().includes(search) || data[k].tag.toLowerCase().includes(search)) {
							if(data[k].approved == approved){
								imgArray[j] = sortArray[i][1];
								j++;
							}//ifAppr
						}//ifSearch	
					}else{
						if(data[k].approved == approved){
							imgArray[j] = sortArray[i][1];
							j++;
						}//if
					}//ifElse
				}//if
			}//for
		}//for
		printThumbnail(imgArray);
	});
}//sortByFname

//a function which sorts images by their last names given their access level and approval flag
function sortByLname(access, approved){
	imgArray = [];
	accessGlobal = access;
	approvalGlobal = approved;
	fetch("readjson.php?access=" + access)
	.then(function(resp){ 
		return resp.json();
	})
	.then(function(data){
	
		let main = document.getElementById("main");

		// remove all existing children of main
		while (main.firstChild) {
			main.removeChild(main.firstChild);
		}//while

		var sortArray= [];

		for (var i = 0; i < data.length; i++) {
			sortArray[i] = [];
			sortArray[i][0] = data[i].lname.toLowerCase();
			sortArray[i][1] = data[i].uid + "." + data[i].imagetype;
		}//for
			
		sortArray.sort(sortFunction);
			
			
		var search = document.getElementById("search").value;
		j = 0;
		var k = 0;

		for (var i = 0; i < sortArray.length; i++) {

			for (k = 0; k < data.length; k++) {
				var img = data[k].uid + "." + data[k].imagetype;
				if (img == sortArray[i][1]) {
					if (search.length != 0) {
		
						if (data[k].fname.toLowerCase().includes(search) || data[k].lname.toLowerCase().includes(search) 
						|| data[k].description.toLowerCase().includes(search) || data[k].tag.toLowerCase().includes(search)) {
							if(data[k].approved == approved){
								imgArray[j] = sortArray[i][1];
								j++;
							}//ifAppr
						}//ifSearch	
					}else{
						if(data[k].approved == approved){
							imgArray[j] = sortArray[i][1];
							j++;
						}//if
					}//ifElse
				}//if
			}//for
		}//for
		printThumbnail(imgArray);
	});
}//sortbyLname

//A function which sorts images by their upload date, given their access level and approval flag
function sortByUpload(access, approved){
	imgArray = [];
	accessGlobal = access;
	approvalGlobal = approved;
	fetch("readjson.php?access=" + access)
    .then(function(resp){ 
      return resp.json();
    })
    .then(function(data){
		let main = document.getElementById("main");

		// remove all existing children of main
		while (main.firstChild) {
			main.removeChild(main.firstChild);
		}//while
		var sortArray= [];

		for (var i = 0; i < data.length; i++) {
			sortArray[i] = [];
			sortArray[i][0] = data[i].uid;
			sortArray[i][1] = data[i].uid + "." + data[i].imagetype;
		}//for
	
		sortArray.sort(reverseFunction);
		var search = document.getElementById("search").value;
		j = 0;
		var k = 0;

		for (var i = 0; i < sortArray.length; i++) {
			for (k = 0; k < data.length; k++) {
				var img = data[k].uid + "." + data[k].imagetype;
				if (img == sortArray[i][1]) {
					if (search.length != 0) {
						if (data[k].fname.toLowerCase().includes(search) || data[k].lname.toLowerCase().includes(search) 
						|| data[k].description.toLowerCase().includes(search) || data[k].tag.toLowerCase().includes(search)) {
							if(data[k].approved == approved){
								imgArray[j] = sortArray[i][1];
								j++;
							}//ifAppr
						}//ifSearch	
					}else{
						if(data[k].approved == approved){
							imgArray[j] = sortArray[i][1];
							j++;
						}//if
					}//ifElse
				}//if
			}//for
		}//for
		printThumbnail(imgArray);
	});
}//sortByUpload

//A function which takes in an array of images, and outputs them as a grid of clickable thumbnails.
function printThumbnail(imgArray){
	var i = 0;
	
	for (i = 0; i < imgArray.length; i++) {
		console.log(i);
		var isPrev = 0;
		var isNext = 0;
		let img = new Image();
		img.src = "thumbnails/" + imgArray[i];
		img.alt = imgArray[i].description;
		if (i != 0) {
			isPrev = 1;
		}//if

		if(i < imgArray.length - 1){
			isNext = 1;
		}//if

		img.setAttribute("onclick","displayLightBox('" + imgArray[i]+ "', '', '" + isPrev + "', '" + isNext + "')");
		img.setAttribute("style","margin: 10px");

		main.appendChild(img);
	}//for
}//printthumbnail

//A function which sorts the elements of an array in alphabetical order
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }else {
        return (a[0] < b[0]) ? -1 : 1;
    }//ifElse
}//sortFunction

//A function which sorts the elements of an array in reverse order
function reverseFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }else {
        return (a[0] > b[0]) ? -1 : 1;
    }//ifElse
}//reversefunction


//A function which reveals the textboxes and save images button required to make changes to an image's data.
function makeEdits(){
	if (document.getElementById("firstLabel") != null) 
		document.getElementById("firstLabel").classList.remove("hidden");
		document.getElementById("firstLabel").className = "info";
	if (document.getElementById("lastLabel") != null) 
		document.getElementById("lastLabel").classList.remove("hidden");
		document.getElementById("lastLabel").className = "info";
	if (document.getElementById("descLabel") != null) 
		document.getElementById("descLabel").classList.remove("hidden");
		document.getElementById("descLabel").className = "info";
	if (document.getElementById("tagsLabel") != null) 
		document.getElementById("tagsLabel").classList.remove("hidden");
		document.getElementById("tagsLabel").className = "info";

	if (document.getElementById("firstText") != null) {
		document.getElementById("firstText").value = document.getElementById("firstP").innerHTML;
		document.getElementById("firstText").classList.remove("hidden");
		document.getElementById("firstText").className = "textbox";
	}//ifFirstText

	if (document.getElementById("lastText") != null) {
		document.getElementById("lastText").value = document.getElementById("lastP").innerHTML;
		document.getElementById("lastText").classList.remove("hidden");
		document.getElementById("lastText").className = "textbox";
	}//ifLastText

	if (document.getElementById("descText") != null) {
		document.getElementById("descText").value = document.getElementById("descP").innerHTML;
		document.getElementById("descText").classList.remove("hidden");
		document.getElementById("descText").className = "textbox";
	}//ifDescText

	if (document.getElementById("tagsText") != null){
		document.getElementById("tagsText").value = document.getElementById("tagsP").innerHTML;
		document.getElementById("tagsText").classList.remove("hidden");
		document.getElementById("tagsText").className = "textbox";
	}//ifTagsText

	if (document.getElementById("firstP") != null) 
		document.getElementById("firstP").className = "hidden";
	if (document.getElementById("lastP") != null) 
		document.getElementById("lastP").className = "hidden";
	if (document.getElementById("descP") != null) 
		document.getElementById("descP").className = "hidden";

	if (document.getElementById("tagsP") != null) 
		document.getElementById("tagsP").className = "hidden";
	if (document.getElementById("save") != null) {
		document.getElementById("save").classList.remove("hidden");
		document.getElementById("save").className = "button";
	}//ifsave

	document.getElementById("firstNameStar").classList.remove("hidden");
	document.getElementById("firstNameStar").className = "error";

	document.getElementById("lastNameStar").classList.remove("hidden");
	document.getElementById("lastNameStar").className = "error";
	
	document.getElementById("descStar").classList.remove("hidden");
	document.getElementById("descStar").className = "error";
	
	document.getElementById("tagsStar").classList.remove("hidden");
	document.getElementById("tagsStar").className = "error";

	if (document.getElementById("edit") != null) 
		document.getElementById("edit").className = "hidden";
	}//ifEdit


//A function which hides the textboxes, save changes button necessary and other elements required to save images, and saves the data to the JSON file
function saveChanges(){

	

	if (document.getElementById("firstText").value.length == 0) {
		document.getElementById("firstNameError").classList.remove("hidden");
		document.getElementById("firstNameError").className = "error";

	}else{
		document.getElementById("firstNameError").classList.remove("error");
		document.getElementById("firstNameError").className = "hidden";
	
	}//ifElse

	if (document.getElementById("lastText").value.length == 0) {
		document.getElementById("lastNameError").classList.remove("hidden");
		document.getElementById("lastNameError").className = "error";

	}else{
		document.getElementById("lastNameError").classList.remove("error");
		document.getElementById("lastNameError").className = "hidden";
	
	}//ifElse

	if (document.getElementById("descText").value.length == 0) {
		document.getElementById("descError").classList.remove("hidden");
		document.getElementById("descError").className = "error";

	}else{
		document.getElementById("descError").classList.remove("error");
		document.getElementById("descError").className = "hidden";
	
	}//ifElse

	if (document.getElementById("tagsText").value.length == 0) {
		document.getElementById("tagsError").classList.remove("hidden");
		document.getElementById("tagsError").className = "error";

	}else{
		document.getElementById("tagsError").classList.remove("error");
		document.getElementById("tagsError").className = "hidden";
	
	}//ifElse

	if (document.getElementById("firstText").value.length != 0 &&
		document.getElementById("lastText").value.length != 0 &&
		document.getElementById("descText").value.length != 0 &&
		document.getElementById("tagsText").value.length != 0) {

		var UID = document.getElementById("uid").value;
		fetch("galleryinfo.json")
		.then(function(resp){
			return resp.json();
		})
		.then(function(data){
			dataArray = data;
			for (i in data){
				if (dataArray[i].uid == UID) {
					dataArray[i].fname = document.getElementById("firstText").value;
					dataArray[i].lname = document.getElementById("lastText").value;
					dataArray[i].description = document.getElementById("descText").value;
					dataArray[i].tag = document.getElementById("tagsText").value;
				}//if	
			}//for

			$.post('http://142.31.53.220/~anika/Assingment8/moderator.php',{elements: dataArray});

			if (document.getElementById("firstLabel") != null) 
				document.getElementById("descLabel").classList.remove("info");
				document.getElementById("firstLabel").className = "hidden";
			if (document.getElementById("lastLabel") != null) 
				document.getElementById("descLabel").classList.remove("info");
				document.getElementById("lastLabel").className = "hidden" ;
			if (document.getElementById("descLabel") != null) 
					document.getElementById("descLabel").classList.remove("info");
				document.getElementById("descLabel").className = "hidden";

			if (document.getElementById("tagsLabel") != null) 
				document.getElementById("tagsLabel").className = "hidden" ;

			if (document.getElementById("firstText") != null) {
				document.getElementById("firstP").innerHTML = document.getElementById("firstText").value;
				document.getElementById("firstText").className = "hidden";
			}//if

			if (document.getElementById("lastText") != null) {
				document.getElementById("lastP").innerHTML = document.getElementById("lastText").value;
				document.getElementById("lastText").className = "hidden";
			}//if

			if (document.getElementById("descText") != null) {
				document.getElementById("descP").innerHTML = document.getElementById("descText").value;
				document.getElementById("descText").className = "hidden";
			}//if
			if (document.getElementById("tagsText") != null){
				document.getElementById("tagsP").innerHTML = document.getElementById("tagsText").value;
				document.getElementById("tagsText").className = "hidden";
			}//if

			if (document.getElementById("firstP") != null) 
				document.getElementById("firstP").classList.remove("hidden");
				document.getElementById("firstP").className = "info";

			if (document.getElementById("lastP") != null) 
				document.getElementById("lastP").classList.remove("hidden");
				document.getElementById("lastP").className = "info";
			if (document.getElementById("descP") != null) 
				document.getElementById("descP").classList.remove("hidden");
				document.getElementById("descP").className = "info";

			if (document.getElementById("tagsP") != null) 
				document.getElementById("tagsP").classList.remove("hidden");
				document.getElementById("tagsP").className = "info";

			if (document.getElementById("save") != null) {
				document.getElementById("save").classList.remove("button");
				document.getElementById("save").className = "hidden";
			}//if

			document.getElementById("firstNameStar").classList.remove("error");
			document.getElementById("firstNameStar").className = "hidden";

			document.getElementById("lastNameStar").classList.remove("error");
			document.getElementById("lastNameStar").className = "hidden";
			
			document.getElementById("descStar").classList.remove("error");
			document.getElementById("descStar").className = "hidden";
			
			document.getElementById("tagsStar").classList.remove("error");
			document.getElementById("tagsStar").className = "hidden";

			if (document.getElementById("edit") != null){ 
				document.getElementById("edit").classList.remove("hidden");
				document.getElementById("edit").className = "link";
				document.getElementById("save").classList.remove("button");
				document.getElementById("save").className = "hidden";
				
			}//if

		});
	}//ifElse
}//saveChanges


//A function which chooses the functiion required depending on the option chosen from the moderator gallery's dropdown
function chooseModFunction(){
		
	var access = "all";
	if (document.getElementById("access") != null)
		access = document.getElementById("access").value;
	

	if (document.getElementById("sort").value == "1") {
		//alert(document.getElementById("sort").value);
		sortByFname(access,'true');
	}else if(document.getElementById("sort").value == "2"){
		sortByLname(access,'true');
	}else if(document.getElementById("sort").value == "3"){
		sortByUpload(access,'true');
	}//ifElse
}//chooseModFunction


//A function which chooses the functiion required depending on the option chosen from the Awaiting approval gallery's dropdown
function chooseAwaitFunction(){
		
	var access = "all";

	if (document.getElementById("sort").value == "1") {
		//alert(document.getElementById("sort").value);
		sortByFname(access,'false');
	}else if(document.getElementById("sort").value == "2"){
		sortByLname(access,'false');
	}else if(document.getElementById("sort").value == "3"){
		sortByUpload(access,'false');
	}//ifElse
}//chooseAwaitFunction

//A function which chooses the function required depending on the option chosen from the public gallery's dropdown
function choosePubFunction(){
	
	if (document.getElementById("sort").value == "1") {
		//alert(document.getElementById("sort").value);
		sortByFname('public','true');
	}else if(document.getElementById("sort").value == "2"){
		sortByLname('public','true');
	}else if(document.getElementById("sort").value == "3"){
		sortByUpload('public','true');
	}//ifElse
}//choosePubFunction


//A function which chooses the function required depending on the option chosen from the access dropdown
function chooseAccessFunction(){
	
	if (document.getElementById("access").value == "public") {
		//alert(document.getElementById("sort").value);
		loadImages('public','true');
	}else if(document.getElementById("access").value == "private"){
		loadImages('private','true');
	}else if(document.getElementById("access").value == "all"){
		loadImages('all','true');
	}//if
}//chooseAccessFunction


//A function which chooses the function required depending on the option chosen from the moderator gallery's function, and what is in the search bar/-.
function chooseModSearch(){
	var access = "all";
	if (document.getElementById("access") != null)
		access = document.getElementById("access").value;

	document.getElementById("sort").value = "0";
	alert(access);
	loadSearch(access,'true');
}//chooseModSearch


