<?php
	
	//sets isEditor to true, and redirects the moderator to moderator.php
	session_start();
	$_SESSION["isEditor"] = true;
	header("Location: moderator.php?foo2=" . rand());
?>