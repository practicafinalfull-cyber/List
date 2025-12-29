# My Tasks - Next.js Firebase Todo App

## Overview
A task management application built with Next.js 16 and Firebase. Users can create, manage, and track their tasks with a clean, modern interface.

## Tech Stack
- **Framework**: Next.js 16 with Turbopack
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS 4
- **Backend/Database**: Firebase (Firestore)
- **Language**: TypeScript

## Project Structure
```
app/           # Next.js App Router pages
components/    # React components
lib/           # Utilities and Firebase config
public/        # Static assets
```

## Development
The development server runs on port 5000:
```bash
npm run dev -- -H 0.0.0.0 -p 5000
```

## Environment Variables Required
This app requires Firebase configuration. Set these in Replit Secrets:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Deployment
Build and start for production:
```bash
npm run build
npm run start
```
