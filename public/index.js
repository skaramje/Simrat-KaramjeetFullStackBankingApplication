function Spa() {
  return (
    <HashRouter>
      <div>
        <NavBar />

        <UserContext.Provider value={{ user: {}}}>
          <div className="container" style={{ padding: "20px" }}>
            <Route path="/" exact component={Home} />
            <Route path="/home/" component={Home} />
            <Route path="/createaccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/transactions/" component={Transactions} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
            <Route path="/logout/" component={Logout} />
            <Footer />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
