"use strict";

// load "all", "private", or "public" images only
function loadImages(access){
  fetch("./readjson.php?access=" + access).
    then(function(resp){ 
      return resp.json();
    })
    .then(function(data){
      // console.log(data); 
      let i;  // counter     
      let main = document.getElementById("main");
      
      // remove all existing children of main
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
     
      // for every image, create a new image object and add to main
      for (i in data){
        let img = new Image();
        console.log(img.src);
        img.src = "uploadedimages/" + data[i].UID + "." + data[i].imagetype;
        img.alt = data[i].description;
        main.appendChild(img);
      }
    });
} // loadImages

