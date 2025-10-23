<?php
header("Content-Type: application/json");
include "../config/db.php";
include "../utils/sanitize.php";
include "cors.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data['id']);
$title = sanitize($data['title']);
$type = sanitize($data['type']);
$position = sanitize($data['position']);
$code = $data['code'];

$sql = "UPDATE ads SET title=?, type=?, position=?, code=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssi", $title, $type, $position, $code, $id);

if($stmt->execute()){
    echo json_encode(["success"=>true,"message"=>"Ad updated successfully"]);
}else{
    echo json_encode(["success"=>false,"message"=>$stmt->error]);
}
?>
