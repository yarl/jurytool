<?php
session_start();
$action = mysql_real_escape_string($_GET['action']);

switch ($action) {
  
  case "getUserName":
    echo isset($_SESSION["user"]) ? $_SESSION["user"] : "";
    break;
  
  case "logout":
    unset($_SESSION["user"]);
    echo "OK";
    break;
  
  default:
    echo "";
}
