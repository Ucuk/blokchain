<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST['hash'])) {
        $hash = $_POST['hash'];
        
        // Cek hash di database
        $sql = "SELECT * FROM sertifikat WHERE hash_md5 = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $hash);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
            echo json_encode([
                'status' => 'valid',
                'message' => 'Sertifikat valid dan terdaftar dalam database',
                'data' => [
                    'nama_file' => $data['nama_file'],
                    'tanggal_upload' => $data['tanggal_upload']
                ]
            ]);
        } else {
            echo json_encode([
                'status' => 'invalid',
                'message' => 'Sertifikat tidak valid atau tidak terdaftar'
            ]);
        }
    }
}
?>
