import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCanzBvIcpc3iT1ekk4Og0ZConpu9DDchU",
  databaseURL: "https://miniprojectchat-f547a.firebaseio.com/",
  projectId: "miniprojectchat-f547a",
  appId: "1:127625031140:android:38e45e153bcf217177abf1",
};

export default Firebase.initializeApp(firebaseConfig);