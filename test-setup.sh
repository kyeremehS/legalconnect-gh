#!/bin/bash

# LegalConnect-GH Quick Test Setup Script
# This script helps you quickly set up and test the entire platform

echo "🚀 LegalConnect-GH Testing Setup"
echo "=================================="

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
else
    echo "✅ Node.js $(node --version) found"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
else
    echo "✅ npm $(npm --version) found"
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+"
    exit 1
else
    echo "✅ Python $(python3 --version) found"
fi

# Check pip
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed"
    exit 1
else
    echo "✅ pip3 found"
fi

echo ""
echo "🔧 Setting up environment..."

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "🐍 Installing backend dependencies..."
cd backend
pip3 install -r requirements.txt
cd ..

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Please create it with your Firebase and Clerk configuration."
    echo "   See TESTING_GUIDE.md for details."
fi

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found. Please create it with your database and API configuration."
    echo "   See TESTING_GUIDE.md for details."
fi

echo ""
echo "🎯 Quick Test Commands"
echo "======================"
echo ""
echo "1. Start Frontend (in one terminal):"
echo "   npm run dev"
echo ""
echo "2. Start Backend (in another terminal):"
echo "   cd backend"
echo "   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "3. Test Frontend:"
echo "   - Open http://localhost:3000"
echo "   - Test authentication flow"
echo "   - Test messaging system"
echo "   - Test video calls"
echo ""
echo "4. Test Backend API:"
echo "   - Open http://localhost:8000/docs"
echo "   - Test endpoints interactively"
echo ""
echo "5. Test Database:"
echo "   - Ensure PostgreSQL is running"
echo "   - Run: cd backend && alembic upgrade head"
echo ""
echo "📚 For detailed testing instructions, see TESTING_GUIDE.md"
echo ""
echo "🔍 Common Test URLs:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"
echo "   - User Dashboard: http://localhost:3000/User-landing"
echo "   - Lawyer Dashboard: http://localhost:3000/Lawyer"
echo "   - Messaging: http://localhost:3000/User-landing/user-message-call"
echo ""
echo "✅ Setup complete! Follow the testing guide for comprehensive testing." 