<?php

session_start();
$message = "";

require_once "../configure.php";
$conn = mysql_connect($DBserver, $DBuser, $DBpassword);
mysql_select_db($DBname, $conn);

$data = json_decode($_POST['data']);
$pass = mysql_real_escape_string($data->pass);
$user = mysql_real_escape_string($data->name);
$country = mysql_real_escape_string($data->country);

if ($pass != $loginPw) {
  echo "Invalid Password!";
  return false;
}

$result = mysql_query("SELECT * FROM users WHERE name='" . $user . "' and country = '" . $country . "'");

$row = mysql_fetch_array($result);
if (is_array($row)) {
  $_SESSION["user"] = $row['name'];
  $_SESSION["country"] = $country;
  echo "OK";
  return true;
} else {
  echo "Invalid Username and/or Country!";
  return false;
}

if (isset($_SESSION["user"])) {
  echo "OK";
  return true;
  //header("Location:user_dashboard.php");
}

echo "?";
return false;
