import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAziL3U-oCnkpwLC1btBvlEBKU-7lHSfxQ",
    authDomain: "covidx-tracker.firebaseapp.com",
    projectId: "covidx-tracker",
    storageBucket: "covidx-tracker.appspot.com",
    messagingSenderId: "963784981794",
    appId: "1:963784981794:web:85b6d7267ec3fb36e5797b",
    measurementId: "G-0MNECN1M3V"
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