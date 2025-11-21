from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.core.database import Base, engine, SessionLocal
import os

# Create clean DB for testing
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

client = TestClient(app)

def test_register_user():
    response = client.post(
        "/api/auth/register",
        json={"email": "test@example.com", "password": "password123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data
    print("[PASS] User Registration")

def test_login_user():
    response = client.post(
        "/api/auth/token",
        data={"username": "test@example.com", "password": "password123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    print("[PASS] User Login")

def test_login_invalid_password():
    response = client.post(
        "/api/auth/token",
        data={"username": "test@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    print("[PASS] Invalid Password Check")

if __name__ == "__main__":
    try:
        test_register_user()
        test_login_user()
        test_login_invalid_password()
        print("\nAll Auth tests PASSED.")
    except AssertionError as e:
        print(f"\n[FAIL] Test failed: {e}")
        exit(1)
    except Exception as e:
        print(f"\n[ERROR] {e}")
        exit(1)
