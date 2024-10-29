document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var inputFile = document.getElementById('sertifikatInput').files[0];
    if (!inputFile) {
        alert("Tidak ada file yang dipilih!");
        return;
    }

    var formData = new FormData();
    formData.append('sertifikat', inputFile);

    // Upload file dan dapatkan hash
    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('hashResult').textContent = data.hash;
            
            // Validasi hash
            return fetch('validate.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'hash=' + data.hash
            });
        }
    })
    .then(response => response.json())
    .then(data => {
        // Tampilkan hasil validasi
        var statusElement = document.createElement('p');
        statusElement.textContent = data.message;
        statusElement.className = data.status === 'valid' ? 'valid' : 'invalid';
        document.querySelector('.result').appendChild(statusElement);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat upload/validasi file');
    });

    // Preview gambar tetap sama seperti sebelumnya
    if (inputFile.type.startsWith("image/")) {
        var imgReader = new FileReader();
        imgReader.onload = function(e) {
            document.getElementById('sertifikatImg').src = e.target.result;
        };
        imgReader.readAsDataURL(inputFile);
    } else {
        document.getElementById('sertifikatImg').src = "sert2.jpg";
    }
});