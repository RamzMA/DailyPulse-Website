// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCZp768jAILEgoKYiae92kGwprdRkAOFU",
  authDomain: "dailypulse-e043e.firebaseapp.com",
  projectId: "dailypulse-e043e",
  storageBucket: "dailypulse-e043e.appspot.com",
  messagingSenderId: "362135589182",
  appId: "1:362135589182:web:7bca3a75b103788e2c1c6f",
  measurementId: "G-7T0DLK9Y31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById('signUpButton').addEventListener('click', function() {
  // Get the input values
  var email = document.getElementById('email').value.toLowerCase();
  var confirmEmail = document.getElementById('confirmEmail').value.toLowerCase();
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  // Validate input
  if (email === confirmEmail && password === confirmPassword) {
    // Create a new user in Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created
        var user = userCredential.user;
        
        // Save user details in the database
        set(ref(database, 'users/' + user.uid), {
          email: email
        });

        alert('User signed up successfully!');
        
        // Clear all input fields
        document.getElementById('email').value = '';
        document.getElementById('confirmEmail').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Error: ' + errorMessage);

        // Clear all input fields
        document.getElementById('email').value = '';
        document.getElementById('confirmEmail').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
      });
  } else {
    alert('Email or password confirmation does not match.');

    // Clear all input fields
    document.getElementById('email').value = '';
    document.getElementById('confirmEmail').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
  }
});
