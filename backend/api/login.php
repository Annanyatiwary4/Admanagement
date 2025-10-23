<?php
header("Content-Type: application/json");
include "../config/db.php";
include "../utils/sanitize.php";
include "cors.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = sanitize($data['email']);
$password = $data['password'];

$sql = "SELECT * FROM admins WHERE email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows == 1){
    $admin = $result->fetch_assoc();
    if(password_verify($password, $admin['password'])){
        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "admin" => [
                "id" => $admin['id'],
                "username" => $admin['username'],
                "email" => $admin['email']
            ]
        ]);
    }else{
        echo json_encode(["success"=>false,"message"=>"Invalid password"]);
    }
}else{
    echo json_encode(["success"=>false,"message"=>"Admin not found"]);
}
?>
