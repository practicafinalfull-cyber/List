import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getFirestore, Firestore } from "firebase/firestore"

// Firebase configuration interface
interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

// Initialize Firebase
let app: FirebaseApp | undefined
let db: Firestore | undefined

const getFirebaseConfig = (): FirebaseConfig => {
  // Get configuration from environment variables (Replit Secrets)
  const config: FirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  }

  // Validate that all required config values are present
  const missingKeys = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing Firebase configuration: ${missingKeys.join(", ")}. Please set these in your environment variables (Replit Secrets).`
    )
  }

  return config
}

export const initializeFirebase = (): { app: FirebaseApp; db: Firestore } => {
  // Return existing instances if already initialized
  if (app && db) {
    return { app, db }
  }

  // Check if Firebase is already initialized
  const existingApps = getApps()
  if (existingApps.length > 0) {
    app = existingApps[0]
  } else {
    const config = getFirebaseConfig()
    app = initializeApp(config)
  }

  db = getFirestore(app)

  return { app, db }
}

// Get Firestore instance
export const getDb = (): Firestore => {
  if (!db) {
    const { db: newDb } = initializeFirebase()
    return newDb
  }
  return db
}

// Get Firebase app instance
export const getApp = (): FirebaseApp => {
  if (!app) {
    const { app: newApp } = initializeFirebase()
    return newApp
  }
  return app
}

