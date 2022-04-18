function Spa() {
  return (
    <HashRouter>
      <div>
        <NavBar />

        <UserContext.Provider
          value={{
            users: [
              {
                name: "abel",
                email: "abel@mit.edu",
                password: "secret",
                balance: 100,
                logs:[{
                  transactionDate: '2022-01-01', 
                  transactionTime: '00:00:00',
                  transactionType: 'Account Created',
                  transactionAmount: 'NA'
                }]
              },
            ],
          }}
        >
          <ActiveUserContext.Provider value={[]}>
            <div className="container" style={{ padding: "20px" }}>
              <Route path="/" exact component={Home} />
              <Route path="/home/" component={Home} />
              <Route path="/createaccount/" component={CreateAccount} />
              <Route path="/login/" component={Login} />
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              {/* <Route path="/transactions/" component={Transactions} /> */}
              <Route path="/balance/" component={Balance} />
              <Route path="/alldata/" component={AllData} />
              <Route path="/logout/" component={Logout} />
              <Footer />
            </div>
          </ActiveUserContext.Provider>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
