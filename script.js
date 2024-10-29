document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman

    var inputFile = document.getElementById('sertifikatInput').files[0]; // Mendapatkan file
    if (!inputFile) {
        alert("Tidak ada file yang dipilih!");
        return;
    }

    var fileReader = new FileReader(); 

    // Membaca file sebagai array buffer untuk hashing
    fileReader.onload = function(e) {
        var arrayBuffer = e.target.result; // Buffer untuk hash
        var spark = new SparkMD5.ArrayBuffer(); // Inisialisasi SparkMD5
        
        spark.append(arrayBuffer); // Tambahkan buffer untuk di-hash
        var hashHex = spark.end(); // Dapatkan hasil hash MD5

        document.getElementById('hashResult').textContent = hashHex; // Tampilkan hasil hash
    };

    // Jika file adalah gambar, tampilkan di halaman
    var imgElement = document.getElementById('sertifikatImg');
    if (inputFile.type.startsWith("image/")) {
        var imgReader = new FileReader();
        imgReader.onload = function(e) {
            imgElement.src = e.target.result;
        };
        imgReader.readAsDataURL(inputFile); // Baca gambar sebagai DataURL
    } else {
        imgElement.src = "sert2.jpg"; // Jika bukan gambar, tampilkan gambar default
    }

    fileReader.readAsArrayBuffer(inputFile); // Memulai pembacaan file untuk hashing
});
