<?php
header("Content-Type: application/json");
include "../config/db.php";
include "../utils/sanitize.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = sanitize($data['username']);
$email = sanitize($data['email']);
$password = password_hash($data['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO admins (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $password);

if($stmt->execute()){
    echo json_encode(["success" => true, "message" => "Admin registered successfully"]);
}else{
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
}
?>
