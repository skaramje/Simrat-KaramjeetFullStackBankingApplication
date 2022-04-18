function Home() {
  

  return (
    <>
      <Card
        txtcolor="black"
        header="Full Stack Bank Landing Module"
        title="Welcome to the bank"
        text={"You can move around using the navigation bar"}
        body={<Extrabuttons />}
      />
    </>
  );

  function Extrabuttons() {
    return (
      <>
        <img src="bank.png" className="img-fluid" alt="Responsive image" />
        <div className="text-center">
          <button type="submit" className="btn btn-light">
            <a href="#/createAccount/">Create Account</a>
          </button>
          <button type="submit" className="btn btn-light">
            <a href="#/login/">Login</a>
          </button>
        </div>
      </>
    );
  }
}
