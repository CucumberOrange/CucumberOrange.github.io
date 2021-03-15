
<?php 


//joins the session
  session_start();

  //if the user has not logged in and attempts to access the approval view, they will be redirected to index.php.
  if ($_SESSION["isEditor"] == false) {
    header("Location: index.php?foo2=" . rand());
  }//sessionif  

  $target_dir = "uploadedimages/";
  $thumbnail_dir = "thumbnails/";
  $view_dir = "utils/";
  $filename = "galleryinfo.json";

  //If the JSON file does not exist, create it.
  if (!file_exists($filename)) {
    touch($filename);
  }//JSONif

  //gets the JSON data
  $jsonstring = file_get_contents($filename);

  //decode the string from json to PHP array
  $phparray = json_decode($jsonstring, true);



  //reads the JSON data except for that of the UID to be deleted, then writes the updated data to the JSON file.

  if(isset($_GET["delete"])) {

    $keepArray = [];

    foreach($phparray as $entry) {

      if($entry["uid"] != $_GET["uid"]){
        $keepArray[] = $entry;
      }else{
        unlink($target_dir . $entry["uid"] . "." . $entry["imagetype"]);
        unlink($thumbnail_dir. $entry["uid"] . "." . $entry["imagetype"]);
      }//keepif
    }//foreach

    //encode the phparray, and write back to JSON file.
    $jsoncode = json_encode($keepArray, JSON_PRETTY_PRINT);
    file_put_contents($filename, $jsoncode); 

  }//delete


  //If the UID of the approved image is found within $phparray, set its access to true, put it in $keeparray, and write it back to the JSON file.
  if(isset($_GET["approved"])) {
    $keepArray = [];
    foreach($phparray as $entry) {
      if($entry["uid"] == $_GET["uid"]){
        $entry["approved"] = "true";
      }//approveif
      $keepArray[] = $entry;
    }//foreach

    $jsoncode = json_encode($keepArray, JSON_PRETTY_PRINT);
    file_put_contents($filename, $jsoncode); 
  }//approved

?>

<!DOCTYPE html>
<html lang="en">

  <head> <title>Image Gallery</title><link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <body onload="loadImages('all','false')">
    <div class="topnav"><!--navigation bar-->
      <input type="text" id="search" class="search" placeholder="Search by name, tags, or description">
      <button type="submit" class="searchbutton" onclick="loadSearch('all','false')"><i class="fa fa-search"></i></button>
      <label for="sort" class="sortLabel">Filter by:</label>
      <select name="sort" id="sort" onchange="chooseAwaitFunction()">
        <option value="0">Select</option>
        <option value="1">First name</option>
        <option value="2">Last name</option>
        <option value="3">Recently uploaded</option>
      </select>

      <div id="links">
        <a href="moderator.php" class="link">Moderator Gallery</a>
        <a href="downloadall.php" class="link" download>Download All</a>
        <a href="index.php" class="link">Logout</a>
      </div>
    </div>

<!-------gallery-->
    <h2>Awaiting Approval</h2>
   
    <div class="hidden"onclick="loadImages('all','false')">Load Images</div>
    <div class="hidden" onclick="loadImages('private','false')">Show Private Images Only</div>
    <div class="hidden" onclick="loadImages('public','false')">Show Public Images Only</div>
    <div id="main"></div>

    <div id = "lightbox" class="hidden"> </div>

    <div id = "positionBigImage">
      <div id = "boundaryBigImage" class="hidden">
        <img id = "x" src="utils/x.png" alt="close" onclick = "displayLightBox('','','0','0')" >
        <img id = "bigImage" src="utils/x.png" alt="Arabian horse">
        <label class = "info" id="firstP"></label>
        <label class = "info" id="lastP"></label></br>
        <label class = "info" id="descP"> </label></br>
        <label class = "info" id ="tagsP"></label></br>

        <!--navigation links-->
        <a id="download" href = "" download>Download image</a>
        <a id="delete" href = "">Delete image</a>
        <a id="approved" href = "">Approve image</a>

      </div>
      <p class="hidden" id="next" onclick="next()">Next</p>
      <p class="hidden" id="prev" onclick="prev()">Prev</p>
    </div>
 
<?php

  //gets the extension of the uploaded file.
  function getExtension ($file){
    $ex = pathinfo($file, PATHINFO_EXTENSION);
    return $ex;
  }//getextension
  
  include 'footer.inc';
?>

 