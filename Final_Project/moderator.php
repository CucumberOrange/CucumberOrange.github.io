
<?php 
  session_start();

  //If the user tries to access moderator.php without loggin in, they are redirected to index.php.
  if ($_SESSION["isEditor"] == false) {
    header("Location: index.php?foo2=" . rand() );
  }//ifSession


  $filename = "galleryinfo.json";

  //If the JSON file does not exist, create it.
  if (!file_exists($filename)) {
    touch($filename);
  }//ifFileName

  //Get the contents of the JSON
  $jsonstring = file_get_contents($filename);

  if (isset($_POST["elements"])) {

   
    $phparray = $_POST["elements"];

    $jsoncode = json_encode($phparray, JSON_PRETTY_PRINT);

    file_put_contents($filename, $jsoncode);
  }//ifelements

  //decode the string from json to PHP array
  $phparray = json_decode($jsonstring, true);

  $target_dir = "uploadedimages/";
  $thumbnail_dir = "thumbnails/";
  $view_dir = "utils/";

//if The moderator wishes to delete an image, every other UID's JSON info will be read into a separate array, and then written back to the JSON file.
  if(isset($_GET["delete"])) {
    $keepArray = [];

    foreach($phparray as $entry) {
      if($entry["uid"] != $_GET["uid"]){
        $keepArray[] = $entry;
      }else{
        unlink($target_dir . $entry["uid"] . "." . $entry["imagetype"]);
        unlink($thumbnail_dir. $entry["uid"] . "." . $entry["imagetype"]);
      }//ifElse
    }//foreach

    $jsoncode = json_encode($keepArray, JSON_PRETTY_PRINT);
    file_put_contents($filename, $jsoncode); 
  }//ifdelete

//If the moderator wishes to delete all data, all of the images and the JSON and identifier files will be unlinked.
 if(isset($_GET["deleteall"])) {
  $fs = scandir($target_dir);

    foreach ($fs as $imagename) {
      if ($imagename != "." && $imagename != "..") {
        unlink($target_dir.$imagename);
        unlink($thumbnail_dir.$imagename);
      }//if
    }//foreach
    unlink($filename);
    unlink("identifier.txt");
  }//if
?>


<!DOCTYPE html>
<html lang="en">

<head> <title>Image Gallery</title><link rel="stylesheet" href="style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="script.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head><!--head-->
<body onload="loadImages('all','true')">


  <div class="topnav">
    <input type="text" id="search" class="search" placeholder="Search by name, tags, or description">
    <button type="submit" class="searchbutton" onclick="chooseModSearch()"><i class="fa fa-search"></i></button>

    <label for="sort" class="sortLabel">Set Access:</label>
    <select id="access" name="sort" onchange="chooseAccessFunction()">
      <option value="all">All</option>
      <option value="public">Public</option>
      <option value="private">Private</option>
    </select>

    <label for="sort" class="sortLabel">Sort by:</label>
    <select name="sort" id="sort" onchange="chooseModFunction()">
      <option value="0">Select</option>
      <option value="1">First name</option>
      <option value="2">Last name</option>
      <option value="3">Recently uploaded</option>
    </select>

    <div id="links">
        <a href="AwaitingApproval.php" class="link">Approve Images</a>
        <a href="downloadall.php" class="link" download>Download All</a>
        <a href="moderator.php?deleteall=true" class="link">Delete All</button>
        <a href="logout.php" class="link">Logout</a>
    </div>

  </div>
  <!-----------Gallery--------->
  <h2>Moderator Gallery</h2>

  <div id="main"></div>

  <div id = "lightbox" class="hidden"> </div>

  <div id = "positionBigImage">
    <div id = "boundaryBigImage" class="hidden">
      <img id = "x" src="utils/x.png" alt="close" onclick = "displayLightBox('','','0','0')">
      <img id = "bigImage" src="utils/x.png" alt="Arabian horse">

      <div id="info">
        <label class = "info" id="firstP"></label>
        <label class = "info" id="lastP"></label><br/>
        <label class = "info" id="descP"> </label><br/>
        <label class = "info" id ="tagsP"></label><br/>
      </div>


     
      <label id="firstNameStar" class="hidden">*</label>
      <label id="firstLabel" class="hidden">First Name</label>
      <input type="text" class="hidden" id="firstText" name="first">
      <span id="firstNameError" class="hidden">You must enter a first name</span><br/>

     
      <span  id="lastNameStar" class="hidden">*</span>
      <label id="lastLabel" class="hidden">Last Name</label>
      <input type="text" class="hidden" id="lastText"name="last">
      <span  id="lastNameError" class="hidden">You must enter a last name</span><br/>


     
      <span  id="descStar" class="hidden">*</span>
      <label id="descLabel" class="hidden">Description</label><br>
      <textarea id="descText"  class="hidden" name="description" rows="4" cols="50" class="textbox"></textarea>
      <br/>
      <span  id="descError" class="hidden">You must describe the photo</span><br/>


      <span  id="tagsStar" class="hidden">*</span>
      <label id="tagsLabel" class="hidden">Tags</label><br>
      <textarea id="tagsText" class="hidden" name="tag" rows="4" cols="50" class="textbox"></textarea>
      <span  id="tagsError" class="hidden">You must tag the people in the photo</span>
      <input type="text" id="uid" name="uid" class="hidden"><br/><br/>
      <button class="hidden" id="save" onclick="saveChanges()">Save Changes</button>
  
      <a id="delete" href = "" class="link">Delete image</a>
      <a id="download" href = "" class="link" download>Download image</a>
      <a id="edit" onclick="makeEdits()" class="link">Edit details</a>
    </div>
      <p class="hidden" id="next" onclick="next()">Next</p>
      <p class="hidden" id="prev" onclick="prev()">Prev</p>
  </div>

<?php

//A function which gets the extension of its file parameter
  function getExtension ($file){
    $ex = pathinfo($file, PATHINFO_EXTENSION);
    return $ex;
  }//getExtension
  
 //A function which cleans the data from the parameter
  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }//test_input
  
  include 'footer.inc';
?>

 