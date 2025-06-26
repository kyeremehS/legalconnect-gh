# LegalConnect-GH Testing Guide

This guide provides comprehensive testing instructions for the entire LegalConnect-GH platform, including frontend, backend, Firebase integration, and end-to-end testing.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Frontend Testing](#frontend-testing)
4. [Backend Testing](#backend-testing)
5. [Firebase Integration Testing](#firebase-integration-testing)
6. [End-to-End Testing](#end-to-end-testing)
7. [Performance Testing](#performance-testing)
8. [Security Testing](#security-testing)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before testing, ensure you have:

- Node.js 18+ and npm
- Python 3.8+
- PostgreSQL database
- Redis server
- Firebase project configured
- Clerk authentication setup
- Git

## Environment Setup

### 1. Clone and Setup Project

```bash
# Clone the repository
git clone <your-repo-url>
cd legalconnect-gh

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Environment Variables

Create `.env.local` in the frontend root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create `.env` in the backend directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/legalconnect
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Firebase Admin
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your_project.iam.gserviceaccount.com

# External APIs
CLERK_SECRET_KEY=your_clerk_secret
```

### 3. Database Setup

```bash
# Start PostgreSQL and Redis
# On Windows with Docker:
docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=legalconnect -p 5432:5432 -d postgres
docker run --name redis -p 6379:6379 -d redis

# Or install locally and start services
```

## Frontend Testing

### 1. Development Server

```bash
# Start frontend development server
npm run dev
```

### 2. Component Testing

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom

# Run tests
npm test
```

### 3. Manual Frontend Testing

#### Authentication Flow
1. Navigate to `/sign-in`
2. Test Clerk authentication
3. Verify redirect to appropriate dashboard
4. Test sign-out functionality

#### User Dashboard
1. Access `/User-landing`
2. Test navigation between sections
3. Verify user profile display
4. Test search functionality

#### Lawyer Dashboard
1. Access `/Lawyer`
2. Test lawyer-specific features
3. Verify case management
4. Test appointment scheduling

#### Messaging System
1. Navigate to `/User-landing/user-message-call`
2. Test creating new chats
3. Send text messages
4. Test real-time message updates
5. Test file uploads
6. Test message search

#### Calling Features
1. Test voice call initiation
2. Test video call setup
3. Test call controls (mute, video toggle)
4. Test call termination
5. Test incoming call notifications

#### Video Content
1. Access video educational content
2. Test video playback
3. Test search and filtering
4. Test bookmarking

## Backend Testing

### 1. Start Backend Server

```bash
cd backend

# Run database migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. API Testing

#### Using FastAPI Interactive Docs
1. Open `http://localhost:8000/docs`
2. Test each endpoint manually
3. Verify request/response schemas

#### Using curl commands

```bash
# Health check
curl http://localhost:8000/health

# Authentication
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Get user profile
curl -X GET "http://localhost:8000/api/v1/users/me" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create chat
curl -X POST "http://localhost:8000/api/v1/chats/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"participant_ids": ["user1", "user2"]}'
```

### 3. Database Testing

```bash
# Test database connection
python -c "
from app.database import engine
from sqlalchemy import text
with engine.connect() as conn:
    result = conn.execute(text('SELECT 1'))
    print('Database connection successful')
"
```

### 4. Unit Testing

```bash
# Run backend tests
cd backend
pytest

# Run with coverage
pytest --cov=app --cov-report=html
```

## Firebase Integration Testing

### 1. Firebase Configuration Test

```javascript
// Test in browser console
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  // Your config here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test connection
getDocs(collection(db, 'test')).then(() => {
  console.log('Firebase connection successful');
});
```

### 2. Real-time Messaging Test

1. Open two browser windows
2. Log in as different users
3. Create a chat between them
4. Send messages and verify real-time updates
5. Test message persistence after page refresh

### 3. WebRTC Call Testing

1. Ensure HTTPS or localhost for WebRTC
2. Test voice calls between two users
3. Test video calls with camera permissions
4. Test call controls (mute, video toggle)
5. Test call termination and cleanup

### 4. Firebase Security Rules Test

```bash
# Test Firestore rules
firebase emulators:start --only firestore

# Test with different user permissions
```

## End-to-End Testing

### 1. Complete User Journey

#### User Registration and Onboarding
1. Register new user account
2. Complete profile setup
3. Browse available lawyers
4. Schedule consultation
5. Access educational content

#### Lawyer-Client Interaction
1. Lawyer accepts consultation request
2. Client and lawyer start chat
3. Exchange messages
4. Initiate voice/video call
5. Schedule follow-up appointment

#### Case Management
1. Create new case
2. Upload documents
3. Track case progress
4. Schedule court dates
5. Generate reports

### 2. Cross-Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### 3. Responsive Design Testing

Test on different screen sizes:
- Desktop (1920x1080)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667)

## Performance Testing

### 1. Frontend Performance

```bash
# Build and analyze
npm run build
npm run start

# Use Lighthouse for performance audit
# Open Chrome DevTools > Lighthouse
```

### 2. Backend Performance

```bash
# Install Apache Bench
# Test API endpoints
ab -n 1000 -c 10 http://localhost:8000/health

# Test with different payload sizes
ab -n 100 -c 5 -p test_data.json -T application/json http://localhost:8000/api/v1/chats/
```

### 3. Database Performance

```bash
# Test query performance
python -c "
from app.database import engine
from sqlalchemy import text
import time

with engine.connect() as conn:
    start = time.time()
    result = conn.execute(text('SELECT * FROM users LIMIT 1000'))
    end = time.time()
    print(f'Query took {end - start:.2f} seconds')
"
```

## Security Testing

### 1. Authentication Testing

- Test JWT token expiration
- Test invalid token handling
- Test role-based access control
- Test session management

### 2. Input Validation

- Test SQL injection prevention
- Test XSS prevention
- Test file upload security
- Test API rate limiting

### 3. Data Protection

- Verify sensitive data encryption
- Test data access controls
- Verify GDPR compliance features

## Troubleshooting

### Common Issues

#### Frontend Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev

# Clear npm cache
npm cache clean --force
```

#### Backend Issues
```bash
# Check database connection
python -c "from app.database import engine; print(engine.url)"

# Reset database
alembic downgrade base
alembic upgrade head
```

#### Firebase Issues
```bash
# Check Firebase config
# Verify environment variables
# Test Firebase connection
```

### Debug Mode

#### Frontend Debug
```bash
# Enable debug logging
DEBUG=* npm run dev
```

#### Backend Debug
```bash
# Enable debug mode
uvicorn app.main:app --reload --log-level debug
```

### Logs

Check logs in:
- Frontend: Browser console, terminal
- Backend: Terminal output, log files
- Firebase: Firebase console
- Database: PostgreSQL logs

## Testing Checklist

### Pre-deployment Checklist
- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] End-to-end tests pass
- [ ] Performance benchmarks met
- [ ] Security tests pass
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness tested
- [ ] Accessibility requirements met
- [ ] Error handling tested
- [ ] Data backup and recovery tested

### Production Readiness
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Monitoring and logging setup
- [ ] Backup procedures tested
- [ ] Load balancing configured
- [ ] CDN setup for static assets
- [ ] Rate limiting configured
- [ ] Error tracking setup

## Support

For issues during testing:
1. Check the troubleshooting section
2. Review logs for error messages
3. Verify environment configuration
4. Test with minimal setup
5. Create detailed bug reports with steps to reproduce

Remember to test thoroughly before deploying to production! 