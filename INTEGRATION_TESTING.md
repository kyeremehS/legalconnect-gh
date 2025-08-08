# API Integration Testing Guide

## Step 1: Start the API Server
1. Open a terminal in the `legalconnect-api` directory
2. Run: `npm run dev`
3. The server should start on `http://localhost:4000`

## Step 2: Seed the Database (Optional)
If you want to add sample lawyer data for testing:
1. Run: `npx ts-node seedDatabase.ts`
2. This will create 3 sample lawyers in your database

## Step 3: Start the Frontend
1. Open another terminal in the `legalconnect-gh` directory  
2. Run: `npm run dev`
3. Navigate to `http://localhost:3000/User-landing/network`

## Step 4: Test the Integration
The network page should now:
- Load real lawyer data from your database
- Show loading state while fetching
- Display error state if API is not running
- Allow searching and filtering of lawyers

## API Endpoints Available:
- `GET /api/lawyers` - Get all lawyers
- `GET /api/lawyers/search?practiceArea=...&location=...&search=...` - Search lawyers
- `GET /api/lawyers/:id` - Get specific lawyer

## Troubleshooting:
1. **No lawyers showing**: Make sure API server is running and database is connected
2. **Loading forever**: Check browser console for API errors
3. **CORS issues**: Ensure API server allows frontend origin

## What Changed:
- ✅ Added lawyer API endpoints to frontend API client
- ✅ Created `useLawyers` hook for data fetching with debounced search
- ✅ Updated network page to use real data instead of mock data
- ✅ Added loading, error, and empty states
- ✅ Maintained all existing UI/UX while integrating real data
