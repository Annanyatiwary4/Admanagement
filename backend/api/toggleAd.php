<?php
header("Content-Type: application/json");
include "../config/db.php";
include "cors.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id']);
$status = $data['status']; // active / inactive

$sql = "UPDATE ads SET status=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si",$status,$id);

if($stmt->execute()){
    echo json_encode(["success"=>true,"message"=>"Status updated successfully"]);
}else{
    echo json_encode(["success"=>false,"message"=>$stmt->error]);
}
?>
