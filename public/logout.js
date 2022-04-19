function Logout() {
  const [show, setShow] = React.useState(true);

  function updatelogout() {
    firebase.auth().signOut();

    setShow(false);
  }

  return (
    <Card
      bgcolor="primary"
      header="Logout"
      body={
        show ? (
          <button
            type="button"
            id="logout"
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
