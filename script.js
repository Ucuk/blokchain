document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('sertifikatInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Pilih file terlebih dahulu!');
        return;
    }
    
    const formData = new FormData();
    formData.append('sertifikat', file);
    
    try {
        // Upload file
        const uploadResponse = await fetch('upload.php', {
            method: 'POST',
            body: formData
        });
        
        const uploadResult = await uploadResponse.json();
        
        if (uploadResult.status === 'success') {
            document.getElementById('hashResult').textContent = uploadResult.hash;
            
            // Validasi hash
            const validateResponse = await fetch('validate.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `hash=${uploadResult.hash}`
            });
            
            const validateResult = await validateResponse.json();
            
            document.getElementById('validationStatus').textContent = 
                validateResult.status === 'valid' ? 'Valid' : 'Invalid';
            document.getElementById('validationStatus').className = 
                validateResult.status;
            
            alert(validateResult.message);
        } else {
            alert(uploadResult.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memproses file');
    }
});
