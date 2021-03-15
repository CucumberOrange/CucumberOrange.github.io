
<?php 

  session_start();
  $filename = "galleryinfo.json";

  //if the JSON file doesn't exist, create it.
  if (!file_exists($filename)) {
    touch($filename);
  }//if

  //read the JSON file's contents
  $jsonstring = file_get_contents($filename);
 
  //decode the string from json to PHP array
  $phparray = json_decode($jsonstring, true);
  $target_dir = "uploadedimages/";
  $thumbnail_dir = "thumbnails/";
  $view_dir = "utils/";
?>

<!--Gallery-->
<!DOCTYPE html>
<html lang="en">

  <head> <title>Image Gallery</title><link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="script.js"  type="text/javascript"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <body onload="loadImages('public','true')">

    <div class="topnav">
      <div id="searchbox">
        <input type="text" id="search" class="search" placeholder="Search by name, tags, or description">
        <button type="submit" class="searchbutton" onclick="loadSearch('public','true')"><i class="fa fa-search"></i></button>
      </div>

      <a href="viewAlbum.php?delete=true" class="hidden">Reset Gallery</a>
      <a href="downloadall.php" class="hidden" download>Download All</a>

      <label for="sort" class="sortLabel">Sort by:</label>
      <select name="sort" id="sort" onchange="choosePubFunction()">
        <option value="0">Select</option>
        <option value="1">First name</option>
        <option value="2">Last name</option>
        <option value="3">Recently uploaded</option>
      </select>

      <div id="links">
        <a href="upload.php" class="link">Upload Image</a>
        <a href="login.php" class="link">Login</a>
      </div>
    </div>

    <h2>Public Gallery</h2>

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

        <a class="hidden" id="download" href = "" download>Download image</a>

      </div>
      <p class="hidden" id="next" onclick="next()">Next</p>
      <p class="hidden" id="prev" onclick="prev()">Prev</p>
    </div>

  <?php

//This function gets the extension of the image file
  function getExtension ($file){
    $ex = pathinfo($file, PATHINFO_EXTENSION);
    return $ex;
  }//getExtension
  
  include 'footer.inc';
?>

 