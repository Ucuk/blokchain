const Web3 = require('web3');
const contractABI = /* masukkan ABI contract Anda */;
const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';  // Masukkan alamat contract yang telah di-deploy

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID'));
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function storeCertificateHash(fileHash, account) {
    try {
        const receipt = await contract.methods.storeCertificateHash(fileHash).send({ from: account });
        console.log('Transaction receipt: ', receipt);
    } catch (err) {
        console.error('Error storing certificate hash: ', err);
    }
}

module.exports = { storeCertificateHash };
