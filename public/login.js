function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const header = "Login to your account";
  const headerSuccess = "Welcome!";

  const ctx = React.useContext(UserContext);

  const emailinput = document.getElementById("emailinput");
  const passwordinput = document.getElementById("passwordinput");

  function firebaseAuthentication() {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailinput.value, passwordinput.value)
      .then((user) => {
        setShow(false);
        setStatus(true);
        ctx.user.email = emailinput.value;
      })
      .catch((e) => console.log(e.message));
  }

  function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log(user.email);
        setShow(false);
        setStatus(true);
        ctx.user.email = user.email;
        console.log(ctx);

        fetch(`/account/findOne/${user.email}`)
          .then((response) => response.text())
          .then((text) => {
            try {
              const data = JSON.parse(text);
            } catch (err) {
              var user = firebase.auth().currentUser;
              var displayName = user.displayName;
              var userEmail = user.email;
              var uid = user.uid;
              const url = `/account/create/${displayName}/${userEmail}/${uid}`;
              (async () => {
                var res = await fetch(url);
                var data = await res.json();
                console.log(data);
              })();
            }
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.email;

        firebase.auth().createUserWithEmailAndPassword(
          email,
          password
        )
        .then((user) => {
          var user = firebase.auth().currentUser;
          
          ctx.user.email = user.email;
          var uid = user.uid
          const url = `/account/create/${user.name}/${user.email}/${uid}}`;
          (async () => {
            var res = await fetch(url);
            var data = await res.json();
            console.log(data);
          })();
          setShow(false);
        }, function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(`Error: ${errorCode} ${errorMessage}`);
        })
        
        const url = `/account/create/${name}/${email}/${password}`;
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log(data);
        })();
      });
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
              id="emailinput"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="passwordinput"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
            <br />
            <input
              type="submit"
              className="btn btn-light text-black-100"
              id="firebase-submit-button"
              onClick={firebaseAuthentication}
              value="Login with email and password"
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
              Welcome back!
            </button>
          </>
        )
      }
    />
  );
}
