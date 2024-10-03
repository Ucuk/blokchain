const formUnggah = document.getElementById('form-unggah');
const tombolUnggah = document.getElementById('tombol-unggah');
const sertifikatTerensiDiv = document.getElementById('sertifikat-terenkripsi');

tombolUnggah.addEventListener('click', (e) => {
    e.preventDefault();
    const fileSertifikat = document.getElementById('file-sertifikat').files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const dataSertifikat = reader.result;
        // Enkripsi data sertifikat menggunakan teknologi blockchain
        enkripsiSertifikat(dataSertifikat).then((dataTerensi) => {
            const sertifikatTerensi = `Sertifikat Terenkripsi: ${dataTerensi}`;
            sertifikatTerensiDiv.innerHTML = sertifikatTerensi;
        }).catch((error) => {
            console.error(error);
        });
    };
    reader.readAsDataURL(fileSertifikat);
});

async function enkripsiSertifikat(dataSertifikat) {
    // Ganti dengan API atau SDK platform blockchain Anda
    const blockchainApi = 'https://api-blockchain-anda.com/enkripsi';
    const response = await fetch(blockchainApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dataSertifikat })
    });
    const dataTerensi = await response.json();
    return dataTerensi;
}