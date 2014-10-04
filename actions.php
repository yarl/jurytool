<?php

session_start();
$action = mysql_real_escape_string($_GET['action']);

if (!isset($_SESSION['user'])) {
  echo "No access";
  return false;
}

switch ($action) {

  case "getUser":
    echo "{\"user\":\"" . $_SESSION["user"] . "\",\"country\":\"" . $_SESSION["country"] . "\"}";
    break;

  case "logout":
    unset($_SESSION["user"]);
    unset($_SESSION["country"]);
    echo "OK";
    break;

  case "getBatch":
    $number = mysql_real_escape_string($_GET['number']);
    $conn = mysql_connect("localhost", "admin", "");
    mysql_select_db("test", $conn);
    $result = mysql_query("SELECT * FROM batches WHERE number='" . $number . "' and country = '" . $_SESSION["country"] . "'");
    $row = mysql_fetch_array($result);
    if (is_array($row)) {
      echo $row;
    }
    break;

  case "getBatchAll":
    $conn = mysql_connect("localhost", "admin", "");
    mysql_select_db("test", $conn);
    $result = mysql_query("SELECT * FROM batches WHERE country = '" . $_SESSION["country"] . "'");

    $text = "{\"results\":{";
    while ($row = mysql_fetch_array($result)) {
      $text .= "\"" . $row["number"] . "\":{\"number\":" . $row["number"] . ",\"owner\":\"" . $row["owner"] . "\",\"closed\":" . $row["closed"] . "},";
    }
    $text = trim($text, ",");
    $text .= "}}";
    echo $text;
  default:
    echo "";
}
