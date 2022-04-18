function Logout() {
  const [show, setShow] = React.useState(true);
  var ctx = React.useContext(UserContext);
  var activeuserMain = React.useContext(ActiveUserContext);

  async function updatelogout() {
    if (activeuserMain[0] === undefined) {
      alert("no user is logged in");
      return;
    } else {
      activeuserMain.splice(0, 1, undefined);
      setShow(false);
      document.getElementById("loggedinuser").innerText = "No user is signed in";
      document.getElementById("activeuser").innerText = "Login";
      document.getElementById("depositlink").className = "nav-item d-none";
      document.getElementById("withdrawlink").className = "nav-item d-none";
      document.getElementById("balancelink").className = "nav-item d-none";
      document.getElementById("logoutlink").className = "nav-item d-none";
      
      document.getElementById("createaccountlink").className = "nav-item nav-link me-auto";
      document.getElementById("loginlink").className = "nav-item nav-link me-auto";
      activeuserMain = [];
      return;
    }
  }

  return (
    <Card
      bgcolor="primary"
      header="Logout"
      body={
        show ? (
          <button
            type="button"
            className="btn btn-light text-black-100"
            onClick={updatelogout}
          >
            Logout
          </button>
        ) : (
          <>You have successfully logged out</>
        )
      }
    />
  );
}
