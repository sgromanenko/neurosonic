from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.core.database import Base, engine
import uuid

# Ensure clean state (optional, but good for repeatable tests)
# Base.metadata.drop_all(bind=engine)
# Base.metadata.create_all(bind=engine)

client = TestClient(app)

def test_history_flow():
    # 1. Register unique user
    email = f"history_test_{uuid.uuid4()}@example.com"
    password = "password123"
    
    client.post(
        "/api/auth/register",
        json={"email": email, "password": password},
    )
    
    # 2. Login
    response = client.post(
        "/api/auth/token",
        data={"username": email, "password": password},
    )
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 3. Record Session
    session_data = {"mode": "focus", "duration_seconds": 1200}
    response = client.post(
        "/api/users/me/history",
        json=session_data,
        headers=headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["mode"] == "focus"
    assert data["duration_seconds"] == 1200
    print("[PASS] Record Session")
    
    # 4. Get History
    response = client.get(
        "/api/users/me/history",
        headers=headers
    )
    assert response.status_code == 200
    history = response.json()
    assert len(history) >= 1
    assert history[0]["mode"] == "focus"
    print("[PASS] Get History")

if __name__ == "__main__":
    try:
        test_history_flow()
        print("\nAll History tests PASSED.")
    except AssertionError as e:
        print(f"\n[FAIL] Test failed: {e}")
        exit(1)
    except Exception as e:
        print(f"\n[ERROR] {e}")
        exit(1)
