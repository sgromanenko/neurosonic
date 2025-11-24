import urllib.request
import urllib.parse
import json

def verify():
    # Login
    login_url = "http://localhost:8000/api/auth/token"
    data = urllib.parse.urlencode({"username": "test@example.com", "password": "password"}).encode()
    req = urllib.request.Request(login_url, data=data, method="POST")
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            token = result["access_token"]
            print(f"Got token: {token[:10]}...")
            
            # Get History
            history_url = "http://localhost:8000/api/users/me/history"
            headers = {"Authorization": f"Bearer {token}"}
            req_hist = urllib.request.Request(history_url, headers=headers)
            
            with urllib.request.urlopen(req_hist) as hist_response:
                history = json.loads(hist_response.read().decode())
                print(f"History count: {len(history)}")
                if len(history) > 0:
                    print("Latest session:", history[0])
                    
    except urllib.error.URLError as e:
        print(f"Error: {e}")
        if hasattr(e, 'read'):
            print(e.read().decode())

if __name__ == "__main__":
    verify()
