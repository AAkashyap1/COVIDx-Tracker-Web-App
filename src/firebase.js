import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

const firestore = app.firestore()

export const database = {
  users: firestore.collection("users"),
}

export const timestamp = firebase.firestore.FieldValue.serverTimestamp()
export const increment = firebase.firestore.FieldValue.increment(1)
export const decrement = firebase.firestore.FieldValue.increment(-1)

export const getUserInfo = email => {
  return database.users.doc(email).get()
}

export const Auth = app.auth()
export default app