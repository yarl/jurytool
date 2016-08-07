<?php
session_start();
require_once "../configure.php";
$conn = mysql_connect($DBserver, $DBuser, $DBpassword);
mysql_select_db($DBname, $conn);
  
$action = mysql_real_escape_string($_GET['action']);

if (!isset($_SESSION['user'])) {
  echo "No access";
  return false;
}

switch ($action) {
  case "getUser":
    getUser();
    break;
  case "logout":
    logout();
    break;
  case "getBatch":
    getBatch();
    break;
  case "getBatchAll":
    getBatchAll();
    break;
  case "assignBatch":
    assignBatch();
    break;
  case "releaseBatch":
    releaseBatch();
    break;
  case "saveBatch":
    saveBatch();
    break;
  case "closeBatch":
    closeBatch();
    break;
  case "openBatch":
    openBatch();
    break;
  default:
    echo "";
}

/**
 * 
 */
function getUser() {
  echo "{\"user\":\"" . $_SESSION["user"] . "\",\"country\":\"" . $_SESSION["country"] . "\"}";
}

/**
 * 
 */
function logout() {
  unset($_SESSION["user"]);
  unset($_SESSION["country"]);
  echo "OK";
}

/**
 * 
 */
function getBatch() {
  $number = mysql_real_escape_string($_GET['number']);
  $result = mysql_query("SELECT * FROM batches WHERE number='" . $number . "' and country = '" . $_SESSION["country"] . "'");

  $text = "{\"results\":";
  if (mysql_num_rows($result) == 0) {
    $text .= "{}";
  }
  while ($row = mysql_fetch_array($result)) {
    $data = $row["data"] == "" ? "{}" : $row["data"];
    $text .= "{\"number\":" . $row["number"] . ",\"owner\":\"" . $row["owner"] . "\",\"closed\":" . $row["closed"] . ",\"data\":" . $data . "},";
  }
  $text = trim($text, ",");
  $text .= "}";
  echo $text;
}

/**
 * 
 */
function getBatchAll() {
  $result = mysql_query("SELECT * FROM batches WHERE country = '" . $_SESSION["country"] . "'");

  $text = "{\"results\":{";
  while ($row = mysql_fetch_array($result)) {
    $text .= "\"" . $row["number"] . "\":{\"number\":" . $row["number"] . ",\"owner\":\"" . $row["owner"] . "\",\"closed\":" . $row["closed"] . "},";
  }
  $text = trim($text, ",");
  $text .= "}}";
  echo $text;
}

/**
 * 
 */
function assignBatch() {
  $number = mysql_real_escape_string($_GET['number']);
  $result = mysql_query("SELECT * FROM batches WHERE number='" . $number . "' and country = '" . $_SESSION["country"] . "'");
  $row = mysql_fetch_array($result);

  if ($row) {
    if ($row["owner"] == "") {
      $result = mysql_query("UPDATE batches SET owner=\"" . $_SESSION["user"] . "\" WHERE country=\"" . $_SESSION["country"] . "\" and number=" . $number);
    } else {
      $result = "Batch already owned!";
    }
  } else {
    $result = mysql_query("INSERT INTO batches (country, number, owner, closed) VALUES (\"" . $_SESSION["country"] . "\",\"" . $number . "\",\"" . $_SESSION["user"] . "\",0)");
  }
  echo $result;
}

/**
 * 
 */
function releaseBatch() {
  $number = mysql_real_escape_string($_GET['number']);
  
  $result = mysql_query("UPDATE batches SET owner=\"\" WHERE country=\"" . $_SESSION["country"] . "\" and number=" . $number);
  echo $result;
}

/**
 * 
 */
function saveBatch() {
  $batch = json_decode($_POST['data']);
  $number = mysql_real_escape_string($batch->number);
  $data = mysql_real_escape_string($batch->data);

  $result = mysql_query("UPDATE batches SET data=\"" . $data . "\" WHERE country=\"" . $_SESSION["country"] . "\" and number=" . $number);
  echo $result;
}

/**
 * 
 */
function closeBatch() {
  $number = mysql_real_escape_string($_GET['number']);

  $result = mysql_query("UPDATE batches SET closed=1 WHERE country=\"" . $_SESSION["country"] . "\" and number=" . $number);
  echo $result;
}

/**
 * 
 */
function openBatch() {
  $number = mysql_real_escape_string($_GET['number']);

  $result = mysql_query("UPDATE batches SET closed=0 WHERE country=\"" . $_SESSION["country"] . "\" and number=" . $number);
  echo $result;
}
