<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"></script>

<script>
  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyCcqSFM94TPhadPC8XoIStFTUidAKuCYFM",
    authDomain: "minipos-web.firebaseapp.com",
    projectId: "minipos-web",
    storageBucket: "minipos-web.firebasestorage.app",
    messagingSenderId: "587713803610",
    appId: "1:587713803610:web:9dec033f185b49dccaef63"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(); // Untuk simpan stock
</script>
