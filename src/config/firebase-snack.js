import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
  browserSessionPersistence,
} from 'firebase/auth';

// Firebase config for Snack (using direct values)
const firebaseConfig = {
  apiKey: "AIzaSyAoXxDlDJJ_xtDrZfBuEVdsECqC1fksk2k",
  authDomain: "mobilechat-14fb0.firebaseapp.com",
  projectId: "mobilechat-14fb0",
  storageBucket: "mobilechat-14fb0.firebasestorage.app",
  messagingSenderId: "299028708867",
  appId: "1:299028708867:web:13aeda11df9e3873eb1836",
  measurementId: "G-QNLHL0FS53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = Platform.OS === 'web' 
  ? initializeAuth(app, {
      persistence: browserSessionPersistence,
    })
  : initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });

// Initialize Firestore
const db = getFirestore(app);

export { db, auth };
