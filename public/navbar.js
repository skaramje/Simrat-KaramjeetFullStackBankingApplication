function NavBar() {
  var activeuserMain = React.useContext(ActiveUserContext);
  console.log(activeuserMain);
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div
            className="container-fluid"
            style={{ backgroundColor: "#fce2fe", padding: "10px 20px" }}
            body={{ color: "#ec4ef8" }}
          >
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a className="navbar-brand" href="#">
                <img
                  src="/bank.png"
                  width="30"
                  height="30"
                  alt=""
                  className="d-inline-block align-top"
                ></img>
                Full Stack Bank
              </a>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tooltip"
                    title="home"
                    aria-current="page"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="createaccountlink"
                    data-toggle="tooltip"
                    title="Create a new account"
                    href="#/CreateAccount/"
                  >
                    Create Account
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="loginlink"
                    data-toggle="tooltip"
                    title="login into an existing account"
                    href="#/login/"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item d-none" id="depositlink">
                  <a
                    className="nav-link"
                    data-toggle="tooltip"
                    title="deposit money"
                    href="#/deposit/"
                  >
                    Deposit
                  </a>
                </li>
                <li className="nav-item d-none" id="withdrawlink">
                  <a
                    className="nav-link"
                    data-toggle="tooltip"
                    title="withdraw money"
                    href="#/withdraw/"
                  >
                    Withdraw
                  </a>
                </li>
                <li className="nav-item d-none" id="balancelink">
                  <a
                    className="nav-link"
                    data-toggle="tooltip"
                    title="check account balance"
                    href="#/balance/"
                  >
                    Balance
                  </a>
                </li>
                <li className="nav-item d-none">
                  <a
                    className="nav-link"
                    id="alldatalink"
                    data-toggle="tooltip"
                    title="view all users"
                    href="#/alldata/"
                  >
                    AllData
                  </a>
                </li>
                <li className="nav-item d-none" id="logoutlink">
                  <a
                    className="nav-link"
                    data-toggle="tooltip"
                    title="sign out"
                    href="#/logout/"
                  >
                    Logout
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link disabled"
                    id="loggedinuser"
                    data-toggle="tooltip"
                    title="logged in user info"
                    href="#"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    No user is signed in
                  </a>
                </li>
              </ul>

              <button className="btn" type="submit" id="activeuser">
                <a
                  className="nav-link"
                  data-toggle="tooltip"
                  title="logged in user info"
                  href="#/login/"
                >
                  {" "}
                  Login
                </a>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
