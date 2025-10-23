<?php
header("Content-Type: application/json");
include "../config/db.php";
include "cors.php";

$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id']);

$sql = "DELETE FROM ads WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i",$id);

if($stmt->execute()){
    echo json_encode(["success"=>true,"message"=>"Ad deleted successfully"]);
}else{
    echo json_encode(["success"=>false,"message"=>$stmt->error]);
}
?>
