<?php

session_start();
$message = "";

$data = json_decode($_POST['data']);
$pass = mysql_real_escape_string($data->pass);
$user = mysql_real_escape_string($data->name);
$country = mysql_real_escape_string($data->country);

if ($pass != "pass") {
  echo "Invalid Password!";
  return false;
}

$conn = mysql_connect("localhost", "admin", "");
mysql_select_db("test", $conn);
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
