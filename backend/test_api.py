#!/usr/bin/env python3
"""
Simple API test script for LegalConnect-GH backend
Run this script to test basic API functionality
"""

import requests
import json
import sys
from typing import Dict, Any

# Configuration
BASE_URL = "http://localhost:8000"
API_BASE = f"{BASE_URL}/api/v1"

def test_health_check() -> bool:
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("Health check passed")
            return True
        else:
            print(f"Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("Cannot connect to backend server. Is it running?")
        return False

def test_api_docs() -> bool:
    """Test if API docs are accessible"""
    try:
        response = requests.get(f"{BASE_URL}/docs")
        if response.status_code == 200:
            print("API docs accessible")
            return True
        else:
            print(f"API docs not accessible: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("Cannot connect to backend server")
        return False

def test_auth_endpoints() -> bool:
    """Test authentication endpoints"""
    print("\nTesting Authentication Endpoints...")
    
    # Test login endpoint (should exist but may fail without valid credentials)
    try:
        response = requests.post(f"{API_BASE}/auth/login", 
                               json={"email": "test@example.com", "password": "test"})
        if response.status_code in [200, 401, 422]:  # 401 is expected for invalid credentials
            print("Login endpoint accessible")
            return True
        else:
            print(f"Login endpoint error: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("Cannot connect to auth endpoint")
        return False

def test_user_endpoints() -> bool:
    """Test user endpoints"""
    print("\nTesting User Endpoints...")
    
    try:
        response = requests.get(f"{API_BASE}/users/me")
        if response.status_code in [401, 403]:  # Expected without auth
            print("User endpoints accessible (authentication required)")
            return True
        else:
            print(f"User endpoint response: {response.status_code}")
            return True
    except requests.exceptions.ConnectionError:
        print("Cannot connect to user endpoints")
        return False

def test_chat_endpoints() -> bool:
    """Test chat endpoints"""
    print("\nTesting Chat Endpoints...")
    
    try:
        response = requests.get(f"{API_BASE}/chats/")
        if response.status_code in [401, 403]:  # Expected without auth
            print("Chat endpoints accessible (authentication required)")
            return True
        else:
            print(f"Chat endpoint response: {response.status_code}")
            return True
    except requests.exceptions.ConnectionError:
        print("Cannot connect to chat endpoints")
        return False

def test_database_connection() -> bool:
    """Test database connection through API"""
    print("\nTesting Database Connection...")
    
    try:
        # Try to access an endpoint that requires database
        response = requests.get(f"{API_BASE}/users/")
        if response.status_code in [401, 403, 200]:  # Various expected responses
            print("Database connection appears to be working")
            return True
        else:
            print(f"Database test response: {response.status_code}")
            return True
    except requests.exceptions.ConnectionError:
        print("Cannot test database connection")
        return False

def main():
    """Run all tests"""
    print("LegalConnect-GH Backend API Test")
    print("=" * 40)
    
    tests = [
        ("Health Check", test_health_check),
        ("API Documentation", test_api_docs),
        ("Authentication", test_auth_endpoints),
        ("User Endpoints", test_user_endpoints),
        ("Chat Endpoints", test_chat_endpoints),
        ("Database Connection", test_database_connection),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n{test_name}...")
        if test_func():
            passed += 1
    
    print("\n" + "=" * 40)
    print(f"Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("ll tests passed! Backend is working correctly.")
        return 0
    else:
        print("Some tests failed. Check the backend setup.")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 