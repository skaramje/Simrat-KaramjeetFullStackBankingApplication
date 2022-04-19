function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [button, setButton] = React.useState(false);
  const ctx = React.useContext(UserContext);
  const header = "Create Account";
  const headerSuccess = "Account Created";

  function validate(field, label = "") {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    if (!validate(name, "name")) {
      alert("Please enter a name");

      return;
    }
    if (!validate(email, "email")) {
      alert("Please enter a valid email");

      return;
    }
    if (!validate(password, "password")) {
      alert("Please enter a password");

      return;
    }
    if (password.length < 8) {
      alert("Password must be 8 characters long");

      return;
    }

    var user = ctx.users.filter((user) => user.email === email)[0];
    if (user) {
      alert("This user already exists");
      return;
    }

   
    firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    )
    .then((user) => {
      var user = firebase.auth().currentUser;
      const dateTime = new Date();
      var cemail = user.email;
      var cuid = user.uid;
      var cpassword = "";
      ctx.users.push({
      cuid,
      cemail,
      cpassword,
      balance: 0,
      logs: [
        {
          transactionDate: `${
            dateTime.getMonth() + 1
          }/${dateTime.getDate()}/${dateTime.getFullYear()}`,
          transactionTime: `${`0${dateTime.getHours()}`.slice(
            -2
          )}:${`0${dateTime.getMinutes()}`.slice(
            -2
          )}:${`0${dateTime.getSeconds()}`.slice(-2)}`,
          transactionType: "Account Created",
          transactionAmount: "NA",
        },
      ],
      })
      const url = `/account/create/${name}/${email}/${cuid}}`;
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
    

    

    console.log(name, email, password);
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
    })();

    console.log(email.value);
    console.log(password.value);

   
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
    setButton(false);
  }

  return (
    <Card
      bgcolor="primary"
      header={show ? <>{header}</> : <>{headerSuccess}</>}
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => {
                if (e.currentTarget.value) {
                  setName(e.currentTarget.value);
                  setButton(true);
                }
              }}
            />
            <br />
            Email address
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
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                setButton(true);
              }}
            />
            <br />
            {status} <br />
            {button ? (
              <input
                type="submit"
                className="btn btn-light text-black-100"
                onClick={handleCreate}
                value="Create Account"
                id="submit-button"
              />
            ) : (
              <input
                type="submit"
                className="btn btn-light text-black-50"
                value="Create Account"
                id="submit-button"
              />
            )}
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
