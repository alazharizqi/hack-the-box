import sys
import string
import re
from PIL import Image

morseAlphabet = {"A": ".-","B": "-...","C": "-.-.","D": "-..","E": ".","F": "..-.","G": "--.","H": "....",
"I": "..","J": ".---","K": "-.-","L": ".-..","M": "--","N": "-.","O": "---","P": ".--.","Q": "--.-","R": ".-.",
"S": "...","T": "-","U": "..-","V": "...-","W": ".--","X": "-..-","Y": "-.--","Z": "--.."," ": "/",
"1" : ".----","2" : "..---","3" : "...--","4" : "....-","5" : ".....","6" : "-....","7" : "--...","8" : "---..",
"9" : "----.","0" : "-----",".": ".-.-.-",",": "--..--",":": "---...","?": "..--..","'": ".----.","-": "-....-",
"/": "-..-.","@": ".--.-.","=": "-...-"}

inverseMorseAlphabet = dict((v,k) for (k,v) in morseAlphabet.items())

print(morseAlphabet)
print('\n')
print(inverseMorseAlphabet)

# def decodedMorse(message):
#     messageSeparated = message.split(' ')