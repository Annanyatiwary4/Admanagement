<?php
header("Content-Type: application/json");
include "../config/db.php";
include "cors.php";

$sql = "SELECT * FROM ads";
$result = $conn->query($sql);

$ads = [];
while($row = $result->fetch_assoc()){
    $ads[] = $row;
}

echo json_encode($ads);
?>
