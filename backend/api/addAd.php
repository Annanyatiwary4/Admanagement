<?php
header("Content-Type: application/json");
include "../config/db.php";
include "../utils/sanitize.php";
include "cors.php";

$data = json_decode(file_get_contents("php://input"), true);

$title = sanitize($data['title']);
$type = sanitize($data['type']);           // banner, adsense, partner, pop
$position = sanitize($data['position']);   // header, sidebar, footer
$code = $data['code'];

$sql = "INSERT INTO ads (title, type, position, code) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $title, $type, $position, $code);

if($stmt->execute()){
    echo json_encode(["success"=>true,"message"=>"Ad added successfully"]);
}else{
    echo json_encode(["success"=>false,"message"=>$stmt->error]);
}
?>
