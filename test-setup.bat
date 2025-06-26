@echo off
REM LegalConnect-GH Quick Test Setup Script for Windows
REM This script helps you quickly set up and test the entire platform

echo 🚀 LegalConnect-GH Testing Setup
echo ==================================

REM Check prerequisites
echo 📋 Checking prerequisites...

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    pause
    exit /b 1
) else (
    echo ✅ Node.js found
)

REM Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed
    pause
    exit /b 1
) else (
    echo ✅ npm found
)

REM Check Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+
    pause
    exit /b 1
) else (
    echo ✅ Python found
)

REM Check pip
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pip is not installed
    pause
    exit /b 1
) else (
    echo ✅ pip found
)

echo.
echo 🔧 Setting up environment...

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
npm install

REM Install backend dependencies
echo 🐍 Installing backend dependencies...
cd backend
pip install -r requirements.txt
cd ..

REM Check if .env.local exists
if not exist ".env.local" (
    echo ⚠️  .env.local not found. Please create it with your Firebase and Clerk configuration.
    echo    See TESTING_GUIDE.md for details.
)

REM Check if backend .env exists
if not exist "backend\.env" (
    echo ⚠️  backend\.env not found. Please create it with your database and API configuration.
    echo    See TESTING_GUIDE.md for details.
)

echo.
echo 🎯 Quick Test Commands
echo ======================
echo.
echo 1. Start Frontend (in one terminal):
echo    npm run dev
echo.
echo 2. Start Backend (in another terminal):
echo    cd backend
echo    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
echo.
echo 3. Test Frontend:
echo    - Open http://localhost:3000
echo    - Test authentication flow
echo    - Test messaging system
echo    - Test video calls
echo.
echo 4. Test Backend API:
echo    - Open http://localhost:8000/docs
echo    - Test endpoints interactively
echo.
echo 5. Test Database:
echo    - Ensure PostgreSQL is running
echo    - Run: cd backend ^&^& alembic upgrade head
echo.
echo 📚 For detailed testing instructions, see TESTING_GUIDE.md
echo.
echo 🔍 Common Test URLs:
echo    - Frontend: http://localhost:3000
echo    - Backend API: http://localhost:8000
echo    - API Docs: http://localhost:8000/docs
echo    - User Dashboard: http://localhost:3000/User-landing
echo    - Lawyer Dashboard: http://localhost:3000/Lawyer
echo    - Messaging: http://localhost:3000/User-landing/user-message-call
echo.
echo ✅ Setup complete! Follow the testing guide for comprehensive testing.
pause 