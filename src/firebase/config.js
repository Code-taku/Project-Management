import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCNRJU8xnOvF1b9HCNNbEb7op3KknnqXjI",
    authDomain: "always-irusu.firebaseapp.com",
    projectId: "always-irusu",
    storageBucket: "always-irusu.appspot.com",
    messagingSenderId: "775573913827",
    appId: "1:775573913827:web:664715e8a60cdeff59c5d6"
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }