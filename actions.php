<?php
session_start();
$action = mysql_real_escape_string($_GET['action']);

switch ($action) {
  
  case "getUserName":
    echo isset($_SESSION["user"]) ? "{\"user\":\"".$_SESSION["user"]."\",\"country\":\"".$_SESSION["country"]."\"}" : "";
    break;
  
  case "logout":
    unset($_SESSION["user"]);
    echo "OK";
    break;
  
  default:
    echo "";
}
