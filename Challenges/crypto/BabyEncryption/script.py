# def decryption(msg):
    # enc = []
    # for char in msg:
        # char = char - 18
        # char = 179 * (char-18) % 256
        # enc.append(char)
    # return bytes(enc)
# 
# with open('msg.enc') as file:
    # dec = bytes.fromhex(file.read())
# 
# enc = decryption(dec)
# print(enc)

import string

def decryption(ct):
    msg = []
    for byte in ct:
        msg.append(((byte - 18) * pow(123, -1, 256)) % 256)
    return bytes(msg)

ct_hex = '6e0a9372ec49a3f6930ed8723f9df6f6720ed8d89dc4937222ec7214d89d1e0e352ce0aa6ec82bf622227bb70e7fb7352249b7d893c493d8539dec8fb7935d490e7f9d22ec89b7a322ec8fd80e7f8921'
ct = bytes.fromhex(ct_hex)

msg = decryption(ct)

print(msg.decode())

# The code above performs a simple encryption on a message MSG using a 
# linear congruential encryption scheme. The encrypted message is then written to a 
# file named msg.enc in hexadecimal format.

# To decode the message, we would need to perform the reverse operation, which involves converting the 
# hexadecimal string back to bytes and then decrypting the bytes using the inverse of the encryption function.

# Note that the decryption function uses modular inverse to calculate the inverse of 123 modulo 256, 
# which is necessary for the decryption to work. The pow() function with the third argument being 256 is 
# equivalent to using the extended Euclidean algorithm to compute the modular inverse.