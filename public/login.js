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
  var [result, setResult] = React.useState([]);

  function validate(field, label = "") {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function authenticate(email, password) {
    if (!email) {
      alert("This account does not exist");
      return false;
    } else if (!password) {
      alert("Password is incorrect");
      return false;
    }
    return true;
  }

  function logincheck(name) {
    if (activeuserMain[0] == name) {
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

    //var user = ctx.users.filter((user) => user.email === email)[0];
    //var pass = ctx.users.filter((user) => user.password === password)[0];
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
          document.getElementById("createaccountlink").className = "nav-item d-none";
          document.getElementById("loginlink").className = "nav-item d-none"
          activeuserMain.push(data.name);
          setDatabaseuser(data.email);
          setDatabasepass(data.password);
          setDatabasename(data.name);
          setDatabasebalance(data.balance);
          setActiveuser(data.name);
          setStatus("");
          setShow(false);
        } catch (err) {
          console.log("err:", text);
          alert('User does not exist');
        }
      });

    

    console.log(`username is ${databaseuser}`);
    
    activeuserMain.splice(0, 1, databasename);
    console.log(`active user ${activeuser}`);
    update(databasename, databasepass, databaseuser, databasebalance);
    setShow(false);
  }
  console.log(`active user main ${activeuserMain}`);

  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
    setButton(false);
  }

  function username() {
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
            {status} <br />
            {button ? (
              <input
                type="submit"
                className="btn btn-light text-black-100"
                onClick={handleLogin}
                value="Login"
                id="submit-button"
              />
            ) : (
              <input
                type="submit"
                className="btn btn-light text-black-50"
                value="Login"
                id="submit-button"
              />
            )}
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={username}>
              Welcome back, {activeuser}!
            </button>
          </>
        )
      }
    />
  );
}
