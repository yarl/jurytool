<?php

session_start();
$message = "";

if (count($_POST) > 0) {
  if ($_POST["pass"] != "pass") {
    $message = "Invalid Password!";
  } else {
    $conn = mysql_connect("localhost", "admin", "");
    mysql_select_db("test", $conn);
    $result = mysql_query("SELECT * FROM users WHERE name='" . $_POST["user"] . "' and country = '" . $_POST["country"] . "'");

    $row = mysql_fetch_array($result);
    if (is_array($row)) {
      $_SESSION["user"] = $row[name];
    } else {
      $message = "Invalid Username or Country!";
    }
  }
}
if (isset($_SESSION["user"])) {
  header("Location:user_dashboard.php");
}