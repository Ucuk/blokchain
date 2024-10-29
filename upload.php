<?php
require_once 'config.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_FILES['sertifikat'])) {
        $file = $_FILES['sertifikat'];
        $fileName = $file['name'];
        $fileTmp = $file['tmp_name'];
        
        // Generate MD5 hash dari file
        $md5Hash = md5_file($fileTmp);
        
        // Cek apakah hash sudah ada di database
        $checkSQL = "SELECT * FROM sertifikat WHERE hash_md5 = ?";
        $checkStmt = $conn->prepare($checkSQL);
        $checkStmt->bind_param("s", $md5Hash);
        $checkStmt->execute();
        $result = $checkStmt->get_result();
        
        if($result->num_rows > 0) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Sertifikat dengan hash yang sama sudah ada dalam database'
            ]);
            exit;
        }
        
        // Upload file ke folder uploads
        $uploadDir = 'uploads/';
        $uploadPath = $uploadDir . basename($fileName);
        
        if(move_uploaded_file($fileTmp, $uploadPath)) {
            // Simpan ke database
            $sql = "INSERT INTO sertifikat (nama_file, hash_md5) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $fileName, $md5Hash);
            
            if ($stmt->execute()) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'File berhasil diupload',
                    'hash' => $md5Hash
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Gagal menyimpan ke database'
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Gagal mengupload file'
            ]);
        }
    }
}
?>
