    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    //add your firebaseConfig here
    firebaseConfig = {
        apiKey: "AIzaSyD_Sbp8Dk9o55052uqtO05LiBGPhoy9K5U",
        authDomain: "bankingapp-6b317.firebaseapp.com",
        projectId: "bankingapp-6b317",
        storageBucket: "bankingapp-6b317.appspot.com",
        messagingSenderId: "510713852890",
        appId: "1:510713852890:web:4625a125d034bacf5646e3"
    };
      
    // Initialize Firebase

    (async () => {
        try {
            firebase.initializeApp(firebaseConfig);
            //if user is logged in, it persists through refreshes, this eliminates that issue
            await firebase.auth().signOut();
            const createUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword("example@mit.edu", "secret")
                console.log('createUserResult', createUserResult)
            firebase.auth().signOut();
        } catch(e) {
            console.log(e);
        }
    })();

    // get elements
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const login = document.getElementById("login");
    const signup = document.getElementById("signup");
    const logout = document.getElementById("logout");
    const loggedInStatus = document.getElementById("loggedInStatus");
    const googlelogin = document.getElementById("googlelogin");

    // login & create token with signInWithEmailAndPassword
    login.addEventListener('click', e => {
        const auth  = firebase.auth();      
        const promise = auth.signInWithEmailAndPassword(email.value, password.value);
        promise.catch(e => console.log(e.message));
    });
    // signup
  signup.addEventListener("click", (e) => {
    // TODO: check for real email
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(
      email.value,
      password.value
    );
    promise.catch((e) => console.log(e.message));
  });

  //Google Login
  googlelogin.addEventListener("click", (e) => {
    console.log("google clicked");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        loggedInStatus.innerText = `You are logged in using the following email: ${result.user.email}`;
        login.style.display = "none";
        signup.style.display = "none";
        email.style.display = "none";
        password.style.display = "none";
        googlelogin.style.display = "none";
        logout.style.display = "none";
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
  });
  
    // logout
    logout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // login state
    firebase.auth().onAuthStateChanged(firebaseUser => {
        console.log("user", firebaseUser)
        if(firebaseUser){
         
            logout.style.display = 'inline';
            login.style.display  = 'none';
            loginMsg.innerHTML   = 'Authentication Success!';
            loggedInStatus.innerText = `You are logged in using the following email: ${firebaseUser.email}`;
            signup.style.display = "none";
            email.style.display = "none";
            password.style.display = "none";
            googlelogin.style.display = "none";
        }
        else{
            console.log('User is not logged in');
            logout.style.display = 'none';          
            login.style.display  = 'inline';
            loginMsg.innerHTML   = 'Not Authenticated!';
            loggedInStatus.innerText = "You are not yet logged in";
            signup.style.display = "inline";
            email.style.display = "inline";
            googlelogin.style.display = "inline";
            password.style.display = "inline";
        }
    });

    function callOpenRoute(){
        (async () => {
            let response = await fetch('/open');
            let text     = await response.text();
            console.log('response.text:', response);
            routeMsg.innerHTML = text;
        })();
    }

    function callAuthRoute(){
        // call server with token
    if (firebase.auth().currentUser) {
        firebase.auth().currentUser.getIdToken()
        .then(idToken => {
            console.log('idToken:', idToken);
            //async "iffe" function -> auto-executes
            (async () => {
                let response = await fetch('/auth', {
                    method: 'GET',
                    headers: {
                        'Authorization': idToken
                    }
                });
                let text = await response.text();
                console.log('response:', response);
                routeMsg.innerHTML = text;
            })();

        }).catch(e => console.log('e:', e));
    } else {
        console.warn('There is currently no logged in user. Unable to call Auth Route.');
    }
}