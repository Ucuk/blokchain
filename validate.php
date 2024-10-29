<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $hash = $_POST['hash'];
    
    // Cek hash di database
    $sql = "SELECT * FROM sertifikat WHERE hash_md5 = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $hash);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode([
            'status' => 'valid',
            'message' => 'Sertifikat valid dan terdaftar dalam database'
        ]);
    } else {
        echo json_encode([
            'status' => 'invalid',
            'message' => 'Sertifikat tidak valid atau tidak terdaftar'
        ]);
    }
}
?>