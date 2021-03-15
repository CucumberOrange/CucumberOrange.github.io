<?php

	//error message variables
	$fnameError = $lnameError = $fileError = $descError = $tagError = $checkError = $accessError = "";

	//variables which hold user data
	$fname = $lname =  $description = $tag = $checkbox = $myfile = $access = "";

	//booleans which are responsible for determining if a field has been properly filled out.
	$isFname = $isLname =  $isDescription = $isTag = $isCheckbox = $isMyfile = $isAccess = false;

	$extension = "";//file extension variable
	$target_dir = "uploadedimages/";//folder used for storing full sized images
	$thumbnail_dir = "thumbnails/";//folder used for storing thumbnails
	$IDfile = "identifier.txt";//textfile which holds the next image's UID
	$UID = "";//The current image's UID
	$filename = "galleryinfo.json";//The JSON file responsible for holding user data

	include 'header.inc';

	//if the JSON file does not exist, create it.
	if (!file_exists($filename)) {
		touch($filename);
	}//JSONif
		
	//get the contents of the file
	$jsonstring = file_get_contents($filename);

 	//decode the string from json to PHP array
 	$phparray = json_decode($jsonstring, true);

	//If uploadedimages/ doesn't exist, create it.
	if (!is_dir($target_dir)) {
		mkdir($target_dir);
  	}//iftarget_dir

  	//If thumbnails/ doesn't exist, create it.
  	if (!is_dir($thumbnail_dir)) {
		mkdir($thumbnail_dir);
  	}//ifthumbnail_dir


  	//checks to see if any of the fields are invalid.
	if ($_SERVER["REQUEST_METHOD"] == "POST") {

		//if the fname field is empty, show the form and output the error message. Else, keep the value.
		if (empty($_POST["fname"])) {
		    $fnameError = "You must enter your first name";
		    $isFname = false;	    
	  	}else{
	  		$fname = test_input($_POST["fname"]);
	  		$isFname = true;
	  	}//fnameifElse

	  	//if the lname field is empty, show the form and output the error message. Else, keep the value.
	  	if (empty($_POST["lname"])) {
	  		$lnameError = "You must enter your last name";
	  		$isLname = false;
	  	}else{
		    $lname= test_input($_POST["lname"]);
		    $isLname = true;
	  	}//lnameifElse

		//if the fname field is empty, of an invalid filetype or exceeds 4MB, output the error message and show the form. Otherwise, keep the form value. 
	  	if (empty($_FILES["myfile"]["name"])) {

	  		$fileError = "You must upload a file";
	  		$isMyfile = false;
	  	}else if ($_FILES["myfile"]["size"] > 4000000) {
  			$fileError = "Sorry, your file is too large.";
  			$isMyfile = false;
 
		}else if(strtolower(getExtension($_FILES["myfile"]["name"])) != "jpg" and strtolower(getExtension($_FILES["myfile"]["name"])) != "jpeg" and strtolower(getExtension($_FILES["myfile"]["name"])) != "png"){
			$fileError = "invalid filetype. Please try again";
			$isMyfile = false;
		}else{
			$isMyfile = true;
		}//myfileIfElse

		//if the description field is empty, output the error message and show the form. Otherwise, keep the form value. 
		if (empty($_POST["description"])) {
	  		$descError  = "You must provide a description";
	  		$isDescription = false;
	  	}else{
	  		$description= test_input($_POST["description"]);
	  		$isDescription = true; 
	  	}//descIfElse

	  	//if the tag field is empty, output the error message and show the form. Otherwise, keep the form value. 
	  	if (empty($_POST["tag"])) {
	  		$tagError = "You must tag the names in this photo";
	  		$isTag = false;
	  	}else{
	  		$tag = test_input($_POST["tag"]);
	  		$isTag = true;
	  	}//tagIfElse

	  	//if the user has not selected the checkbox, output the error message and show the form. Otherwise, keep the form value. 
	  	if (empty($_POST["checkbox"])) {
	  		$checkError = "You must agree to the terms";
	  		$isCheckbox = false;
	  	}else{
	  		$checkbox = $_POST["checkbox"];
	  		$isCheckbox = true;
	  	}//checkboxifElse

	  	////if the access field is empty, output the error message and show the form. Otherwise, keep the form value. 
  		if (empty($_POST["access"])) {
	  		$accessError = "You must set the access status";
	  		$isAccess = false;
	  	}else{
  			$access = $_POST["access"];
  			$isAccess = true;
	  	}//accessifElse	
	}//RequestMethodIf

	//If all of the fields are filled out correctly, save the user data to the JSON file,assign the image the UID in the IDFile and upload it. Else, show the form.
	if($isFname && $isLname &&  $isDescription && $isTag && $isCheckbox && $isMyfile && $isAccess){
		
		//if identifier.txt does not exist, create it and put the number 1 in it.
		if (!file_exists($IDfile)) {
			touch($IDfile);	
			file_put_contents($IDfile, "1");
		}//IDFileif

		//Assign the name of the file to a variable and save it as a value in the POST array
		$name = $_FILES["myfile"]["name"];
		$_POST["myfile"] = $name;

		//get the file extension, and put it in the POST array.
		$extension = strtolower(getExtension($name));
		$_POST["imagetype"] = $extension;

		//Assign the UID to a variable, and put it in the POST array.
		$UID = file_get_contents($IDfile);
		$_POST["uid"] = $UID;
		
		//Set the image's approval to false initially.
		$_POST["approved"] = "false";

		//rename the target file
		$target_file = $target_dir . $UID . ".". $extension;

		//Update the data within phparray[]
		$phparray []= $_POST;

		//encode phparray
		$jsoncode = json_encode($phparray, JSON_PRETTY_PRINT);

		//move the uploaded file
		move_uploaded_file($_FILES["myfile"]["tmp_name"], $target_file);
		
		//write the updated data back to the JSON file.
 		file_put_contents($filename, $jsoncode); 

 		// create a thumbnail of an image on the server
		include 'createthumbnail.php';
		$src = "uploadedimages/". $UID.".".$extension;
		$dest = "thumbnails/". $UID.".".$extension;

		if (!file_exists($dest)) {
			createThumbnail($src, $dest, 150, 150);
			header("Location: index.php?foo2=" . rand() );
		}//destifElse 

		//increment the UID, and write it back to identifier.txt
		$UID++;
		file_put_contents($IDfile, $UID); 

		//reset the field values to blank, and the booleans to false.
		$fname = $lname = $myfile = $description = $tag = $checkbox = $access = $viewGallery = "";
		$isFname = $isLname =  $isDescription = $isTag = $isCheckbox = $isMyfile = $isAccess = false;
	}else{
		include'form.inc';
	}//filledformifElse

	//A function which scrubs data from the fields
	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}//test_input

	//A function which gets the extension of the file parameter.
	function getExtension ($file){
		$ex = pathinfo($file, PATHINFO_EXTENSION);
		return $ex;
	}//getExtension
	
	include 'footer.inc';
?>