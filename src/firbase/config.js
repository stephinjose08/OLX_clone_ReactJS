import firebase from 'firebase'
import 'firebase/auth'
import   'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDm-wVZtdvPSzW5hT2Sm_1x_5UCTl-f-RA",
    authDomain: "olx-clone-f998a.firebaseapp.com",
    projectId: "olx-clone-f998a",
    storageBucket: "olx-clone-f998a.appspot.com",
    messagingSenderId: "524813316295",
    appId: "1:524813316295:web:408146cd9bd7b45de0cee2",
    measurementId: "G-XT40K8KTP1"
  };

 export default firebase.initializeApp(firebaseConfig)
