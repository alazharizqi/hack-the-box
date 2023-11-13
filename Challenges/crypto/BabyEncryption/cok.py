msg = "ZHARSUKE{D0_Y0u_L1k3_Th4t_5h1T?}"

msgToArray = list(msg)

print(msgToArray)

msgToAscii = []

def charToAscii(msg):
    for char in msg:
        msgToAscii.append(ord(char))

print(charToAscii(msgToArray))

# def encryption(msg):
#     char = []
#     for char in msg:
#         char.append((123 * char + 18) % 256)
#     return bytes(char)

# print(encryption(msg))