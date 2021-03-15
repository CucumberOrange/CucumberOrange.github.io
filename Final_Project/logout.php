<?php

session_start();
if ($_SESSION["isEditor"] == true) {
	$_SESSION["isEditor"] = false;
	header("Location: index.php?foo2=" . rand() );
}



?>