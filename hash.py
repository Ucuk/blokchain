import hashlib
import time

class Blockchain:
    def __init__(self):
        self.chain = []
        self.pending_transactions = []

    def new_block(self, previous_hash):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time.time(),
            'transactions': self.pending_transactions,
            'previous_hash': previous_hash
        }
        self.pending_transactions = []
        self.chain.append(block)
        return block

    def new_transaction(self, sender, recipient, amount):
        self.pending_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount
        })

    def hash_block(self, block):
        block_string = str(block).encode()
        return hashlib.sha256(block_string).hexdigest()

# Buat blockchain baru
blockchain = Blockchain()

# Tambahkan transaksi baru
blockchain.new_transaction('A', 'B', 10)

# Buat block baru
blockchain.new_block(blockchain.hash_block(blockchain.chain[-1]))

# Tampilkan blockchain
print(blockchain.chain)