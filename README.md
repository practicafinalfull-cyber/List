# ToDo App

A modern to-do application built with Next.js, React, TypeScript, Tailwind CSS, and Firebase Firestore.

## Features

- ✅ Create new to-do tasks
- 📋 View list of all tasks
- ✏️ Update existing tasks
- 🗑️ Delete tasks
- 🔄 Real-time synchronization with Firebase Firestore
- 💾 Persistent data storage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project created
- Firebase credentials configured

### Firebase Setup

1. **Create a Firebase Project** (if you haven't already):
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database

2. **Configure Firestore Security Rules**:
   In your Firebase Console, go to Firestore Database > Rules and set:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /todos/{document=**} {
         allow read, write: if true; // For development - restrict in production
       }
     }
   }
   ```
   ⚠️ **Important**: For production, implement proper authentication and security rules.

3. **Add Firebase Credentials to Replit Secrets**:
   Add these environment variables in Replit's Secrets tab:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

   You can find these values in Firebase Console > Project Settings > General > Your apps.

### Running the Application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components
  - `todo-app.tsx` - Main application component with Firebase integration
  - `todo-header.tsx` - Header component
  - `todo-input.tsx` - Input form for new tasks
  - `todo-list.tsx` - List of tasks
  - `todo-item.tsx` - Individual task item
  - `todo-footer.tsx` - Footer with task statistics
- `lib/` - Utility functions and Firebase configuration
  - `firebase.ts` - Firebase initialization and configuration
  - `utils.ts` - Utility functions

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Firebase Firestore](https://firebase.google.com/docs/firestore) - Database
- [Radix UI](https://www.radix-ui.com/) - UI components

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
