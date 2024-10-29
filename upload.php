<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_FILES['sertifikat'])) {
        $file = $_FILES['sertifikat'];
        $fileName = $file['name'];
        $fileTmp = $file['tmp_name'];
        
        // Generate MD5 hash dari file
        $md5Hash = md5_file($fileTmp);
        
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
    }
}
?>