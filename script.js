// Fungsi untuk membaca file dan generate MD5
function calculateMD5(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const spark = new SparkMD5.ArrayBuffer();
            spark.append(e.target.result);
            const md5Hash = spark.end();
            resolve(md5Hash);
        };
        reader.onerror = function(e) {
            reject('Error reading file');
        };
        reader.readAsArrayBuffer(file);
    });
}

// Event listener untuk generate MD5
document.getElementById('generateMD5Form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('md5Input');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Pilih file terlebih dahulu!');
        return;
    }
    
    try {
        const md5Hash = await calculateMD5(file);
        document.getElementById('generatedMD5').textContent = md5Hash;
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal generate MD5');
    }
});

// Event listener untuk upload file
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('sertifikatInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Pilih file terlebih dahulu!');
        return;
    }
    
    try {
        // Generate MD5 sebelum upload
        const md5Hash = await calculateMD5(file);
        
        const formData = new FormData();
        formData.append('sertifikat', file);
        formData.append('hash', md5Hash);
        
        // Upload file
        const uploadResponse = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });
        
        const uploadResult = await uploadResponse.json();
        
        if (uploadResult.status === 'success') {
            document.getElementById('hashResult').textContent = uploadResult.hash;
            document.getElementById('validationStatus').textContent = 'Berhasil Upload';
            document.getElementById('validationDetail').textContent = uploadResult.message;
            alert('File berhasil diupload dengan hash: ' + uploadResult.hash);
        } else {
            alert(uploadResult.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memproses file');
    }
});

// Event listener untuk validasi hash
document.getElementById('validateForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const hashInput = document.getElementById('hashInput').value;
    
    if (!hashInput) {
        alert('Masukkan hash MD5!');
        return;
    }
    
    try {
        const validateResponse = await fetch('validate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `hash=${hashInput}`
        });
        
        const validateResult = await validateResponse.json();
        
        document.getElementById('hashResult').textContent = hashInput;
        document.getElementById('validationStatus').textContent = 
            validateResult.status === 'valid' ? 'Valid' : 'Invalid';
        document.getElementById('validationStatus').className = 
            validateResult.status;
        document.getElementById('validationDetail').textContent = validateResult.message;
        
        if (validateResult.data) {
            document.getElementById('validationDetail').textContent += 
                `\nFile: ${validateResult.data.nama_file}\nUpload: ${validateResult.data.tanggal_upload}`;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat validasi');
    }
});
