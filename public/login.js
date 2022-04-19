function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [activeuser, setActiveuser] = React.useState("");
  const [button, setButton] = React.useState(false);
  const ctx = React.useContext(UserContext);
  var activeuserMain = React.useContext(ActiveUserContext);
  const header = "Login to your account";
  const headerSuccess = "Welcome!";
  const [databaseuser, setDatabaseuser] = React.useState("");
  const [databasepass, setDatabasepass] = React.useState("");
  const [databasebalance, setDatabasebalance] = React.useState(0);
  const [databasename, setDatabasename] = React.useState("");

  console.log(`user id: ${databaseuser} user name: ${databasename}`);
  var activeuserMain = React.useContext(ActiveUserContext);
  const firebaseConfig = {
    apiKey: "AIzaSyD_Sbp8Dk9o55052uqtO05LiBGPhoy9K5U",
    authDomain: "bankingapp-6b317.firebaseapp.com",
    projectId: "bankingapp-6b317",
    storageBucket: "bankingapp-6b317.appspot.com",
    messagingSenderId: "510713852890",
    appId: "1:510713852890:web:4625a125d034bacf5646e3",
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  // firebase.initializeApp(firebaseConfig);

  firebase.auth().signOut();

  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log("Firebase Auth Logged-In: " + firebaseUser.email);

      document.getElementById("loggedinuser").innerText = firebaseUser.email;
      document.getElementById("activeuser").innerText = firebaseUser.email;
      document.getElementById("depositlink").className = "nav-item";
      document.getElementById("withdrawlink").className = "nav-item";
      document.getElementById("balancelink").className = "nav-item";
      document.getElementById("logoutlink").className = "nav-item";
      document.getElementById("createaccountlink").className =
        "nav-item d-none";
      document.getElementById("loginlink").className = "nav-item d-none";
      activeuserMain[0] = firebaseUser.email;
    } else {
      console.log("Firebase Auth Logged-Out");
      document.getElementById("loggedinuser").innerText =
        "No user is signed in";
      document.getElementById("activeuser").innerText = "No user";
      document.getElementById("depositlink").className = "nav-item d-none";
      document.getElementById("withdrawlink").className = "nav-item d-none";
      document.getElementById("balancelink").className = "nav-item d-none";
      document.getElementById("logoutlink").className = "nav-item d-none";

      document.getElementById("createaccountlink").className =
        "nav-item nav-link me-auto";
      document.getElementById("loginlink").className =
        "nav-item nav-link me-auto";
      activeuserMain = [];
    }
  });

  function validate(field, label = "") {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function otherErrors(field, label = "") {
    if (field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  async function update(name, email, password, balance) {
    var dateTime = new Date();
    await ctx.users.push({
      name: name,
      email: email,
      password: password,
      balance: balance,
      logs: {
        transactionDate: `${
          dateTime.getMonth() + 1
        }/${dateTime.getDate()}/${dateTime.getFullYear()}`,
        transactionTime: `${`0${dateTime.getHours()}`.slice(
          -2
        )}:${`0${dateTime.getMinutes()}`.slice(
          -2
        )}:${`0${dateTime.getSeconds()}`.slice(-2)}`,
        transactionType: "Account Login",
        transactionAmount: "NA",
      },
    });
  }

  function handleLogin() {
    if (!validate(email, "email")) {
      alert("Please enter a valid email");
      return;
    }
    if (!validate(password, "password")) {
      alert("Please enter a password");
      return;
    }

    async function databaseauthentication() {
      fetch(`/account/login/${email}/${password}`)
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);

            document.getElementById("loggedinuser").innerText = data.email;
            document.getElementById("activeuser").innerText = data.name;
            document.getElementById("depositlink").className = "nav-item";
            document.getElementById("withdrawlink").className = "nav-item";
            document.getElementById("balancelink").className = "nav-item";
            document.getElementById("logoutlink").className = "nav-item";
            document.getElementById("createaccountlink").className =
              "nav-item d-none";
            document.getElementById("loginlink").className = "nav-item d-none";

            activeuserMain[0] = data.name;
            setDatabaseuser(data.email);
            setDatabasepass(data.password);
            setDatabasename(data.name);
            setDatabasebalance(data.balance);
            setActiveuser(data.name);
            update(data.name, data.user, data.password, data.balance);
            activeuserMain.splice(0, 1, data.name);
            setStatus("");
            console.log(`ctx: ${ctx}`);
            setShow(false);
            return;
          } catch (err) {
            setShow(true);
            clearForm();
            console.log("err:", text);
            otherErrors("mismatch", "username and password do not match");
            alert("Username and password do not match");
            return;
          }
        });
    }
    databaseauthentication();
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
    setButton(false);
  }

  

  function firebaseAuthentication() {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    activeuserMain.splice(0, 1, email);
    document.getElementById("activeuser").innerText = "Logged in";
    setActiveuser(email);
    setStatus("");
    setShow(false);
    promise.catch((e) => console.log(e.message));
  }

  function googleLogin() {
    console.log("google clicked");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        //   loggedinuser.innerText = `You are logged in using the following email: ${result.user.email}`;
        document.getElementById("loggedinuser").innerText = result.user.email;
        document.getElementById("activeuser").innerText = result.user.name;
        document.getElementById("depositlink").className = "nav-item";
        document.getElementById("withdrawlink").className = "nav-item";
        document.getElementById("balancelink").className = "nav-item";
        document.getElementById("logoutlink").className = "nav-item";
        document.getElementById("createaccountlink").className =
          "nav-item d-none";
        document.getElementById("loginlink").className = "nav-item d-none";
        activeuserMain.splice(0, 1, result.user.email);
        setActiveuser(email.value);
        setStatus("");
        setShow(false);
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
    setShow(false);
  }

  return (
    <Card
      bgcolor="secondary"
      header={show ? <>{header}</> : <>{headerSuccess}</>}
      status={status}
      body={
        show ? (
          <>
            Login Email
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                setButton(true);
              }}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                setButton(true);
              }}
            />
            <br />
            {button ? (
              <input
                type="submit"
                className="btn btn-light text-black-100"
                onClick={handleLogin}
                value="Login with database authentication"
                id="submit-button"
              />
            ) : (
              <input
                type="submit"
                className="btn btn-light text-black-50"
                value="Login with database authentication"
                id="submit-button"
              />
            )}
            <br />
            <input
              type="submit"
              className="btn btn-light text-black-100"
              id="firebase-submit-button"
              onClick={firebaseAuthentication}
              value="Login without database authentication (firebase auth)"
            />
            <br />
            <input
              type="submit"
              className="btn btn-light text-black-100"
              id="google-submit-button"
              onClick={googleLogin}
              value="Login with your Google account"
            />
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light">
              Welcome back, {activeuser}!
            </button>
          </>
        )
      }
    />
  );
}
