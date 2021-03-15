<!--Body of photo upload form-->


<div class="topnav"> 
  <a href="index.php">Back to Gallery</a>
</div>


<h2>Photo upload form</h2>
<div id="form"> 

  <form action="upload.php?foo=<?php echo rand();?>" method="post" enctype="multipart/form-data">
  
    
    <label for="fname" class="label">First name:</label>
    <span class="error">*</span>
    <input type="text" id="fname" name="fname" value="<?php echo $fname;?>" class="textbox">
    <span class="error"><?php echo $fnameError;?></span><br/><br/>

    <label for="lname" class="label">Last name:</label>
    <span class="error">*</span>
    <input type="text" id="lname" name="lname" value="<?php echo $lname;?>" class="textbox">
    <span class="error"><?php echo $lnameError;?></span><br/><br/>

    <div class = "container">
        <div class = "button-wrap">
          <label for="myfile" class="label">Select a file: <span class="error">*</span></label><br/>
          <input class = "button" type="file" id="myfile" name="myfile" value="<?php echo $myfile;?>">
          <span class="error"><?php echo $fileError;?></span><br/><br/>
        </div>
    </div>
    
    
    <label for="description" class="label">Photo description:<span class="error">*<?php echo $descError;?></span></label><br/>
    <textarea id="description" name="description" rows="4" cols="50" class="textbox"><?php echo $description;?></textarea><br/><br/>

    <label for="tag" class="label">Tag names: <span class="error">*<?php echo $tagError;?></span></label><br/>
    <textarea id="tag" name="tag" rows="4" cols="50" class="textbox"><?php echo $tag;?></textarea><br/><br/>
    
    <input type="checkbox" id="checkbox"  name="checkbox" <?php echo (empty($_POST['checkbox']))? '':'checked'?>>
    <label for="checkbox"  class="label"> I retain the copyright to this image and release it for use on this site.</label>
    <span class="error">*</span>
    <span class="error"><?php echo $checkError;?></span><br/><br/>

    <label class="label">Please set the access level: </label> <span class="error">*</span>
  
    <label for="public" class="label" >Public</label>
    <input type="radio" id="public" name="access" value="public" <?php if (!empty($access) && $access=="public") echo "checked";?>>
    <label for="private" class="label">Private</label>
    <input type="radio" id="private" name="access" value="private"  <?php if (!empty($access) && $access=="private") echo "checked";?>>
    <span class="error"><?php echo $accessError;?></span><br/><br/>
    
    <input type="submit" name="submit" value="Submit" class="button">  
  </form> 
</div>
 
 
   


